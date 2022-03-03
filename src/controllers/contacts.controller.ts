import { Contact } from "@prisma/client";
import { Request, Response } from "express";
import { contactFieldsList } from "../schema/contact.schema";
import { createContact, deleteContact, findContactById, getAllContacts, updateContactByEmail, updateContactById } from "../services/contact.service";
import { deleteAllContactDemoRequests } from "../services/schedule.service";

export const createContactHandler = async (req:Request, res:Response) => {
  console.log({body: req.body});
  const createdContact = await createContact(req.body)
  if(!createdContact){
    return res.status(400).send({
      message: "Failed to create Contact - Email is already registered",
      success: false,
      data: null
    })
  } 
  return res.status(201).send({
    message: "Contact created",
    success: true, 
    data: createdContact
  })
}

export const getContactsHandler = async (req:Request, res:Response) => {
  const contacts = await getAllContacts()
  if(!contacts){
    return res.status(400).send({
      message: "Error retrieving contacts",
      success: false, 
      data: null
    })
  }
  return res.status(201).send({
    message: "Contacts retreived",
    success: true, 
    data: contacts
  })
}

export const getcontactDetailsHandler =async (req:Request, res: Response) => {
  const { contactId: id } = req.params;
  const contact = await findContactById(Number(id));
  if(!contact){
    return res.status(404).send({
      message: "No contact with that ID",
      success: false, 
      data: null
    })
  }
  return res.status(200).send({
    message: "Contact Details retrieved",
    success: true, 
    data: contact
  })
}

export const updateContactHandler = async (req:Request, res:Response) => {
  const { contactId: id } = req.params;
  const contactToUpdate = await findContactById(Number(id));
  if(!contactToUpdate){
    return res.status(404).send({
      message: "No contact with that ID",
      success: false, 
      data: null
    })
  }
  let contactData: {[key: string]: string} = {};
  contactFieldsList.forEach(field => {
    if(req.body[field]){
      contactData[field] = req.body[field];
    }
  })
  const updatedContact = await updateContactById(contactData as unknown as Contact, Number(id));
  if(updatedContact){
    return res.status(201).send({
      message: "Contact information updated",
      success: true,
      data: updatedContact
    })
  }
  return res.status(500).send({
    message: "Error updating contact",
    success: false,
    data: null
  })
}

export const deleteContactHandler = async (req:Request, res:Response) => {
  const { contactId: id } = req.params;
  const contactToDelete = await findContactById(Number(id));
  if(!contactToDelete){
    return res.status(404).send({
      message: "No contact with that ID",
      success: false, 
      data: null
    })
  }
  const deletedContactDemoRequests = await deleteAllContactDemoRequests(contactToDelete.email)
  console.log({deletedContactDemoRequests})
  const deletedContact = await deleteContact({id: contactToDelete.id})
  if(!deletedContact){
    return res.status(404).send({
      message: "Error Deleting contact",
      success: false, 
      data: null
    })
  }
  return res.status(201).send({
    message: "Contact deleted",
    success: true, 
    data: deletedContact
  })
}