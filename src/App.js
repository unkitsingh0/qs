import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./Components/navbar/Navbar";
import Auth from "./pages/Auth";
import SignupOtp from "./pages/SignupOtp";
import FillProfileDetails from "./pages/FillProfileDetails";
import Testing from "./pages/Testing";
import Links from "./pages/Links";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faCoffee,
  faAddressCard,
  faQrcode,
  faTrash,
  faCopy,
  faCircleDown,
  faComputerMouse,
  faLinkSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Profile from "./pages/Profile";
import QrAndText from "./pages/QrAndText";
function App() {
  library.add(
    faCoffee,
    faAddressCard,
    faQrcode,
    faTrash,
    faCopy,
    faCircleDown,
    faComputerMouse,
    faLinkSlash,
    faUser
  );
  return (
    <>
      <div className="App">
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/links" element={<Links></Links>} />
            <Route path="/qrandtext" element={<QrAndText></QrAndText>} />
            <Route path="/profile" element={<Profile></Profile>} />

            <Route path="/auth" element={<Auth />} />
            <Route path="/suotp" element={<SignupOtp />} />
            <Route path="/suprofile" element={<FillProfileDetails />} />
            <Route path="/testing" element={<Testing />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
