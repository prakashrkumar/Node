
import express from "express"
import { addContact, addContactPage, deleteContact, getContact, getContacts, updateContact, updateContactPage } from "../controllers/contects.controller.js"

const router=express.Router()
//route
router.get("/", getContacts)
router.get("/show-contact/:id",getContact)
router.get("/add-contact",addContactPage)
router.post("/add-conatct",addContact)
router.get("/update-contact/:id",updateContactPage)
router.post("/update-contact/:id",updateContact)
router.get("/delete-conatct/:id",deleteContact)
export default router