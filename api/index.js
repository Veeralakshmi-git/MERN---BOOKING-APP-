import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"; 

const app = express();
dotenv.config();

const connect =   () => {
    try{
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
    }catch (error){
        console.log(error);
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected");
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.use((err,req,res,next)=>{
   const errorStatus = err.status || 500;
   const errorMessage = err.message || "something went wrong!";
   return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack: err.stack,
   })
})

app.listen(5000, ()=>{
    connect();
    console.log("connected to backend");
})