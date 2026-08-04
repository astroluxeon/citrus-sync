import {useState} from 'react'
import './App.css'

function App() {
  const [eventData, setEventData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timeZone: "America/Los_Angeles"
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    console.log("Form submitted.");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Create New Event</h2>

      <form onSubmit={handleSubmit}>
        <label>Event Name: </label>
        <input
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
        />
        <br />

        <label>Start Date: </label>
        <input
          type="date"
          name="startDate"
          value={eventData.startDate}
          onChange={handleChange}
        />
        <br />

        <label>End Date: </label>
        <input
          type="date"
          name="endDate"
          value={eventData.endDate}
          onChange={handleChange}
        />
        <br />

        <label>Start Time: </label>
        <input
          type="time"
          name="startTime"
          value={eventData.startTime}
          onChange={handleChange}
        />
        <br />

        <label>End Time: </label>
        <input
          type="time"
          name="endTime"
          value={eventData.endTime}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Create Event</button>
      </form>
    </div>
  )
}

export default App
