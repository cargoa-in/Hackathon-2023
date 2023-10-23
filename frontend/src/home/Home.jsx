import "./home.css";
import React from "react";
// import Login from "../user/Login";


const Home = (props) => {
   
    return (
        // <div>
        //    <div> 
        //    <a href="/Login">user Login</a>
        //    </div>
        //    <div>
        //     <a href="/venderLogin">vender Login</a>
        //    </div>
        // </div>
        <div className="container main p-3 d-flex justify-content-center">
        <div className="bg-white p-4 mx-3"> 
        <a href="/Login" className="login-btn btn btn-dark">User Login</a>
        </div>
        <div className="bg-white p-4 mx-3"> 
         <a href="/venderLogin" className="login-btn btn btn-dark">Vender Login</a>
        </div>
         </div>
    //     <div className="container main p-3 d-flex justify-content-center">
    //     <div className="bg-white p-4 mx-3"> 
    //     <a href="/Login" className="login-btn btn btn-dark">User Login</a>
    //     </div>
    //     <div className="bg-white p-4 mx-3"> 
    //      <a href="/venderLogin" className="login-btn btn btn-dark">Vendor Login</a>
    //     </div>
    //  </div>
    )
}
export default Home ;