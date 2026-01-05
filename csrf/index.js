const express=require("express")
const cookieParser=require("cookie-parser")
const csrf=require("csurf")

const app=express()
const PORT=3000;

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set("view engine", "ejs")

app.use(cookieParser())
const csrfProtection=csrf({cookie:true})

app.get("/",(req,res)=>{
    res.send("<h1>Home page</h1>")
})


app.get("/myform",csrfProtection,(req,res)=>{
    res.render("myform",{csrfToken:req.csrfToken()})
})

app.post("/submit",csrfProtection,(req,res)=>{
    res.send(req.body)
})





app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})
