const express = require("express");
const mongoose=require("mongoose")
const cors=require("cors")
const connectDB=require("./config/database")
const User=require("./models/users.model")



// connectionDB
connectDB()

const app=express()
const PORT=process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// Get all Users
app.get('/api/users',async(req,res)=>{
    const users=await User.find()
    res.json({data:users})
})




app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})

