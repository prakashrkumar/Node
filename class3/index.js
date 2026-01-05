const express=require("express")
const app=express()


const PORT=3000;
app.use(express.json())

app.set("view engine","ejs")
// fromke liye
app.use(express.urlencoded({extended:false}))
// property
app.get("/",(req,res)=>{

})
// jo hai sare return karta hai
app.post("/about",(req,res)=>{
    res.send(req.body)
})
// hostname return karta hai
app.get("/hostname",(req,res)=>{
    res.send(req.hostname)
})
// ip address return karta hai
app.get("/ip",(req,res)=>{
    res.send(req.ip)
})
// all ip address return karta hai
app.get("/ips",(req,res)=>{
    res.send(req.ips)
})
// METHOD barhata hai kon sa use kiye ho
app.get("/method",(req,res)=>{
    res.send(req.method)
})
// rout ke sath aage sare query return kartA HAI
app.get("/org",(req,res)=>{
    res.send(req.originalUrl)
})
//only rout-name return karta hai
app.get("/pt",(req,res)=>{
    res.send(req.path)
})
// kon se use karte ho http/https
app.get("/hp",(req,res)=>{
    res.send(req.protocol)
})
//b protocol-a->secure=true
// unsecure=false
app.get("/se",(req,res)=>{
    res.send(req.secure)
})
// route se relate internal information
app.get("/rs/:userid",(req,res)=>{
    res.send(req.route)
})
// method
app.get("/mt",(req,res)=>{
    if(req.accepts("html")){
        res.send("<h1>hello html</h1>")
    }
    else if(req.accepts("json")){
        res.send({message:"ok json  i"})
    }
     else if(req.accepts("xml")){
        res.send("<message>Hello xml</message>")
    }
    else{
        res.send("content type not supported")
    }
})

app.get("/hd",(req,res)=>{
    res.send(req.headers)
})
app.get("/gt",(req,res)=>{
    res.send(req.get("host"))
})
app.post("/end",(req,res)=>{
   if(req.is("application/json")){
    res.send("json formate ")
   }
  else if(req.is("text/html")){
    res.send("html formate ")
   }
   else{
    res.status(404).send("unsupported file")
   }
})

app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})