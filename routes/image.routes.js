import express from 'express'
import { deleteImage, getAllImages, uploadImage } from '../controllers/image.controller'



const imgrouter=express.Router()


imgrouter.get('/getall',getAllImages)
imgrouter.post('/upload',uploadImage)
imgrouter.delete('/delete/:id',deleteImage)



export default imgrouter