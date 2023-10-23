
import React , { useState, useEffect }from "react";
import axios from "axios";
import PdfComp from "./PdfComp";
import { pdfjs } from "react-pdf";
import { toast } from "react-hot-toast"
import { useLocation } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();
// import {  useNavigate } from "react-router-dom";
// import Button from '@material-ui/core/Button';

const Vendordashboard = (props) => {
    const location = useLocation(); 
    // const navigate = useNavigate()
    var useremail = location.state.email ;
    const [selectvendor, setVendorIds] = useState("")
    const [allorder, setOrderList] = useState([]);
    const [allImage,setAllImage] = useState(null);
      const [pdfFile, setPdfFile] = useState(null);

      var allvendors = [];
   
  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:9000/files/${pdf}`)
  };
    const getVendors = async() => {

        const response = await axios.post('/getorders',{
            useremail
        });
        setOrderList(response.data);
        
        allvendors.push(response.data.dateone) ;
        allvendors.push(response.data.datetwo);
        allvendors.push(response.data.datethree);
    }
    useEffect(() => {
        getVendors(); 
    }, [useremail]);
   const submitNotification = async(e) =>{
    e.preventDefault();
    try {
      console.log(selectvendor)
      const { data } = await axios.post('/notification', {
        useremail , selectvendor 
      })
      if(!data){
        toast.error("error")
      }
      if (data.error) {
        toast.error(data.error)
      } else {
        
        toast.success('Notification sending')
      }
    } catch (error) {
      console.log(error)
    }
   }
    return (
        <div>
            <h1>Welcome {useremail}</h1>
           
            <table border={1} width="30%" cellPadding={10}>
  <tr>
    <th>Name</th>
    <th>quantity</th>
    <th>Schedule 1</th>
    <th>Schedule 2</th>
    <th>Schedule 3</th>
    <th>Document</th>
    
  </tr>
     
      {
      allorder?.map((vendor) => {
                return (
                   <tr>
    <td>{vendor.productName}</td>
    <td>{vendor.quantity}</td>
    <td>{vendor.dateone}</td>
    <td>{vendor.datetwo}</td>
    <td>{vendor.datethree}</td>
    <td>{vendor.pdf}</td>
    <td> <div className="uploaded">
        
        <div className="output-div">
          {allorder    == null
            ? ""
            : allorder.map((data) => {
                return (
                  <div className="inner-div">
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile}/>
      </td>
    {/* <a href=""> show pdf</a> */}
    </tr>
                    
                )
            })
        }
        </table>
        <form className="formStyle" onSubmit={submitNotification}>
        <label> Select_Schedule</label>
  <select
        name="vendorIds"
        value={selectvendor}
        onChange={(event) => setVendorIds(event.target.value)}
      >
        <option>Schedule 1</option>
        <option>Schedule 2</option>
        <option>Schedule 3</option>
      </select>
  
      

        <button class="btn btn-primary" type="submit">
          Confirm
       </button>
       </form>

        <h5> Plz , Confirm Schedule Properly it can't editable later </h5>
        </div>
        
    )
}
export default Vendordashboard  ;