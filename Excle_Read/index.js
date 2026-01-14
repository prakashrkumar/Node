const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const PORT=process.env.PORT || 5000;
const xlsx=require("xlsx")
const path=require("path")
const ejs=require("ejs")
const multer=require("multer")


app.set("view engine","ejs")

const upload=multer({dest:"uploads/"})
 

   


app.get("/",(req,res)=>{
    res.render("excel")
})

app.post("/upload",upload.single("excelFile"),(req,res)=>{
    const filePath=path.join(__dirname,"uploads",req.file.filename)
    const workBook=xlsx.readFile(filePath)
    const workSheetName=workBook.SheetNames[0]
    const workSheet=workBook.Sheets[workSheetName]
    const data=xlsx.utils.sheet_to_json(workSheet)
   res.json({
    message:"Excel file uploaded successfully",
    data
   });
})


// Export Excel file
app.get("/export-excel",(req,res)=>{
    const data=[
        {name:"prakash",age:23,city:"madhubani"},
        {name:" Ramesh",age:20,city:"madhub"},
        {name:"Rupam",age:29,city:"madh"},
    ]
    const workSheet=xlsx.utils.json_to_sheet(data)
    const workBook=xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(workBook,workSheet,"Sheet1")
   const excelBuffer= xlsx.write(workBook,{
        type:"buffer",
        bookType:"xlsx"
    })
    
   res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
   res.setHeader("Content-Disposition","attachment;filename=data.xlsx")
   res.send(excelBuffer)
})







app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})