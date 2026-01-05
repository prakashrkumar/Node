
import express from "express"

const app=express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

const PORT=3000;


app.get("/",(req,res)=>{
    res.send("this is home page")
})

app.get("/Rupam",(req,res)=>{
   // let items=["apple","orange","mango"]
   let users=[
    {name:"prakash",age:23,city:"madhubani"},
    {name:" Ramesh",age:20,city:"madhub"},
    {name:"Rupam",age:29,city:"madh"},
   ]
    res.render("about",{
        title:"Kuchto set karo",
        message:"I love my work",
        //items:items,
       items:users
    })
})
app.get("/form",(req,res)=>{
    res.render('form',{message:null})
})
app.post("/submit",(req,res)=>{
    let name=req.body.myname;
    let message=`hello ${name} you submitted the form`
    res.render("form", {message:message})
})






app.listen(PORT,(req,res)=>{
    console.log(`server is running on Port ${PORT}`)
})


