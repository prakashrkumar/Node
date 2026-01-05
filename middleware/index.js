const express=require("express")
const app=express();


const PORT=3000;

app.get("/",(req,res)=>{
    res.send("<h1>this home page</h1>")
})
app.get("/abouts",(req,res)=>{
    res.send("<h1>this abouts page</h1>")
})
//jo route nahi usper gaya hoto handdle karne ke liye
app.use((req,res)=>{
    res.send("<h1>Error 404: Page Not Found:</h1>")
})


app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send("Something Broke")
    next()
})


app.listen(PORT,(req,res)=>{
    console.log(`server is runnning on port ${PORT}`)
})