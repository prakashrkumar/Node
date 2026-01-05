const express=require("express")
const {body,validationResult}=require("express-validator")
const app=express()


const PORT=3000;
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
let validationRegistration=[
    body("username")
    .notEmpty().withMessage("Username is require")
    .isLength({min:3}).withMessage("username must be at least 3 character long.")
    .trim()
    .isAlpha().withMessage("Username must be conatin only lETTER")
    .custom(value=>{
        if(value=="admin"){
            throw new Error('username "admin" is not allowed')
        }
        return true

    })
    .customSanitizer(value=>{
return value.toLowerCase()
    }),
    body("useremail")
    .isEmail().withMessage("please provided  avalid email")
    .normalizeEmail(),
    body("userpass")
    .isLength({min:5, max:10}).withMessage("password must be 5 to 10 character")
    .isStrongPassword().withMessage("password must be strong"),
    body("userage")
    .isNumeric().withMessage("age must be numberic")
    .isInt({min:18}).withMessage("age must be at least 18 years old ."),
    body("usercity")
    .isIn(["Delhi","Mumbai", "Goa", "Agra"])
    .withMessage("City must be  Delhi,Mumbai,Goa or Agra")

]


app.get('/myform',(req,res)=>{
    res.render('myform',{errors:0})
})

app.post('/saveform',validationRegistration,(req,res)=>{
    const error=validationResult(req)
    if(error.isEmpty()){
       res.send(req.body) 
    }
    //res.send(error)
res.render("myform",{errors:error.array()})
    
})





app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})
