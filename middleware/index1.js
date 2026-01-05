const express=require("express")
const app=express();
// router use middleware
const router=express.Router()

const PORT=3000;
/*
app.use((req,res,next)=>{
    let d=new Date()
   // console.log(`${req.method},  ${req.url}`)
  // console.log(`Date:${d.getDay()} ${d.getMonth()}`)
  console.log(`Time:${d.getHours()} ${d.getMinutes()}`)
    next()
})
    */

let mymiddleware=((req,res,next)=>{
    
    let d=new Date()
  console.log(`Time:${d.getHours()} ${d.getMinutes()}`)
    next()
})
let myothermiddleware=((req,res,next)=>{
    
   
  console.log(`second middleware`)
    next()
})
//app.use(mymiddleware)



/*
app.get("/",mymiddleware,myothermiddleware,(req,res)=>{
    res.send("<h1>This is home page</h1>")
})
    */
   // router base middle ware
   router.use((req,res,next)=>{
    console.log(`Router level middle ware`)
    next()

   })




   router.get("/",(req,res)=>{
    res.send("<h1>This is home page</h1>")
})
router.get("/abouts",(req,res)=>{
    res.send("<h1>This is about page</h1>")
})



//app.use("/",router)
app.use("/test",router)
router.use("/123",(req,res)=>{
    res.send("hello bro")
})
app.listen(PORT,(req,res)=>{
    console.log(`server is runnning on port ${PORT}`)
})