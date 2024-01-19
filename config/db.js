import mongoose from 'mongoose'

const connectDB=async()=>{
    try{
    const connect= await mongoose.connect(process.env.MONGO_URI)
   console.log("Connected to mongodb");
   
    }catch(err){
        console.log("ERRROR IN MONGOOSE"+`${err}`);
        

    }
}

export default connectDB