const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const puppeteer=require("puppeteer")
const ejs=require("ejs")
const path=require("path")
const { text } = require("stream/consumers")

app.set("view engine",'ejs')



const PORT=process.env.PORT || 5000;


app.get("/", async(req,res)=>{
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
       
        const htmlContent=`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    body{font-family:arial;}
    h1{color:#0066cc;}
    
    </style>
</head>
<body>
<h1>PDF Generation</h1>
   <p> This is a PDF generate form HTML in express.js</P>
</body>
</html>
        
        `;
        await page.setContent(htmlContent)
        const pdfBuffer=await page.pdf({
            format:"A4",
            margin:{
                top:"20px",
                bottom:"20px",
                left:"20px",
                right:"20px"
            }
        });
        await browser.close();
        res.contentType("application/pdf");
        res.send(pdfBuffer);

    }
    catch(error){
        console.log(error);
        res.status(500).send("error generation pdf")

    }
})




app.get("/invoice", async(req,res)=>{
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
       
        const invoiceData={
            invoiceNumber:"12345",
            custumberName:"prakash",
            product:"Laptop",
            price:"99000000"
        }
        const htmlContent=await ejs.renderFile(path.join(__dirname,'views',"invoice.ejs"),invoiceData);
        await page.setContent(htmlContent,{waitUntil:"domcontentloaded"})
        const pdfBuffer=await page.pdf({
            format:"A4",
            margin:{
                top:"60px",
                bottom:"20px",
                left:"40px",
                right:"20px"
            },
            printBackground:true,
            displayHeaderFooter:true,
            headerTemplate:'<div style="text-align:center; font-size:30px;border-bottom:1px solid black;padding-bottom:10px; width:100%">sun System</div>',
            footerTemplate:`<div style="text-align:center; font-size:10px; width:100%">
            Page <span class="pageNumber"></span> of <span class="totalPages"></span>
            
            </div>`
        });
        await browser.close();
        res.contentType("application/pdf");
        res.send(pdfBuffer);

    }
    catch(error){
        console.log(error);
        res.status(500).send("error generation pdf")

    }
})


app.listen(PORT,(req,res)=>{
console.log(`server is running on Port ${PORT}`);
    
})