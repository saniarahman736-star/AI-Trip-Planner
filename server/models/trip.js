import mongoose from "mongoose";
const tripSchema=new mongoose.Schema(
    {
        user:{
            type:String,
            required:true,
            trim:true,
        },
        destination:{
            type:String,
            required:true,
            trim:true,
        },
        days:{
            type:Number,
            required:true,
        },
        budget:{
            type:String,
            enum:["Low","Medium","High"],
            required:true,
        },
        travellers:{
            type:Number,
            required:true,
        },
        travelStyle:{
            type:String,
            enum:["Budget","Luxury","Adventure","Family","Solo","Couple"],
            required:true,
        },
        itinerary:{
            type:String,
            default:"",
        }
    },
    {
        timestamps:true,
    }
);
const Trip=mongoose.models.Trip || mongoose.model("Trip",tripSchema);
export default Trip;