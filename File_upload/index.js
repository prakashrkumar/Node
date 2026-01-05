const express=require("express")
const multer=require("multer")
const path=require("path")
const app=express()


const  PORT=3000;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const newFileName=Date.now()+ path.extname(file.originalname)
        cb(null,newFileName)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.fieldname==="userfile"){
        // file.mimetype.startsWith("image/")
    if(file.mimetype=="image/jpeg"|| file.mimetype=="image/png"){
        cb(null,true)
}
else{
 cb(new Error("only image are allowed"),false)
}

    }
    else if(file.fieldname==="userdocuments"){
            // file.mimetype.startsWith("image/")
    if(file.mimetype=='application/pdf'){
        cb(null,true)
}
else{
 cb(new Error("only pdf are   for document"),false)
}

    }
    else{
  cb(new Error("unknown filed"),false)
    }
   
}
const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1924*5
    },
    fileFilter:fileFilter
})


app.get("/",(req,res)=>{
    res.render("myform")
})
/*
// for singl file->single
app.post("/submitform",upload.array("userfile",3),(req,res)=>{
    if(!req.files || req.files.length==0){
        return res.status(400).send(`No file uploaded`)
    }
   // res.send(req.file)
   //res.send(req.file.filename)
    res.send(req.files)
})
    */

app.post("/submitform",upload.fields([
    {name:"userfile",maxCount:1},
    {name:"userdocument",maxCount:3}
]),(req,res)=>{
    if(!req.files || req.files.length==0){
        return res.status(400).send(`No file uploaded`)
    }
   // res.send(req.file)
   //res.send(req.file.filename)
    res.send(req.files)
})

app.use((error,req,res,next)=>{
    if(error instanceof multer.MulterError){
        if(error.code==="LIMIT_UNEXPECTED_FILE"){
            return res.status(400).send(`Error: Too many files uploaded`)
        }
     return res.status(400).send(`Multer error: ${error.message} : ${error.code}`)
    }
    else if(error){
       return res.status(500).send(`Something went to worrng : ${error.message}`)
    }
    next()
})
    



app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})