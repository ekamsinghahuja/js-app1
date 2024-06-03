import userModel from "../models/usermodel.js"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 
import validator from "validator";

const createToken = (id)=>{
    return jwt.sign({id},"secret");
}


const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,mesage:"user not found, please sign up"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,mesage:"wrong password"});
        }
        const token = createToken(user._id);
        res.json({success:true,token});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"});
    }
   
};

const registerUser = async (req, res) => {
    const {name,password,email} = req.body;
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:true,message:"user already exists"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:true,message:"please give valid email"});
        }
        if(password.length<8){
            return res.json({success:true,message:"please enter better password"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"});

    }
   
};

export {loginUser,registerUser}