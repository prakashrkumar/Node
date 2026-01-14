const express=require("express")
const dotenv=require("dotenv")
const app=express()
 dotenv.config()
 const mysql=require("mysql2")


 app.use(express.json())
 app.use(express.urlencoded({extended:false}))




// mysql connection
 const db=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
 })
 db.connect((err)=>{
    if(err){
        console.log("Error connection" +err.stack)
        return
    }
    console.log("MYSQL Connected")
 })
// Read all  Contacts
 app.get("/contacts",(req,res)=>{
    db.query("SELECT * FROM contacts",(err,rows)=>{
        if(err){
            return res.status(500).send(err)
        }
        res.send(rows)
    })
 })


// Create Contacts
 app.post("/contacts",(req,res)=>{

    const{first_name,last_name,email,phone,address}=req.body
    const sql="INSERT INTO contacts(first_name,last_name,email,phone,address) VALUES(?,?,?,?,?)"
    db.query(sql,[first_name,last_name,email,phone,address],(err,result)=>{
        if(err){
            return res.status(500).send(err)
        }
        res.send({
            message:"Contact Created",
            id:result.insertId
        })
    })
 })

// Read Single Contact

 app.get("/contacts/:id",(req,res)=>{
    db.query("SELECT * FROM contacts WHERE id=?",[req.params.id],(err,row)=>{
        if(err){
            return res.status(500).send(err)
        }
        if(row.length==0){
            return res.status(404).send("Contact not found")
        }
        res.send(row[0])
    })
 })

 // Updated Contact
 app.put("/contacts/:id",(req,res)=>{

    const{first_name,last_name,email,phone,address}=req.body
    const sql="UPDATE contacts SET first_name=?,last_name=?,email=?,phone=?,address=? WHERE id=? "
    db.query(sql,[first_name,last_name,email,phone,address,req.params.id],(err,result)=>{
        if(err){
            return res.status(500).send(err)
        }
        if(result.affectedRows==0){
            return res.status(404).send("Contact not found")
        }
        res.send({
            message:"Contact updated",
        
        })
    })
 })


 // Delete Contact
 app.delete("/contacts/:id",(req,res)=>{
    db.query("DELETE FROM contacts WHERE id=?",[req.params.id],(err,result)=>{
        if(err){
            return res.status(500).send(err)
        }
        if(result.affectedRows==0){
            return res.status(404).send("Contact not found")
        }
        res.send({
            message:"Contact deleted",
        
        })
    })
 })



const PORT=process.env.PORT || 7000;

app.get("/",(req,res)=>{
    res.send("<h1>Home Page</h1>")
})
app.listen(PORT,(req,res)=>{
    console.log(`server is running on PORT ${PORT}`)
})