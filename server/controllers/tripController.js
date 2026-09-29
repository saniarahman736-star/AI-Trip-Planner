import Trip from "../models/trip.js";
import { generateItinerary } from "../services/aiService.js";
export const trip=async(req,res)=>{
    try{
      const {destination,days,budget,travellers,travelStyle,itinerary}=req.body;
      if(!destination || !days || !budget || !travellers || !travelStyle){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        });
      }
      const aiItinerary=await generateItinerary({
        destination,days,budget,travellers,travelStyle,itinerary
      })
      const newtrip=await Trip.create({
        user:req.user._id,
        destination,
        days,
        budget,
        travellers,
        travelStyle,
        itinerary:aiItinerary
      });
      res.status(201).json({
        success:true,
        message:"Trip created successfully",
        trip:newtrip
      });
    }catch(error){
       res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
export const getMyTrips=async(req,res)=>{
  try{
   const trips=await Trip.find({
    user:req.user._id
   }).sort({createdAt:-1});
   res.status(200).json({
    success:true,
    count:trips.length,
    trips
   })
  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
export const getTripById=async(req,res)=>{
  try{
    const trip=await Trip.findOne({
      _id:req.params.id,
      user:req.user._id
    });
    if(!trip){
      return res.status(400).json({
        success:false,
        message:"Trip not found"
      });
    }
    res.status(200).json({
      success:true,
      trip
    });
  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
};

export const deleteTrip=async(req,res)=>{
  try{
   const trip=await Trip.findOneAndDelete({
    _id:req.params.id,
    user:req.user._id
   });
   if(!trip){
    return res.status(400).json({
      success:false,
      message:"Trip not found"
    })
   }
    res.status(200).json({
      success:true,
      message:"Trip deleted successfully"
    })
  }catch(error){
      res.status(500).json({
        success:false,
        message:error.message
      })
  }
}