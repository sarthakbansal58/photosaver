import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config()

//middleware to verify that the user is authenticated before getting access to rhe images
export const isAuthenticated= async (req,res,next)=>{
    try{
        const token = req.cookies

        if(!token){
            return res.status(401).json({
                status:false,
                message:'you are not authenticated'
            })


        }
        const decode =jwt.verify(token,process.env.JWT_SECRET)

        const user= await User.findById(decode.id)
        if(!user){
            return res.status(401).json({
                status:false,
                message:'user not found'
            })
        }
        req.user=user
        next()

    }
    catch(error){
        res.status(500).json({
            status:false,
            message:error.message
        })
    }
}


