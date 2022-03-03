import { Contact, ScheduledDemo } from "@prisma/client";
import { Request, Response } from "express";
import { contactFieldsList } from "../schema/contact.schema";
import { scheduleDemoFields } from "../schema/schedule.schema";
import { createContact, updateContactByEmail } from "../services/contact.service";
import { createContactDemoRequest, deleteDemoRequest, getAllDemoRequests, getDemoRequestDetails, updateDemoRequest } from "../services/schedule.service";

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
      message: "Retrieved All Demo Requests",
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

export const getScheduleDetailsHandler = async(req:Request, res: Response) => {
  const {scheduleId: id} = req.params;
  const demoRequestDetails = await getDemoRequestDetails(Number(id))
  if(demoRequestDetails){
    return res.status(200).send({
      message: "Retrieved Demo Requests details",
      success: true, 
      data: demoRequestDetails
    })
  }
  return res.status(404).send({
    message: "Error retreiving scheduled demo request details",
    success: false, 
    data: null,
  })
}

export const updateScheduleHandler = async (req:Request, res:Response) => {
  const {scheduleId: id} = req.params;
  const demoRequestToUpdate = await getDemoRequestDetails(+id);
  if(!demoRequestToUpdate){
    return res.status(404).send({
      message: "No Scheduled Demo with that ID",
      success: false,
      data: null,
    })
  }
  if(req.body.requestedDate){
    if(String(new Date(req.body.requestedDate)) == 'Invalid Date'){
      return res.status(400).send({
        message: "Invalid requested date",
        success: false,
        data: null,
      })
    }
    if(new Date(req.body.requestedDate) <= new Date(Date.now())){
      return res.status(400).send({
        message: "The requested date must be in the future",
        success: false,
        data: null,
      })
    }
  }
  let scheduleData: {[key: string]: string} = {};
  scheduleDemoFields.forEach(field => {
    if(req.body[field]){
      scheduleData[field] = req.body[field];
    }
  });
  const updatedDemoRequest = await updateDemoRequest(scheduleData as unknown as ScheduledDemo, +id);
  if(updatedDemoRequest){
    return res.status(201).send({
      message: "Scheduled Demo Request data updated",
      success: true,
      data: updatedDemoRequest
    })
  }
  return res.status(500).send({
    message: "Error updating scheduled demo",
    success: false,
    data: null
  })
}

export const deleteScheduleHandler = async (req:Request, res:Response) => {
  const {scheduleId: id} = req.params;
  const demoRequestToDelete = await getDemoRequestDetails(+id);
  if(!demoRequestToDelete){
    return res.status(404).send({
      message: "No Scheduled Demo with that ID",
      success: false,
      data: null,
    })
  }

  const deletedDemoRequest = await deleteDemoRequest(+id);
  if(deletedDemoRequest){
    return res.status(201).send({
      message: "Scheduled Demo Request deleted",
      success: true,
      data: deletedDemoRequest
    })
  }
  return res.status(500).send({
    message: "Error deleting scheduled demo",
    success: false,
    data: null
  })
  
}