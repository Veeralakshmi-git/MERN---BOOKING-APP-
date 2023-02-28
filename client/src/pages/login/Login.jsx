import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [ credentials, setCredentials ] = useState({
        username:undefined,
        password:undefined,
    })

    const { user, loading, error, dispatch } = useContext(AuthContext);
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev=> ({
            ...prev, [e.target.id]:e.target.value
        }))
    } 

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post("http://localhost:5000/api/auth/login", credentials)
            dispatch({type:"LOGIN_SUCCESS", payload: res.data})
            navigate("/");
        }catch(err){
            dispatch({type:"LOGIN_FAILIURE", payload:err.response.data})
           
        }
    }

    return (
    <div className="login">
        <div className="lContainer">
            <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
            <input type="text" placeholder="password" id="password" onChange={handleChange} className="lInput" />
            <button disabled={loading}  onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>} 
        </div>
    </div>
  )
}

export default Login
