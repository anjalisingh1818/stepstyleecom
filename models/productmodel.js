import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    oldprice: {
      type: String,
      required: true,
    
    },
    newprice: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
   size:{
    type:String,
    enum:['S','M','L','XL']
   }},
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
