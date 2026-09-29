import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../index.css";
import {toast} from "react-toastify";
export const CreateTrip=()=>{
    const navigate=useNavigate();
    const {user}=useAuth();
    const [trip,setTrip]=useState({
        user:"",
        destination:"",
        days:"",
        budget:"",
        travellers:"",
        travelStyle:"",
        itinerary:"",
    });
    const [loading,setLoading]=useState(false);
    const handleInput=(e)=>{
        const {name,value}=e.target;
        setTrip({
            ...trip,
            [name]:value
        });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
         const token=localStorage.getItem("token");
         const response=await fetch("http://localhost:5000/api/trips/trip",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`,
            },
            body:JSON.stringify(trip),
         });
         const data=await response.json();
         console.log("Trip Response:",data);
         if(response.ok){
            toast.success("Trip created successfully");
            setTrip({
                user:"",
                destination:"",
                days:"",
                budget:"",
                travellers:"",
                travelStyle:"",
                itinerary:"",
            })
            navigate("/my-trips");
         }else{
            toast.error(data.message || "Failed to create trip");
         }
        }catch(error){
            console.log("Create Trip error:",error);
            toast.error("Something went wrong");
        } finally{
            setLoading(false);
        }
    }
    return (
        <>
        <div className="create-trip-wrapper"style={{
    backgroundImage: "url('/images/italypic.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
  }}
  >
        <div className="create-trip-page">
            <div className="create-container">
                <h1>Hello {user?.name} 👋</h1>
                
                <p>Welcome to AI Travel Planner</p>

                <h2>Create Your Trip</h2>
                
                <p>Tell our AI what kind of trip you want and let it create a personalized trip for you</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Destinations</label>
                    <input 
                    type="text"
                    name="destination"
                    value={trip.destination}
                    onChange={handleInput}
                    placeholder="e.g. Goa"
                    required autoComplete="off"
                    />
                </div>
                <div>
                    <label>Days</label>
                    <input 
                    type="number"
                    name="days"
                    value={trip.days}
                    onChange={handleInput}
                    placeholder="e.g. 5"
                    required autoComplete="off"
                    />
                </div>
                <div>
                    <label>Budget</label>
                    <select
                    name="budget"
                    value={trip.budget}
                    onChange={handleInput}
                    required
                    >
                    <option value="">
                                    Select your budget
                       </option>
                                <option value="Low">
                                    Low
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="High">
                                    High
                                </option>
                            </select>
                </div>
                <div>
                    <label>Travellers</label>
                    <input 
                    type="number"
                    name="travellers"
                    value={trip.travellers}
                    onChange={handleInput}
                    placeholder="e.g. 2"
                    required autoComplete="off"
                    />
                </div>
                <div>
                    <label>Travel Style</label>
                    <select 
                    name="travelStyle"
                    value={trip.travelStyle}
                    onChange={handleInput}
                    required
                    >
                        <option value="">
                                Select travel style
                            </option>

                            <option value="Budget">
                                💵 Budget
                            </option>

                            <option value="Luxury">
                                💎 Luxury
                            </option>

                            <option value="Adventure">
                                🏔️ Adventure
                            </option>

                            <option value="Family">
                                👨‍👩‍👧 Family
                            </option>

                            <option value="Solo">
                                🎒 Solo
                            </option>

                            <option value="Couple">
                                ❤️ Couple
                            </option>
                    </select>
                </div>
                <div>
                    <label>Tell AI About Your Trip</label>
                    <textarea 
                    name="itinerary"
                    value={trip.itinerary}
                    onChange={handleInput}
                    placeholder="Example: I want beaches, local food, historical places and beautiful sunset locations..."
                            rows="6"
                        />
                </div>
                <button type="submit" className="generate-trip-btn"
                    disabled={loading}>
                    {loading ?" 🤖 Creating your itinerary..." :" ✨ Generate My Trip"}

                </button>
            </form>
        </div>
        <div className="img-part">
            <img src="./images/calenderpic.jpg"></img>
        </div>
        </div>
        </>
    )
}