import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
// DataBase Connection

 export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`DataBase conntect seccessfully`)
})

}
