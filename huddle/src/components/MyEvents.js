import Navbar from "./Navbar";
import EventForm from "./EventForm";
import EventList from "./EventList";
import { useState } from "react";

function MyEvents() {
  const [refresh, setRefresh] = useState(false);
  const fetchUrl="http://localhost:5000/api/myevents";

  return (
      <div>
        <h2>My Events</h2>
        <p>List of events you have organized.</p>
        <EventList fetchUrl={fetchUrl} refresh={refresh} />
        <EventForm onEventAdded={() => setRefresh(!refresh)} />
        <Navbar/>
      </div>
    );
  }
  
  export default MyEvents;