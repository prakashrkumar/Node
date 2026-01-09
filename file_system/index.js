const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const fs=require("fs")



const PORT=process.env.PORT;

app.get("/write-file",(req,res)=>{
    fs.writeFile("./public/output.txt","helllo bro",(err)=>{
        if(err){
            return res.status(500).send("failed to write")
        }
        res.send("file writen successfully yeah")
    })


})

app.get("/read-file",(req,res)=>{
    fs.readFile("./public/output.txt",(err,data)=>{
        if(err){
            return res.status(500).send("faile not found")
        }
        res.setHeader("Content-Type","text/plain")
        res.send(data)
    })
    
})

app.get("/append-file",(req,res)=>{
     fs.appendFile("./public/output.txt","\n new line cod",(err)=>{
        if(err){
            return res.status(500).send("fail to appended file")
        }
        res.send("contend appiended")
    })
    
})

app.use("/delete-file",(req,res)=>{
     fs.unlink("./public/output.txt",(err)=>{
        if(err){
            return res.status(500).send("fail to delete file")
        }
        res.send("file deleted successfully")
    })
    
})
app.use("/read-folder",(req,res)=>{
     fs.readdir("./public",(err,file)=>{
        if(err){
            console.log(err)
            return 
        }
        // arr ke from me
       // console.log(file)
       // alag -2 line me
       file.map((file)=>{
        console.log(file)
       })
        res.send("read all file successfully")
    })
    
})

app.use("/rename-file",(req,res)=>{
     fs.rename("./public/output.txt","./public/new-output.txt",(err)=>{
        if(err){
            return res.status(500).send("failed to rename file")
        }
        res.send("file rename successfully")
    })
    
})
app.get("/stream-text",(req,res)=>{
    const fileStream=fs.createReadStream("./public/new-output.txt")
    fileStream.on("open",()=>{
        fileStream.pipe(res)

        
    })
    fileStream.on("error",()=>{
          res.status(500).send("failed not found or error reading file")
        
        
    })
})
app.get("/create-folder",(req,res)=>{
     fs.rename("./public/my-folder","./public/renam-folder",(err)=>{
        if(err){
            return res.status(500).send("Error in rename folder",err)
        }
        res.send("Folder rename successfully")
    })
    
})
app.use("/rename-folder",(req,res)=>{
    fs.mkdir("./public/my-folder",(err)=>{
        if(err){
            return res.status(500).send("Error in creating folder")
        }
        res.send("Folder created successfully")
    })
    
    
})

app.get("/delete-folder",(req,res)=>{
    //olly empty folder is remove
     fs.rmdir("./public/renam-folder",(err)=>{
        if(err){
            return res.status(500).send("Error in deleteing folder")
        }
        res.send("Folder created successfully")
    })

})

app.get("/read-pdf",(req,res)=>{
     fs.readFile("./public/data.pdf",(err,data)=>{
        if(err){
            return res.status(500).send("pdf not found ",err)
        }
        res.setHeader("Content-Type","application/pdf")
        res.send(data)
    })

})
app.get("/read-json",(req,res)=>{
    fs.readFile("./public/data.json",(err,data)=>{
        if(err){
            return res.status(500).send("json not found ",err)
        }
        res.setHeader("Content-Type","application/json")
        res.send(data)
    })
    
})
app.get("/write-json",(req,res)=>{
    const filePath="./public/data.json"
    const data={
        name:"parkash",
        email:"prakashr17032000@gmail.com",
        age:25
    }
     fs.writeFile(filePath,JSON.stringify(data),(err)=>{
        if(err){
            return res.status(500).send("faild to write json file ",err)
        }
        
        res.send("JSON File written successfully")
    })
    
})
//write new data
app.get("/append-json",(req,res)=>{
     const filePath="./public/data.json"
    const newData={
        name:"rupam",
        email:"rupam@gmail.com",
        age:21
    }
     fs.readFile(filePath,(err,data)=>{
        if(err){
            return res.status(500).send("faild to read json file ",err)
        }
        let jsonData;
        jsonData=JSON.parse(data)
        if(!Array.isArray(jsonData)){
            jsonData=[jsonData]
        }
        jsonData.push(newData)
        
        
    
    fs.writeFile(filePath,JSON.stringify(data),(err)=>{
        if(err){
            return res.status(500).send("Failed to json file",err)
        }
        res.send("Json file append successfully")
    })
})
    
})


app.get("/read-image",(req,res)=>{
    fs.readFile("./public/image.jpg",(err,data)=>{
        if(err){
            return res.status(500).send("image not found ",err)
        }
        res.setHeader("Content-Type","image/jpg")
        res.send(data)
    })
})


app.get("/read-video",(req,res)=>{
    fs.readFile("./public/earth.mp4",(err,data)=>{
        if(err){
            return res.status(500).send("video not found ",err)
        }
        res.setHeader("Content-Type","video/mp4")
        res.send(data)
    })
})

// file ka informatoion
app.get("/file-info",(req,res)=>{
     fs.readFile("./public/earth.mp4",(err,stats)=>{
        if(err){
            return res.status(500).send("File not found ",err)
        }
       
        res.send(stats)
        res.send(stats.size + "bytes")
        console.log(stats.isFile())
        console.log(stats.isDirectory())
    })

})

app.get("/file-exists",(req,res)=>{
    fs.access("./public/earth.mp4",(err)=>{
        if(err){
            res.send("File not exixst")
        }

        res.send("file exist")
    })
    
})






app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT} `)
})

