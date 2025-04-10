import { useState } from "react";
import axios from "axios";
import "./EventForm.css";

function EventForm({ onEventAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token"); // Get token
    const username = localStorage.getItem("username"); // Get username
  
    if (!token) {
      alert("Please log in first.");
      return;
    }
  
    try {
      await axios.post(
        "http://localhost:5000/api/myevents",
        {
          name: eventName,
          description,
          
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Include token
        }
      );
  
      alert("Event created successfully!");
      setShowForm(false); // Hide form after submission
      setEventName("");
      setDescription("");
      onEventAdded(); // Refresh event list
    } catch (error) {
      console.error("Error creating event", error);
      alert("Failed to create event.");
    }
  };
  return (
    <>
      {/* Floating Plus Button */}
      <button className="plus-button" onClick={() => setShowForm(true)}>+</button>

      {/* Popup Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create an Event</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <button type="submit">Create Event</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EventForm;