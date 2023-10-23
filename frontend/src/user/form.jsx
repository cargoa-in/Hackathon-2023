// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast"
// import { useLocation } from "react-router-dom";
// const CreatePurchaseOrderForm = () => {
//   const [productName, setProductName] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [dateOfShipping, setDateOfShipping] = useState("");
//   const [dateOfShippingtwo ,setDateOfShippingtwo] = useState("")
//   const [dateOfShippingthree ,setDateOfShippingthree] = useState("")
//   const [vendorIds, setVendorIds] = useState("");
//   const [vendorList, setVendorList] = useState([]);
//   const [file, setFile] = useState(null);
//   const location = useLocation() ;
//   const useremail = location.state.useremail ;
  
//   const getVendors = async() => {

//     const response = await axios.post('/getvendors',{
//         useremail
//     });
//     setVendorList(response.data);
//   }
//   useEffect(() => {
//     getVendors(); 
//   }, [useremail]);
//   const handleSubmit =  async (event) => {
//     event.preventDefault();
    
//     // Create a new purchase order object
//     // const purchaseOrder = new FormData();
//     const purchaseOrder = {
//       productName,
//       quantity,
//       dateOfShipping,
//       dateOfShippingtwo,
//       dateOfShippingthree,
//       file
//     }
    
    // purchaseOrder.append("productName",productName)
    // purchaseOrder.append("quantity",quantity)
    // purchaseOrder.append("dateOfshipping",dateOfShipping) 
    // purchaseOrder.append("dateOfShippingtwo",dateOfShippingtwo)
    // purchaseOrder.append("dateOfShippingthree",dateOfShippingthree)
    // purchaseOrder.append("file",file)

//     console.log(purchaseOrder)
//     // Send the purchase order to the backend
//     try {
//       const { data } = await axios.post('/order',purchaseOrder)
//       console.log(data)
//       if (data.error) {
//         toast.error(data.error)
//       } else {
        
//         toast.success(' successfull !')
        
//       }
//     } catch (error) {
//       console.log(error)
//     }

//     // ...

//     // Clear the form
//     // setProductName("");
//     // setQuantity("");
//     // setDateOfShipping("");
//     // setDateOfShippingtwo("");
//     // setDateOfShippingthree("");
//     // setVendorIds([]);
//   };

//   return (
//     <div>{useremail}
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="productName"
//         placeholder="Product Name"
//         value={productName}
//         onChange={(event) => setProductName(event.target.value)}
//       />

//       <input
//         type="number"
//         name="quantity"
//         placeholder="Quantity"
//         value={quantity}
//         onChange={(event) => setQuantity(event.target.value)}
//       />

//       <input
//         type="date"
//         name="dateOfShipping"
//         placeholder="Date of Shipping"
//         value={dateOfShipping}
//         onChange={(event) => setDateOfShipping(event.target.value)}
//       />
//         <input
//         type="date"
//         name="dateOfShippingtwo"
//         placeholder="Date of Shipping"
//         value={dateOfShippingtwo}
//         onChange={(event) => setDateOfShippingtwo(event.target.value)}
//       />
//       <input
//         type="date"
//         name="dateOfShippingthree"
//         placeholder="Date of Shipping"
//         value={dateOfShippingthree}
//         onChange={(event) => setDateOfShippingthree(event.target.value)}
//       />
//       <select
//         name="vendorIds"
//         placeholder="Vendors"
//         onChange={(event) => setVendorIds(event.target.value)}
//       >
//         {
//             vendorList?.map((vendor) => {
//                 return (
//                     <option value={vendor.name} key={vendor.id}>{vendor.name}</option>
//                 )
//             })
//         }
//       </select>

//       <input
//         type="file"
//         name="file"
//         accept="application/pdf"
//         required
//         onChange={(event) => setFile(event.target.files[0])}
//       />
//       <button type="submit">submit</button>
//     </form>
//     </div>
//   );
// };

// export default CreatePurchaseOrderForm;


import { useEffect, useState } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";


function CreatePurchaseOrderForm() {
  // const [title, setTitle] = useState("");
  // const [name, setname] = useState("");
  // const [file, setFile] = useState("");
  
  // const [allImage, setAllImage] = useState(null);


  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dateOfShipping, setDateOfShipping] = useState("");
  const [dateOfShippingtwo ,setDateOfShippingtwo] = useState("")
  const [dateOfShippingthree ,setDateOfShippingthree] = useState("")
  const [vendorIds, setVendorIds] = useState("");
  const [vendorList, setVendorList] = useState([]);
  const [file, setFile] = useState(null);
  const location = useLocation() ;
  const useremail = location.state.useremail ;
  
    const getVendors = async() => {

    const response = await axios.post('/getvendors',{
        useremail
    });
    setVendorList(response.data);
  }
  useEffect(() => {
    getVendors(); 
  }, [useremail]);



  // useEffect(() => {
  //   getPdf();
  // }, []);
  // const getPdf = async () => {
  //   const result = await axios.get("http://localhost:9000/");
  //   console.log(result.data.data);
  //   setAllImage(result.data.data);
  // };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("UserEmail",useremail)
    formData.append("vendorIds",vendorIds)
    formData.append("productName",productName)
    formData.append("quantity",quantity)
    formData.append("dateOfshipping",dateOfShipping) 
    formData.append("dateOfShippingtwo",dateOfShippingtwo)
    formData.append("dateOfShippingthree",dateOfShippingthree)
    formData.append("file",file)

    // formData.append("title", title);
    // formData.append("name", name);
    // formData.append("file", file);
    // console.log(title,name, file);

    const result = await axios.post(
      "http://localhost:9000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      // getPdf();
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <form className="form-div d-block" onSubmit={submitImage}>
        <h4>Product Order </h4>
        <br />
        {/* <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        /> */}
      <input className="d-block my-2 form-control"
        type="text"
        name="productName"
        placeholder="Product Name"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
      />

      <input className="d-block my-2 form-control"
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />

      <input className="d-block my-2 form-control"
        type="date"
        name="dateOfShipping"
        placeholder="Date of Shipping"
        value={dateOfShipping}
        onChange={(event) => setDateOfShipping(event.target.value)}
      />
        <input className="d-block my-2 form-control"
        type="date"
        name="dateOfShippingtwo"
        placeholder="Date of Shipping"
        value={dateOfShippingtwo}
        onChange={(event) => setDateOfShippingtwo(event.target.value)}
      />
      <input className="d-block my-2 form-control"
        type="date"
        name="dateOfShippingthree"
        placeholder="Date of Shipping"
        value={dateOfShippingthree}
        onChange={(event) => setDateOfShippingthree(event.target.value)}
      />
      <select className="d-block my-2 form-control"
        name="vendorIds"
        placeholder="Vendors"
        value={vendorIds}
        onChange={(event) => setVendorIds(event.target.value)}
      >
        {   
            vendorList?.map((vendor) => {
                return (
                    <option value={vendor.email} key={vendor.id}>{vendor.email}</option>
                )
            })
        }
      </select>
        <br />
        <input className="d-block my-2 form-control"
          type="file"
          class="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button class="btn btn-dark login-btn" type="submit">
          Submit
        </button>
      </form>
     
    </div>
  );
}

export default CreatePurchaseOrderForm;
