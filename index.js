import exoress from "express";
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from './routes/auth.routes.js'
import imgrouter from "./routes/image.routes.js";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/db.js";
import multer from "multer";
import Cookies from "cookies";

// accesing the environment variables from the .env file
dotenv.config()
// connected to the configuration files for cloudinary and mongodb
connectCloudinary()
connectDB()


//initilizing the express app and using the cors middleware to allow cross-origin requests
const app= express()
app.use(Cookies.express())

//defining the port number for the server to listen on
const port = process.env.PORT
//
app.use(express.json())
app.use(cors())

//defining the routes for the authentication and image upload and retrieval
app.use('/api/auth',userRoutes)
app.use('/api/image',imgrouter)

//starting the server and listening on the defined port number
app.listen(port,()=>{
    console.log(`the app is running at server http://localhost:${port}`)

})