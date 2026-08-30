import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {TIME_INTERVAL, ONE_DAY, parseTime, generateTimeSlots} from './time-utils.ts';

interface GuestResponse {
  user: string;
  availability: number[];
}

export default function EventPage() {
  const [eventData, setEventData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timeZone: "America/Los_Angeles"
  });

  const [user, setUser] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<{startTime: number, endTime: number}[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<Set<number>>(new Set());
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [guestResponses, setGuestResponses] = useState<GuestResponse[]>([]);

  const {id} = useParams<string>();

  let rows = 0;
  let cols = 0;

  if (timeSlots.length > 0 && eventData.endTime) {
    rows = (parseTime(eventData.endTime) - parseTime(eventData.startTime)) / TIME_INTERVAL;
    cols = timeSlots.length / rows;
  }

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setEventData(data);
        setTimeSlots(generateTimeSlots(data.startDate, data.endDate, data.startTime, data.endTime))
        console.log(data);
      });
  }, [id]);

  const toggleSlot = (time: number) => {
    setSelectedSlots((slots) => {
      const newSlots = new Set(slots);

      if (newSlots.has(time)) {
        newSlots.delete(time);
      } else {
        newSlots.add(time);
      }

      return newSlots;
    });
  };

  const handleMouseDown = (time: number) => {
    setMouseDown(true);
    toggleSlot(time);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const handleMouseEnter = (time: number) => {
    if (mouseDown) {
      toggleSlot(time);
    }
  };

  const handleSubmit = () => {
    const data = {
      user: user,
      availability: Array.from(selectedSlots)
    }

    fetch(`http://localhost:8080/api/events/${id}/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  return (
    <div
      onMouseUp={handleMouseUp}
    >
      <h1>Welcome to the grid</h1>
      <h2>Event ID: {id}</h2>
      <h2>Event Name: {eventData.name}</h2>

      {timeSlots.length > 0 && (
        <div
          className="grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridAutoFlow: 'column',
            gap: '2px',
          }}
        >
          {timeSlots.map(
            (slot) => {
              return (
                <div
                  key={slot.startTime}
                  className={"time-slot"}
                  onMouseDown={() => handleMouseDown(slot.startTime)}
                  onMouseEnter={() => handleMouseEnter(slot.startTime)}
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: selectedSlots.has(slot.startTime) ? "green" : "transparent"
                  }}>
                  {new Date(slot.startTime).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              );
            }
          )}
        </div>
      )}

      <input
        type="text"
        name="user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Availability</button>
    </div>
  );
}