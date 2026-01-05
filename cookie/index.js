const express=require("express")
const cookieParser=require("cookie-parser")

const app=express()
const PORT=3000;
//app.use(cookieParser())
app.use(cookieParser('mySecretKey123'))
app.get("/",(req,res)=>{
    var Home="Home page"
     const username =req.cookies.username;
    if(!username){
        res.send(`${Home}:No cookie found`)
    }
    res.send(`${Home}:Cookie found :${username}`)
})

app.get("/set-cookie",(req,res)=>{
    res.cookie("username","prakash",{
        maxAge:1000*60*15,
        httpOnly:true,
        signed:true
    })
    res.send(`Cookie has been set set`)
})
app.get("/get-cookie",(req,res)=>{ 
    //const username =req.cookies.username;
    const username =req.signedCookies.username;
    if(!username){
        res.send(`No cookie found`)
    }
    res.send("Home Page")
})

app.get("/delete-cookie",(req,res)=>{
    res.clearCookie('username')
    res.send("Cookie has been Deleted")
})


app.listen(PORT , (req,res)=>{
    console.log(`server is running on port ${PORT}`)
})