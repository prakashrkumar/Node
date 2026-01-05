import Contact from "../models/contacts.models.js"
import mongoose from "mongoose"


 export const getContacts=  async(req,res)=>{
 try{
  const {page=1,limit=3}=req.query;
  let options={
    page: parseInt(page),
    limit:parseInt(limit)

  }
     //const contacts=await Contact.find();
     // ye v sare  data find karega
     const result=await Contact.populate({},options);

    //res.json(contacts)
    //res.send(result)
 res.render("home", {
    totalDocs:result.totalDocs,
    limit:result.limit,
    totalPages:result.totalPages,
    currentPage:result.page,
    counter:result.pagingCounter,
    hasPrevPage:result.hasPrevPage,
    hasNextPage:result.hasNextPage,
    prevPage:result.prevPage,
    nextPage:result.nextPage,
    contacts:result.docs

 })
 }
 catch(error){
  res.send("500",{message:error})
 }
}


  export const getContact=  async(req,res)=>{
    var paramId=mongoose.Types.ObjectId.isValid(req.params.id)
    if(!paramId){
      res.render("404",{message:"Invalid Id"}) 
    }
  try{
 // const contact=await Contact.findOne({_id:req.params.id})
   // or
     const contact=await Contact.findById(req.params.id)
     if(!contact){
     return  res.render("404", {message:"contact not Found"})
     }
      res.render("show-contact",{contact:contact})
    
  }
  catch(error){
    res.render("500",{message:error})
  }
    
}

 export const addContactPage=(req,res)=>{
   res.render("add-contact") 
}

 export const addContact=  async(req,res)=>{
  try{
    /*
    const contact=await Contact.insertOne({
        fist_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address
    })
        */
     //  or
     
       //const contact=await Contact.create(req.body)
       //oR
       await Contact.create(req.body)
        res.redirect("/")

  }
  catch(error){
    res.render("500",{message:error})
  }
    
   
    
}


 export const updateContactPage =  async(req,res)=>{
  var paramId=mongoose.Types.ObjectId.isValid(req.params.id)
    if(!paramId){
      res.render("404",{message:"Invalid Id"})
    }
     try{
      const contact=await Contact.findById(req.params.id)
      if(!contact){
        return  res.render("404", {message:"contact not Found"})
      }
      res.render("update-contact",{contact:contact})
     
     }
     catch(error){
       res.render("500",{message:error})

     }
     
    
    
    
}


 export const updateContact=async(req,res)=>{
  var paramId=mongoose.Types.ObjectId.isValid(req.params.id)
    if(!paramId){
      res.render("404",{message:"Invalid Id"})
    }
  try{
      
   // await Contact.findByIdAndUpdate(req.params.id,req.body)

   //OR
   const {first_name,last_name,email,phone,address}=req.body
   const contact=await Contact.findByIdAndUpdate(req.params.id,{first_name,last_name,email,phone,address})
    if(!contact){ 
      return res.render("404",{message:"Contact not found"})
  }
 res.redirect("/")
}
  catch(error){
    res.render(message.error)

  }

  

   

    
}



export const deleteContact=    async(req,res)=>{
  var paramId=mongoose.Types.ObjectId.isValid(req.params.id)
    if(!paramId){
      res.render("404",{message:"Invalid Id"})
    }
    try{
       const contact=await Contact.findByIdAndDelete(req.params.id)
      if(!contact){
        return res.render("404",{message:"Contact not fount"})

      }
      res.redirect("/")


    }
    catch(error){
      res.render("500",{message:error})

    }
   
     
    
}
