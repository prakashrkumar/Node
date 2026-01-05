import mongoose from "mongoose";
import monoosePaginate from "mongoose-paginate-v2"

const contactSchema= new mongoose.Schema({
    
    first_name:{
            Type:String
        },
        last_name:{
            Type:String
        },
        email:{
            Type:String
        },
        phone:{
            Type:String
        },
        address:{
            Type:String
        },
    
})
contactSchema.plugin(monoosePaginate)
const contact=mongoose.model("Contact",contactSchema)
// old method
//module.exports=contact;


//new method
export default contact;