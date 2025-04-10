import "./Header.css"; // Import styles
import backgroundImage from "../resources/party.jpg";
const Header = () => {
  return (
    <div className="header" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>Huddle</h1>
    </div>
  );
};

export default Header;