import mongoose from "mongoose";
import validator from "validator";
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Name is required"],
            trim:true,
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true,
            lowercase:true,
            validate:[validator.isEmail,"Please enter a valid email"]
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            minlength:6,
        },
        phone:{
            type:Number,
            required:[true,"Phone number is required"],
            minlength:10
        }
    },
    {
        timestamps:true,
    }
);
const User=mongoose.models.User || mongoose.model("User",userSchema);
export default User;