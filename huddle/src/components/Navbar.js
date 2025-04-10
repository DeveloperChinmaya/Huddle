import { Link } from "react-router-dom";
import "./Navbar.css"; // Add styles

function Navbar() {
  return (
    <nav className="bottom-navbar">
      <Link to="/home">Home</Link>
      <Link to="/myevents">My Events</Link>
      <Link to="/tickets">Tickets</Link>
      <Link to="/organiserpage">Clubpage</Link>
    </nav>
  );
}

export default Navbar;