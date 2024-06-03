import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodroute.js"; // Fixed the typo here
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import userRouter from "./routes/user.js";
import cartRouter from "./routes/cartRout.js";
import authMiddleware from "./middleware/auth.js";
import orderRouter from "./routes/orderRauter..js";
//  from "./routes/userRoute.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
// app.use(authMiddleware);


connectDb();

app.use('/api/food', foodRouter); 
app.use('/api/user', userRouter); 
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'uploads', imageName);

    
    res.sendFile(imagePath);
});

app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log('Server Started');
});
