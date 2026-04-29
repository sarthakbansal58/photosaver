import { v2 as cloudinary } from "cloudinary";
import Image from "../models/image.model.js";
import dotenv from "dotenv";
dotenv.config()



// to upload images to cloudinary and save the image url to mongodb

export const uploadImage =async (req,res)=>{

    try{
        res.status(200).json({
            status:true,
            message:`image uploaded successfully`
        })

    }
    catch(error){
        res.status(500).json({
            status:false,
            message:`failed to upload image  :-  ${error}`
        })
    }
}

//to delete images from cloudinary and delete the image url from mongodb


export const deleteImage=async (req,res)=>{
    try{
        res.status(200).json({
            status:true,
            message:`image deleted successfully`
        })

    }
    catch(error){
        res.status(500).json({
            status:false,
            message:`failed to delete image  :-  ${error}`
        })

    }
}

//to get all images from mongodb and display them to the user


export const getAllImages=async (req,res)=>{
    try{  
        res.status(200).json({
            status:true,
            message:`images fetched successfully`
        }) 
        
        
    }
    catch(error){
        res.status(500).json({
            status:false,
            message:`failed to get images  :-  ${error}`
        })  

    }
}









