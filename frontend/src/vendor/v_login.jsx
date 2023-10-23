
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";


const Vendor_login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const LoginsUser = async (e) => {
    e.preventDefault()
    const { email, password } = data
    try {
      const { data } = await axios.post('/vendorlogin', {
        email,
        password
      });
      // const {d} = await axios.post('/getuser',{
      //   email
      // })
      //console.log(d)
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        
        navigate('/vender_dashboard',{replace : true , state:{email }});
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <section  className="container d-flex justify-content-center">

        <form onSubmit={LoginsUser} className="form-div">

          <label className="d-block my-2">Email</label>
          <input className="d-block my-2 form-control" type="text" placeholder="Enter the Email...." value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>

          <label className="d-block my-2">Password</label>
          <input className="d-block my-2 form-control" type="text" placeholder="Enter the Password...." value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>

          <button className="btn btn-dark my-2 login-btn" type="submit">Login</button>
        </form>
      </section>
      
    </>
  )
}

export default Vendor_login