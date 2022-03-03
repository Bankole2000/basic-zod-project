import { Contact } from "@prisma/client";
import { Request, Response } from "express";
import { contactFieldsList } from "../schema/contact.schema";
import { createContact, updateContactByEmail } from "../services/contact.service";
import { createContactDemoRequest, getAllDemoRequests } from "../services/schedule.service";

export const createScheduleHandler = async (req:Request, res:Response) => {
  let contactData: {[key: string]: string} = {};
  let contact: Contact | null;
  contactFieldsList.forEach(field => {
    if(req.body[field]){
      contactData[field] = req.body[field];
    }
  })
  if(!res.locals.registeredEmail){
    contact = await createContact(contactData as unknown as Contact);
  } else {
    contact = await updateContactByEmail(contactData as unknown as Contact);
  }
  const { requestedDate, template, moreInfo } = req.body;
  if(!contact){
    return res.status(500).send({
      message: "Error saving or updating request contact",
      success: false, 
      data: null,
    })
  }
  const scheduledDemo = await createContactDemoRequest({requestedDate, template, moreInfo}, contact.email);
    if(scheduledDemo){
      return res.status(201).send({
        message: "Demo Scheduled",
        success: true, 
        data: scheduledDemo
      })
    }
    return res.status(500).send({
      message: "Error saving schedule demo request",
      success: false, 
      data: null,
    })
}

export const getSchedulesHandler = async (req:Request, res:Response) => {
  const demoRequests = await getAllDemoRequests();
  if(demoRequests){
    return res.status(200).send({
      message: "Fetched All Demo Requests",
      success: true, 
      data: demoRequests
    })
  }
  return res.status(500).send({
    message: "Error retreiving scheduled demo requests",
    success: false, 
    data: null,
  })
}

export const updateScheduleHandler = async (req:Request, res:Response) => {
  res.status(201).send({message: 'Update Schedule Works'});
}

export const deleteScheduleHandler = async (req:Request, res:Response) => {
  res.status(201).send({message: 'Delete Schedule Works'});
}