
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import "./user.css"


const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const LoginsUser = async (e) => {
    e.preventDefault()
    const { email, password } = data
    try {
      const { data } = await axios.post('/login', {
        email,
        password
      });
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        navigate('/usersdashboard',{replace : true , state:{email}});
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <section className="container d-flex justify-content-center">

        <form onSubmit={LoginsUser} className="form-div">

          <label className="d-block my-2">Email</label>
          <input type="text" placeholder="Enter the Email...." value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>

          <label className="d-block my-2" >Password</label>
          <input className="d-block my-2 form-control" type="text" placeholder="Enter the Password...." value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>

          <button className="btn btn-dark my-2 login-btn" type="submit">Login</button>
        </form>
      </section>
      <a href="./Register" className="no-btn btn container d-flex justify-content-center">if you not having account Register</a>
    </>
  )
}

export default Login