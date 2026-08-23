import express from "express";
import cokkieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";


const app = express();
dotenv.config({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cokkieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
const PORT = process.env.PORT || 3000;

app.get("/h", (req, res) => {
  res.send("Hello World!");
});

app.use(cors(corsOptions));

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})