import { v2 as cloudinary } from "cloudinary";
import Image from "../models/image.model.js";
import dotenv from "dotenv";
import User from "../models/user.model.js";
dotenv.config()



// to upload images to cloudinary and save the image url to mongodb

export const uploadImage =async (req,res)=>{

    try{
        const file = req.file
        if(!file){
            return res.status(400).json({
                status:false,
                message:'no file uploaded'
            })

        }
        const result = await cloudinary.uploader.upload(file.path)
        //saving the image url and public id to mongodb
        const newImage= await Image.create({
            url:result.secure_url,
            public_id:result.public_id,
            uploadedBy:req.user._id
        })

        res.status(200).json({
            status:true,
            message:'image has beeen uploaded successfully',
            data:newImage


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
        const { id }=req.params
        const image= await Image.findById(id)
        if(!image){
            return res.status(404).json({
                status:false,
                message:'image not found'
            })
        }
        // deleting  the image from cloudinary 

        await cloudinary.uploader.destroy(image.public_id)

        // deleting from mongodb
        await Image.findByIdAndDelete(id)
        

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
         
        // getting all the images from mongodb 
        const images= await Image.find({user_id:req.user._id})
        if(!images){
            return res.status(404).json({
                status:false,
                message:'no images found'
            })  
        }

        res.status(200).json({
            status:true,
            message:`images fetched successfully`,
            data:images
        }) 
        
        
    }
    catch(error){
        res.status(500).json({
            status:false,
            message:`failed to get images  :-  ${error}`
        })  

    }
}









