import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authroutes from "./Routes/auth.js";
import protectedRoutes from './Routes/Protected.js';
import connectDB from "./config/db.js";

const documentRoutes = require('./Routes/documentRoutes');
const sharedDocRoutes = require("./Routes/sharedDocuments.js");
const docHistoryRoutes = require('./Routes/historyRoutes');
const commentRoutes = require('./Routes/commentRoutes');

// dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authroutes);
app.use('/api/protected', protectedRoutes);
app.get("/", (req, res)=>{
  res.send("hi");
})
app.use("/api/documents", documentRoutes);
app.use('/api/shares', sharedDocRoutes);
app.use("/api/documents/:documentId/history", docHistoryRoutes);
app.use('/api/documents/:documentId/comments', commentRoutes);

const PORT=process.env.PORT||3000;

connectDB().then(()=>{
app.listen(PORT,()=>console.log(`Server running on ${PORT}`));
});
