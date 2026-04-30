import mongoose from 'mongoose'

const imageSchema =new mongoose.Schema({
    public_id:{
        type:String,
        required:true,
    
    },
    url:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'User'
    }



},{timestamps:true})


const imageModel = mongoose.model("Image",imageSchema)

export default imageModel