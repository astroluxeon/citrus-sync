import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {generateTimeSlots} from './time-utils.ts'

export default function EventPage() {
  const [eventData, setEventData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timeZone: "America/Los_Angeles"
  });
  const [timeSlots, setTimeSlots] = useState<{startTime: number, endTime: number}[]>([]);

  const {id} = useParams<string>();

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setEventData(data);
        setTimeSlots(generateTimeSlots(data.startDate, data.endDate, data.startTime, data.endTime))
        console.log(data);
      });
  }, [id]);

  return (
    <div>
      <h1>Welcome to the grid</h1>
      <h2>Event ID: {id}</h2>
      <h2>Event Name: {eventData.name}</h2>
      <div className={"grid-container"}>
        {timeSlots.map(
          (slot) => {
            return (
              <div key={slot.startTime} className={"time-slot"}>
                {new Date(slot.startTime).toLocaleString()}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}