import express from 'express' ;
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("mongodb is connected");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
const app = express();
app.use(express.json());//allow json data to send the server

app.listen(3000,()=>{
    console.log("Server is running on port no. 3000");
})


app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);