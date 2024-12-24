import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/imageRoute.js';


const PORT = process.env.PORT || 4000

const app = express();

mongoose.connect(process.env.MONGO_DB).then(()=> {
    console.log("connected to MongoDb")
}).catch(err => console.log(err))


app.use(express.json());
app.use(cors());


app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.get('/' ,(req, res)=> {
    res.send("Server is working")
})

app.listen(PORT , ()=> {
    console.log("server is working on port "+PORT)
})