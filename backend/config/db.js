import mongoose from "mongoose";
export const connectDb = async ()=>{
    await mongoose.connect('mongodb+srv://ekamsinghahuja123:ekamsinghahuja123@cluster0.zothmyw.mongodb.net/projects1').then(()=>console.log('db connected'))
}
