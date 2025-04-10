import React, { useState } from "react";
import "./OrganiserPage.css"; // Import styles
import Header from "../components/Header";

const OrganiserPage = () => {
  // State for banner, logo, and description
  const [banner, setBanner] = useState("/default-banner.jpg"); // Default banner
  const [logo, setLogo] = useState("/default-logo.png"); // Default logo
  const [description, setDescription] = useState("Enter club description here...");

  // Handle image uploads
  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) setBanner(URL.createObjectURL(file));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  return (
    

    <div >
      <Header/>
      <div className="club-page">
      {/* Banner with upload option */}
      <div className="club-banner" style={{ backgroundImage: `url(${banner})` }}>
        <input type="file" accept="image/*" onChange={handleBannerChange} className="upload-banner" />
      </div>

      {/* Club Logo (Overlapping) */}
      <div className="club-logo-container">
        <input type="file" accept="image/*" onChange={handleLogoChange} className="upload-logo" />
        <img src={logo} alt="Club Logo" className="club-logo" />
      </div>

      {/* Club Description */}
      <div className="club-description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter club description..."
        />
      </div>

      {/* Blank space for adding EventList later */}
      <div className="club-events">
        {/* You can insert <EventList fetchUrl="your-api-endpoint" /> here */}
      </div>
      </div>
    </div>
  );
};

export default OrganiserPage;