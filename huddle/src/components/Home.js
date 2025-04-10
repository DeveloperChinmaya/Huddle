import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import EventList from "./EventList";
import Header from "./Header";


function Home() {
  const fetchUrl = "http://localhost:5000/api/home"
  return (
    
    <div>
      <Header/>
      <h2>Huddle Home</h2>
      <EventList fetchUrl={fetchUrl}/>
      <Navbar />
    </div>
  );
}

export default Home;