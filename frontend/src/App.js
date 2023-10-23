
import Login from "./user/Login";
import Register from "./user/Register";
import Usersdashboard from "./user/usersdashboard"
import Vendorreg from "./vendor/v_register"
import Vendorlogin  from "./vendor/v_login";
import Vendor_dashboard from "./vendor/vendor_dashboard";
import Orderform from "./user/form"
import VendorsList from "./user/vendorlist";
import Notification from "./user/notifications";
import axios from "axios";
import Home from "./home/Home";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
axios.defaults.baseURL = 'http://localhost:9000';


function App() {
  return (
    <>
      <Router>
        {/* <Login/> */}
        
        <Toaster position='center-top' toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/usersdashboard" element={<Usersdashboard/>}/>
          <Route path="/usersdashboard/v_register"element={<Vendorreg/>}/>
          <Route path="/venderLogin"element={<Vendorlogin/>}/>
          <Route path="/vender_dashboard"element={<Vendor_dashboard/>}/>
          <Route path="/usersdashboard/orderform"element={<Orderform/>}/>
          <Route path="/usersdashboard/vendorlist" element={<VendorsList/>}/>
          <Route path="/usersdashboard/notifications"element={<Notification/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
