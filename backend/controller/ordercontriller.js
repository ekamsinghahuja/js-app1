import orderModel from "../models/orderModel.js";
import userModel from "../models/usermodel.js"; 


//placing order from front end
const placeOrder = async(req,res)=>{
    console.log(req.body.userId);
    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,

        })
        await newOrder.save();
        
        await userModel.findByIdAndUpdate({ _id: req.body.userId},{cart:{}});
        
        res.json({success:true,message:"successfully odered"});
    }
    catch(error){
        console.log(error);
        res.json({success:true,message:"retry later"});

    }

}

const listFood= async (req,res)=>{
    try{
        const order = await orderModel.find({});
        res.json({success:true,data:order});
    }
    catch(error){
        console.log(error);
        res.json({success:false,data:"Error"});
    }
}
export {placeOrder,listFood}