import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js';


dotenv.config();


//mongoose connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to MongoDB')
  }).catch((err)=>{
    console.log(err);
  })
  

// express
const app = express();
app.use(express.json());

app.use(cookieParser());

// using userroute api
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)



//listening to port
app.listen(8000,()=>{
    console.log('server is running on port 8000 !!!!')
  })
  

  //middleware handling error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });