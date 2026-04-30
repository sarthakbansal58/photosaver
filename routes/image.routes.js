import express from 'express'
import { deleteImage, getAllImages, uploadImage } from '../controllers/image.controller.js'
import { isAuthenticated} from '../middlewares/auth.middleware.js'
import upload from '../middlewares/multer.js'


const imgrouter=express.Router()

imgrouter.get('/getall',isAuthenticated,getAllImages)
imgrouter.post('/upload',isAuthenticated,upload.single('image'),uploadImage)
imgrouter.delete('/delete/:id',isAuthenticated,deleteImage)



export default imgrouter