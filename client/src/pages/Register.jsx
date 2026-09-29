import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import "../index.css";
import {toast} from "react-toastify";
export const Register=()=>{
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        phone:"",
    });
    const navigate=useNavigate();
    const handleInput=(e)=>{
        console.log(e);
        let name=e.target.name;
        let value=e.target.value;
        setUser({
            ...user,
            [name]:value,
        });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(user);
        try{
            const response=await fetch(`http://localhost:5000/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user),
            });
            const res_data=await response.json();
            console.log("Status:", response.status);
            console.log("Response from server:", res_data);
            if(response.ok){
                setUser({name:"",email:"",password:"",phone:""});
                toast.success("Registration Successful");
                navigate("/");
            }else{
                toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message);
            }
            console.log(response);
        } catch(error){
            console.log("register",error);
        }
    };
    return(
        <>
        <div style={{
    backgroundImage: "url('/images/naturepic7.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
  >
    <div className="reister-container">
    <div className="left-portion">
        <h2>AI TRAVEL PLANNER</h2>
        <br/>
        <p>Travel Beyond Borders</p>
        <br/>
        <div className="left-text">
            <img src="./images/naturepic8.jpeg"></img>
            
        </div>
    </div>
    <div className="right-portion">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
                    <label>Username</label>
                    <input 
                    type="text"
                    value={user.name}
                    name="name"
                    onChange={handleInput}
                    placeholder="Enter your name"
                    required autoComplete="off"
                    />
                </div>
            <div>
                    <label>Email</label>
                    <input 
                    type="email"
                    value={user.email}
                    name="email"
                    onChange={handleInput}
                    placeholder="Enter your email"
                    required autoComplete="off"
                    />
                </div>
            <div>
                    <label>Password</label>
                    <input 
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Enter your password"
                    required autoComplete="off"
                    />
                </div>
            <div>
                    <label>Phone Number</label>
                    <input 
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="Enter your phone number"
                    required autoComplete="off"
                    />
                </div>
                <button type="submit" className="create-btn">
                    Register
                </button>
        </form>
        <div className="divider">
            <span></span>
            <p>or continue with</p>
            <span></span>
        </div>
        <div className="social-buttons">
            <button type="button" onClick={()=>window.location.href="https://www.google.com"}>🌐 Google</button>
            <button type="button" onClick={()=>window.location.href="https://www.youtube.com"}>▶️ Youtube</button>
        </div>
        <p>Already Have An Account?
            <Link to="/login">Sign In</Link>
        </p>
    </div>
  </div>
  </div>
        </>
    )
}
