import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config()

//middleware to verify that the user is authenticated before getting access to rhe images
export const isAuthenticated= async (req,res,next)=>{
    try{
       const token = req.cookies?.token; 

        if(!token){
            return res.status(401).json({
                status:false,
                message:'you are not authenticated please login to access this resource'
            })


        }
        const decode =jwt.verify(token,process.env.JWT_SECRET)
        
        console.log(`cookies ${req.cookies.token}`)
        console.log(`decoded token ${decode}`)

        const user= await User.findById(decode.userId)
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
            message:` middle ware error ${error.message}`
        })
    }
}


