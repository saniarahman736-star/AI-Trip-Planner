import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";
import "../index.css";
export const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {login}=useAuth();
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const response=await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    email,password
                }),
            }
          );
          const data=await response.json();
          console.log("LOGIN RESPONSE",data);
          if(data.success){
            login(data.user,data.token);
            toast.success("Login successful");
            navigate("/");
          }else{
            alert(data.message);
          }
        }catch(error){
            console.error(error)
            toast.error("Something went wrong.Please try again");
        }
    };
    return (
        <div style={{
    backgroundImage: "url('/images/careerpic.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
  >
        <div className="login-page">
            <div className="left-text">
                <h1>TRAVEL</h1>
                <br/>
                <h1>EXPLORE HORIZONS</h1>
                <br/>
                <p>
                    Unlock the world.Let your wanderlust guide you to your dream destinations.
                </p>
            </div>
            <div className="right-text">
            <h1>Welcome To Travelista Tours</h1>
            <p>Sign in to continue your journey</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input 
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required autoComplete="off"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required autoComplete="off"
                    />
                </div>
                <button type="Submit">Login</button>
            </form>
            </div>
        </div>
        </div>
    
    )
}