const express=require("express")
const session=require("express-session")
const _connectMongo=require("connect-mongo")
const MongoStore=_connectMongo.default||_connectMongo
//const MongoStore=require("connect-mongo")
const  app=express()


const PORT=3000;
app.use(session({
   
    secret:"secretpassword",
    resave:false,
    saveUninitialized:false,
     // monodb session store krne ke liye
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/sessiondb',
            collectionName : 'mysessions',
            // time limit life yaha v set kar sekte hai
           // ttl:1000*60*60*24,
    }),

    cookie:{maxAge:1000*60*60*24},
   
     
})
)
app.get("/",(req,res)=>{
    
   if(req.session.username){
       res.send(`<h1>UUsername for session is:${req.session.username} .</h1>`)
    }
    else{
         res.send(`<h1> No Username found in this  session </h1>`)

    }
})
app.get("/set-username",(req,res)=>{
    req.session.username="prakash"
    res.send("<h1>UUsername has been set in session .</h1>")
})
app.get("/get-username",(req,res)=>{
    if(req.session.username){
       res.send(`<h1>UUsername for session is:${req.session.username} .</h1>`)
    }
    else{
         res.send(`<h1> No Username found in this  session </h1>`)

    }
   
    
})


app.get("/destroy",(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.status(500).send("failed to destory session")
        }
        res.send('<h1>session destory successfully .</h1>')
    })
   
    
})





app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})