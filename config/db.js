import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config()



const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(` the database hasbeen connected succesfully `)


    }
    catch(error){
        console.log(`failed to connect to mongoose  :-  ${error}`)
    }

}

export default connectDB