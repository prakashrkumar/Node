const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
require("./auth/google")

const passport=require("passport")
const session=require("express-session")

// session step
app.use(session({
    secret:'mysecret',
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())


app.get("/",(req,res)=>{
    res.send(`<a href="/auth/google">Login with Google</a>`)

})


const PORT=process.env.PORT



app.get('/auth/google',
  passport.authenticate(
    'google', 
    { scope: ['profile','email'] }
));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', 
    { 
        failureRedirect: '/login', 
        successRedirect:'/profile'
    }
),
);

// midleware
function authCheck(req,res,next){
    if(req.isAuthenticated()){
      return  next()
    }
    return res.redirect("/")
    
}

app.get("/profile",authCheck,(req,res)=>{

    console.log(req.user)
    res.send(`<h1>Welcom ${req.user.displayNmae}</h1>
        <img src="${req.user.photos[0].value}"/>
        <a href='logout'><Logout</a>
        
        `)
})



app.get("/logout",(req,res)=>{
    req.logOut(()=>{
        res.redirect("/")
    })
})

app.listen(PORT,(req,res)=>{
    console.log(`server is running on Port ${PORT}</h1>`)
       
    
})