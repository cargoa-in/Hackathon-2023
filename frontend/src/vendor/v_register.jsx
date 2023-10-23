import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
const Register = () => {
  const Navigate = useNavigate()
  const location = useLocation();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [conf_password , setConf_password] = useState("")
  const [validator , setvalidator] = useState("")
  var useremail = location.state.useremail
  console.log(useremail)
  const RegisterVendor = async (e) => {
    e.preventDefault()
    
    const { name, email, password } = data
    if (password !== conf_password){
      setvalidator("Password do not match");
      return;
    }
    try {
      const { data } = await axios.post('/v_register', {
        name, email, password ,useremail
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Login successfull !')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className="container d-flex justify-content-center">
      <form onSubmit={RegisterVendor}>
        <label className="d-block my-2">Name</label>
        <input className="d-block my-2 form-control" type="text" placeholder="Enter the name...." value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}></input>

        <label className="d-block my-2">Email</label>
        <input className="d-block my-2 form-control" type="email" placeholder="Enter the Email...." value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>

        <label className="d-block my-2">Password</label>
        <input className="d-block my-2 form-control" type="password" placeholder="Enter the Password...." value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>

        <label className="d-block my-2">Confirm Password</label>
        <input className="d-block my-2 form-control" type="password" placeholder="Enter the Password...." value={conf_password} onChange={(e) => setConf_password(e.target.value)}></input>
        

        <button className="btn btn-dark my-2 login-btn"type="submit">submit</button>
        {validator && <p>{validator}</p>}
      </form>
      
    </section>

  )
}

export default Register