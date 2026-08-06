import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

export default function EventPage() {
  const [eventData, setEventData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timeZone: "America/Los_Angeles"
  });

  const {id} = useParams<string>();

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        setEventData(data);
        console.log(data);
      });
  }, [id]);

  return (
    <div>
      <h1>Welcome to the grid</h1>
      <h2>Event ID: {id}</h2>
      <h2>Event Name: {eventData.name}</h2>
    </div>
  )
}