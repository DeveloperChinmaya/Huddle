import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import MyEvents from "./components/MyEvents";
import Tickets from "./components/Tickets";
import OrganiserPage from "./pages/OrganiserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/myevents" element={<MyEvents />}/>
        <Route path="/tickets" element={<Tickets/>}/>
        <Route path="/organiserpage" element={<OrganiserPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;