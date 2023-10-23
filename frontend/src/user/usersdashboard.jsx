
import React from "react";
import { useLocation } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
// import Button from '@material-ui/core/Button';
const Usersdashboard = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    var useremail = location.state.email ;
    return (
        <div>
            <h1 className="m-3">Welcome {location.state.email}</h1>
            <div className="container main d-flex justify-content-center my-3">
            <div className="d-block">
            <button className="btn btn-dark mx-2"
                onClick={() => {
                    navigate('/usersdashboard/v_register',{replace : true , state:{useremail}})
                }}>
                Register vendor
            </button>
            <button className="btn btn-dark mx-2"
                onClick={() => {
                    navigate('/usersdashboard/vendorlist',{replace : true , state:{useremail}})
                }}>
                List of Vendors
            </button>
            <button className="btn btn-dark mx-2"
                onClick={() => {
                    navigate('/usersdashboard/orderform',{replace : true , state:{useremail}})
                }}>
                Order From
            </button>
            <button className="btn btn-dark mx-2"
                onClick={() => {
                    navigate('/usersdashboard/notifications',{replace : true , state:{useremail}})
                }}>
                Notifications
            </button>
            </div>
            </div>

            
        </div>
    )
}
export default Usersdashboard  ;