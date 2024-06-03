import express from 'express'
import { addFood, listFood, removeFood } from '../controller/foodcontroller.js'
import multer from  'multer'

const foodRauter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})
foodRauter.post("/add",upload.single('image'),addFood);
foodRauter.get("/list",listFood);
foodRauter.post("/remove",removeFood)

export default foodRauter;