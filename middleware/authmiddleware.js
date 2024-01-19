import JWT from 'jsonwebtoken'
import usermodel from '../models/usermodel.js';
export const requireLogin=async(req,res,next)=>{
try {
    const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
    req.user=decode;
    next();
} catch (error) {
   
}
}
export const isAdmin=async(req,res,next)=>{
    try {
        const user =await usermodel.findById(req.user._id)
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:'Unauthorized Access'
            })
        }
        else{
            next()
        }
    } catch (error) {
        
    }
}