const express=require("express")
const session=require("express-session")
const bcrypt=require("bcrypt")
const mongoose=require("mongoose")
const User=require("./model/user.model.js")
 

const app=express();
const PORT=3000;


//db connection
mongoose.connect("mongodb://127.0.0.1:27017/user-curd")
.then(()=>{
    console.log(`mongodb connected successfully`)
})

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set("view engine","ejs")

// session create
app.use(session({
    secret:"prakashr",
    resave:false,
    saveUninitialized:false
}))

let checkLogin=(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else{
        res.redirect("login")
    }
}





//Routes
app.get("/",checkLogin,(req,res)=>{
    res.send(`<h1>Home Page</h1>
           <p> Hello , ${req.session.user}</p>
           <a href="/logout">Logout</a>
           
           `)
})
app.get("/login",(req,res)=>{
    if(req.session.user){
        res.redirect("/")
    }
    else{
    res.render("login",{error:null})
    }
    
})


app.get("/register",(req,res)=>{
    res.render("register",{error:null})
})


app.post("/register",async(req,res)=>{
   const {username,userpassword}=req.body
    const hasedPassword=await bcrypt.hash(userpassword,10)
    //res.send({username,userpassword:hasedPassword})
    await User.create({username,userpassword:hasedPassword})
   res.redirect("/login")
   
    
})
app.post("/login",async(req,res)=>{
    const {username,userpassword}=req.body

const user=await User.findOne({username})
if(!user){
    return res.render("login",{error:"User not found"})
}
const isMatch=await bcrypt.compare(userpassword,user.userpassword)
if(!isMatch){
    return res.render("login",{error:"Invalid Password"})
    
}
req.session.user=username;
res.redirect("/")
//res.send(user)

   
})

app.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login")
    })
})







app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})