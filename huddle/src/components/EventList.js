import { useEffect, useState } from "react";
import axios from "axios";
import "./EventList.css"; // Keep styles separate

function EventList({ fetchUrl }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("🔹 Sending request with token:", token); // Debugging
        console.log("🔹 Fetch URL:", fetchUrl);
    
        const response = await axios.get(fetchUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log("✅ Received Events:", response.data); // Debugging
        setEvents(response.data);
      } catch (error) {
        console.error("❌ Error fetching events:", error.response ? error.response.data : error.message);
      }
    };
    fetchEvents();
  }, [fetchUrl]);

  return (
    <div className="events-container">
      {events.length === 0 ? (
        <p style={{ textAlign: "center" }}>No events found</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="event-box">
            <h3>{event.name}</h3>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Organized by:</strong> {event.creatorUsername}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default EventList;