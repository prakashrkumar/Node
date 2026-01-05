
import express from "express"

import ContactRoute from "./routes/contacts.routes.js"


import { connectDB } from "./config/database.js"
const app=express()
// database connection
connectDB()
const PORT=process.env.PORT;
// midle ware
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

//Routes
app.use("/",ContactRoute)










app.listen(PORT,(req,res)=>{
    console.log(`server is running on Port ${PORT}`)
})
