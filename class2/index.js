const express=require("express")
const app=express()


const PORT=3000;
app.set("view engine","ejs")
app.get("/about",(req,res)=>{
    // back me jo store ho jay
    res.redirect("..")
    
})

app.get("/user",(req,res)=>{
    res.render("user")
})
/*
app.get("/download",(req,res)=>{
    res.download("./files/prakash.pdf","Document.pdf")
})
 */  
app.get("/download",(req,res)=>{
    res.sendFile(__dirname + "/files/prakash.pdf")
})
    
app.get("/end",(req,res)=>{
    res.write("text message ka messahe")
    res.end()
})
/*
app.get("/error",(req,res)=>{
   res.sendStatus(404)
})
*/

app.get("/error",(req,res)=>{
   res.status(200).send("hello")
})
app.get("/check",(req,res)=>{
    console.log(res.headersSent)
   res.send("hello bro")
   console.log(res.headersSent)
})
app.get("/prakash",(req,res)=>{
    res.set("custom-header","1234")
    console.log(res.get("custom-header"))
   res.send("hello bro")
})
   
   
app.listen(PORT, (req,res)=>{
    console.log(`server is running on port ${PORT}`)
})