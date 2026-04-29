import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import dotenv from "dotenv"

dotenv.config()


//signup api
 export const signup= async (req,res)=>{
    try{
        const {name, email,password}=req.body

        //if any of the field is missing then return an error
        if(!name || !email|| !password){
            res.status(400).json({
                status:false,
                meassage:`enter all the fields`
            })

        }
        // cheak if user already exists with the same email then return an error
        const existingUser= await User.findOne({email})
        if(existingUser){
            res.status(400).json({
                status:false,
                message:`user already exist in the database`
            })
        }
        // hashing the password using bcrypt
        const hashedPassword=await bcrypt.hash(password,10)

        //createating a new user in database
        const user= await User.create({
            name,
            email,
            password:hashedPassword
        })
        // generating jwt token for the user
        const token =jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        // sending the token into the cookie
        res.cookie('token',token)


        // sending the response to the user with token 
        res.status(201).json({
            status:true,
            message:`user created succesfully`,
            user,
            token
        })










    }
    catch(error){
        res.status(500).json(
            {
                status:false,
                message:error.message
            }
        )
    }

}


//login api
export const login= async (req,res)=>{
    try{
        const {email,password}=req.body

        //if any of the field is missing then return an error
        if(!email|| !password){
            res.status(400).json({
                status:false,
                meassage:`enter all the fields`
            })

        }
        // cheak if user already exists with the same email then return an error
        const existingUser= await User.findOne({email})

        if(!existingUser){
            res.status(400).json({
                status:false,
                message:`user does not exist`
            })
        }
        //comparing the given password with the hashed password in the database using bcrypt
        const isPasswordCorect= await bcrypt.compare(password,existingUser.password)

        if(!isPasswordCorect){
            res.status(400).json({
                status:false,
                message:`invalid credentials`
            })
        }
        // generating the jwt token for the user
        const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{expiresIn:"7d"})


        //sending token to the cookie
        res.cookie('token',token)

        // sending the response to te user with token

        res.status(200).json({
            status:true,
            message:"user logged in succesfully",
            user:existingUser,
            token
        })








    }
    catch(error){
        res.status(500).json(
            {
                status:false,
                message:error.message
            }
        )
    }

}




