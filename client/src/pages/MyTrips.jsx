import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../index.css";
import {toast} from "react-toastify";
export const MyTrips=()=>{
    const navigate=useNavigate();
    const [trips,setTrips]=useState([]);
    const [loading,setLoading]=useState(true);
    const fetchTrips=async ()=>{
        try{
          const token=localStorage.getItem("token");
          const response=await fetch(
            "http://localhost:5000/api/trips/my-trip",
            {
                method:"GET",
                headers:{
                  Authorization:`Bearer ${token}`
                },
            }
          );
          const data=await response.json();
          console.log("My Trip Response:",data);
          if(response.ok){
            setTrips(data.trips || []);
          } else {
            toast.error(data.message || "Failed to fetch trips");
          }
        }catch(error){
          console.log("Fetch trips error:",error);
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
    };
    useEffect(()=>{
      fetchTrips();
    },[]);
    const handleDelete=async(id)=>{
      const confirmDelete=window.confirm(
        "Are you sure you want to delete the trip?"
      );
      if(!confirmDelete)return;
      try{
      const token=localStorage.getItem("token");
      const response=await fetch(
        `http://localhost:5000/api/trips/${id}`,
        {
          method:"DELETE",
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );
      const data=await response.json();
      if(response.ok){
        toast.success("Trip deleted successfully");
        setTrips((prevTrips)=>prevTrips.filter((trip)=>trip._id!==id));
      } else {
        toast.error(data.message || "Failed to delete trip");
      }
      } catch (error){
        console.log("Delete Trip Error:",error);
        toast.error("Something went wrong");
      }
    };
    if(loading){
      return (

        <div className="my-trips-loading">
          <h2>Loading your trips...✈️</h2>
        </div>
      );
    }
    return (
      <div style={{
    backgroundImage: "url('/images/nicepicture.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
  >
      <div className="my-trips-page">
        <div className="my-trips-header">
          <h1>My Trips ✈️</h1>
          <p>Your personalized trip plans are waiting for you</p>
          <button className="create-new-trip-btn"
          onClick={()=>navigate("/create-trip")}>+Create New Trip</button>
        </div>
        {trips.length === 0?(
          <div className="no-trips">
            <h2>No trips yet</h2>
            <p>Create your first personalized trip with AI</p>
            <button className="create-new-trip-btn" 
            onClick={()=>navigate("/create-trip")}>
              Create Your First Trip
            </button>
          </div>
        ):(
          <div className="trips-grid">
            {trips.map((trip)=>(
              <div className="trip-card" key={trip._id}>
                <div className="trip-card-header">
                                <h2>
                                    📍 {trip.destination}
                                </h2>
                            </div>

                            <div className="trip-info">

                                <div>
                                    <span>📅</span>
                                    <p>
                                        <strong>Days</strong>
                                        {trip.days}
                                    </p>
                                </div>

                                <div>
                                    <span>👥</span>
                                    <p>
                                        <strong>Travellers</strong>
                                        {trip.travellers}
                                    </p>
                                </div>

                                <div>
                                    <span>💰</span>
                                    <p>
                                        <strong>Budget</strong>
                                        {trip.budget}
                                    </p>
                                </div>

                                <div>
                                    <span>🎒</span>
                                    <p>
                                        <strong>Style</strong>
                                        {trip.travelStyle}
                                    </p>
                                </div>

                            </div>

                            {trip.itinerary && (
                                <div className="trip-description">
                                    <strong>About your trip</strong>

                                    <p>
                                        {trip.itinerary}
                                    </p>
                                </div>
                            )}

                            <div className="trip-card-actions">

                                <button
                                    className="view-trip-btn"
                                    onClick={() =>
                                        navigate(`/trip/${trip._id}`)
                                    }
                                >
                                    View Trip
                                </button>

                                <button
                                    className="delete-trip-btn"
                                    onClick={() =>
                                        handleDelete(trip._id)
                                    }
                                >
                                    Delete
                                </button>
                </div>
                </div>
            ))}
      </div>
        )}
        </div>
        </div>
    );
};