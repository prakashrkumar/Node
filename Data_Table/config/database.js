const mongoose=require("mongoose")

const dotenv=require("dotenv")

dotenv.config()
// DataBase Connection

  const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`DataBase conntect seccessfully`)
})

}
module.exports=connectDB
