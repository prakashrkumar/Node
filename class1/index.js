const express=require("express")
const app=express()

const PORT=3000;

app.get("/",(req,res)=>{
    res.send("<h1>this is home page </h1>")
})

app.get("/about",(req,res)=>{
    res.send("<h1>this is about page </h1>")
})

app.get("/about/user",(req,res)=>{
    res.send("<h1>this is user page </h1>")
})
app.get("/about/:id/book/:bookid",(req,res)=>{
    res.send(req.params)
})
app.get("/search",(req,res)=>{
    res.send(req.query)
})

app.listen(PORT,(req,res)=>{
    console.log(`server is running on PORT ${PORT}`)
})