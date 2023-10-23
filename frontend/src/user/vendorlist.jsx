import React, { useState, useEffect } from "react";
// import Login from "../user/Login";
import axios from "axios";
import { useLocation } from "react-router-dom";

const VendorsList = (props) => {
    const location = useLocation() ;
    const useremail = location.state.useremail ;
    const [vendorList, setVendorList] = useState([]);
    const getVendors = async() => {

        const response = await axios.post('/getvendors',{
            useremail
        });
        setVendorList(response.data);
    }
    useEffect(() => {
        getVendors(); 
      }, [useremail]);
    return (
        <table border={1} width="30%" cellPadding={10}>
  <tr>
    <th>Name</th>
    <th>Email</th>
  </tr>
  <tr>
      {
      vendorList?.map((vendor) => {
                return (
                   <option value={vendor.name} key={vendor.id}>
    <td>{vendor.name}</td>
    <td>{vendor.email}</td>
    </option>
                    
                )
            })
        }
  </tr>
</table>
        

    )
}
export default VendorsList ;