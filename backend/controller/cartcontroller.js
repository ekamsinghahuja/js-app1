import userModel from "../models/usermodel.js"; 

//add item to the cart
const addToCart = async(req,res)=>{
    try {

        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = userData.cart;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;

        }
        
        await userModel.findOneAndUpdate({ _id: req.body.userId},{cart:cartData});
        res.json({success:true,message:"added to cart"});
    } 
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"});  
    }

}


const removeFromCart = async(req,res)=>{

    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = userData.cart;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }   
        await userModel.findOneAndUpdate({ _id: req.body.userId},{cart:cartData});
        res.json({success:true,message:"removed from cart"});
    } 
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"});  
    }
    

}

//fetch data
const getCart = async(req,res)=>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = userData.cart;
        
        res.json({success:true,cartData});
    } 
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"});  
    }


}

export {addToCart,removeFromCart,getCart};