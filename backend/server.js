import express, { json, urlencoded } from 'express';
import dotenv from "dotenv"
dotenv.config()
import mongoose from 'mongoose';
import userData from "./models/userSchema.js"
import Auth from "./routes/auth.js"
import cors from "cors"

const app = express();
const db = process.env.DB

app.use(cors())
//always keep this on top
app.use(express.json())
app.use(Auth)
app.use(urlencoded())


const PORT = process.env.PORT

mongoose.connect(db).then(()=>{
    console.log("Databse connected succesffully ")
}).catch(err => console.log("Error occuered ", err))


app.listen(PORT, ()=>{
    console.log("Listeing on port ", PORT)
})