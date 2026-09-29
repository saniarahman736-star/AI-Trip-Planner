import {useEffect,useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import "../index.css";
export const ViewTrip=()=>{
    const {id}=useParams();
    const navigate=useNavigate();
    const[trip,setTrip]=useState(null);
    const[loading,setLoading]=useState(true);
    const fetchTrip=async()=>{
        try{
         const token=localStorage.getItem("token");
         const response=await fetch(
            `http://localhost:5000/api/trips/${id}`,
            {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }
         );
         const data=await response.json();
         console.log("Trip Details:",data);
         if(response.ok){
            setTrip(data.trip);
         } else {
            toast.error(
                data.message || "Failed to load trip"
            );
         }
        } catch(error){
           console.log("View Trip error:",error);
           toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchTrip();
    },[id]);
    if(loading){
        return (
            <div className="view-trip-loading">
                <div>
                    <h2>Creating your travel experience...</h2>
                    <p>Please wait while we load your itinerary</p>
                </div>
            </div>
        );
    }
    if(!trip){
        return (
            <div className="view-trip-loading">
                <h2>Trip Not Found 😔</h2>
                <button onClick={()=>navigate("/create-trip")}>Create New Trip</button>
                </div>
        );
    }
    return (
        <div className="view-trip-page">
            <div className="view-trip-header">
                <button className="back-btn" onClick={()=>navigate("/create-trip")}>Create Another Trip</button>
                <h1>✈️Your Trip to {trip.destination}</h1>
                <p>Your personalized AI-generated travel itinerary</p>
            </div>
            <div className="trip-summary">
                <div className="summary-card">
                    <span>📍</span>
                    <div><small>Destination</small>
                    <strong>{trip.destination}</strong>
                    </div>
                </div>
                <div className="summary-card">
                    <span>📅</span>
                    <div><small>Duration</small>
                    <strong>{trip.duration}</strong>
                    </div>
                </div>
                <div className="summary-card">
                    <span>👥</span>
                    <div><small>Travellers</small>
                    <strong>{trip.travellers}</strong>
                    </div>
                </div>
                <div className="summary-card">
                    <span>💰</span>
                    <div><small>Budget</small>
                    <strong>{trip.budget}</strong>
                    </div>
                </div>
                <div className="summary-card">
                    <span>🧳</span>
                    <div><small>Travel Style</small>
                    <strong>{trip.travelStyle}</strong>
                    </div>
                </div>
              </div>
            <div className="itinerary-section">
                <div className="itinerary-title">
                    <h2>🤖 Your AI Itinerary</h2>
                    <p>Here is your personalized travel plan.</p>
                </div>
                <div className="itinerary-content">
                    {typeof trip.itinerary === "string" ? (
                        <div className="itinerary-text">{trip.itinerary}
                        </div>
                    ) : (
                        <pre>{JSON.stringify(
                            trip.itinerary,null,2
                    )}
                    </pre>
                    )}
                </div>
            </div>
            <div className="preferences-section">
            <h2>💡Your Trip Preferences</h2>
            <p>{trip.itinerary || "You did not add any special prefernces."}</p>
        </div>
        </div>
    );
};