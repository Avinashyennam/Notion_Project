import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authroutes from "./Routes/auth.js";
import protectedRoutes from './Routes/Protected.js';
import connectDB from "./config/db.js";

// dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authroutes);
app.use('/api/protected', protectedRoutes);
const PORT=process.env.PORT||3000;

connectDB().then(()=>{
app.listen(PORT,()=>console.log(`Server running on ${PORT}`));
});
