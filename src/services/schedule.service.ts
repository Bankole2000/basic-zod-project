import { PrismaClient, ScheduledDemo } from "@prisma/client";
import log from "../utils/logger";
const prisma = new PrismaClient();


const createContactDemoRequest = async (scheduleData: Omit<ScheduledDemo, 'id' | 'createdAt' | 'updatedAt' | 'contactId'>, contactEmail: string) => {
  try {
    const scheduledDemo = await prisma.scheduledDemo.create({
      data: {
        ...scheduleData, 
        contact: {
          connect: { email: contactEmail}
        }
      }, 
      include: {
        contact: true
      }
    })
    return scheduledDemo
  } catch (error) {
    console.log("🚀 ~ file: schedule.service.ts ~ line 18 ~ createOldContactDemoRequest ~ error", error)
    return null;
  }
}

const getAllDemoRequests =async () => {
  try {
    const demoRequests = await prisma.scheduledDemo.findMany();
    return demoRequests
  } catch (error) {
    log.error("🚀 ~ file: schedule.service.ts ~ line 30 ~ getAllDemoRequests ~ error", error)
    // console.log("🚀 ~ file: schedule.service.ts ~ line 29 ~ getAllDemoRequests ~ error", {error});
    return null;
  }
}

const getDemoRequestDetails = async(id: number) => {
  try {
    const demoRequestDetails = await prisma.scheduledDemo.findUnique({where: {id}, include: {contact: true}});
    return demoRequestDetails
  } catch (error) {
    console.log({error})
    // log.error("🚀 ~ file: schedule.service.ts ~ line 41 ~ getDemoRequestDetails ~ error", error)
    // console.log("🚀 ~ file: schedule.service.ts ~ line 41 ~ getDemoRequestDetails ~ error", error)
    return null;
  }
}

const deleteDemoRequest =async (id:number) => {
  try {
    const deletedDemoRequest = await prisma.scheduledDemo.delete({where: {id}});
    return deletedDemoRequest
  } catch (error) {
    log.error("🚀 ~ file: schedule.service.ts ~ line 52 ~ deleteDemoRequest ~ error", error)
    console.log("🚀 ~ file: schedule.service.ts ~ line 52 ~ deleteDemoRequest ~ error", error)
    return null;
  }
}

const updateDemoRequest =async (scheduleData:Omit<ScheduledDemo, 'id' | 'createdAt' | 'updatedAt' | 'contactId'>, id: number) => {
  try {
    const updatedDemoRequest = await prisma.scheduledDemo.update({
      where: {id},
      data: {...scheduleData}
    })
    return updatedDemoRequest
  } catch (error) {
  log.error("🚀 ~ file: schedule.service.ts ~ line 63 ~ updateDemoRequest ~ error", error)
  console.log("🚀 ~ file: schedule.service.ts ~ line 63 ~ updateDemoRequest ~ error", error)
    return null;
  }
}

const deleteAllContactDemoRequests =async (email:string) => {
  try {
    const deletedRequests = await prisma.scheduledDemo.deleteMany({
      where: {
        contact: {
          email
        }
      }
    })
    return deletedRequests;
  } catch (error) {
    console.log("🚀 ~ file: schedule.service.ts ~ line 48 ~ deleteAllContactDemoRequests ~ error", error)
    return null;
  }
}

export { createContactDemoRequest, getAllDemoRequests, deleteAllContactDemoRequests, getDemoRequestDetails, updateDemoRequest, deleteDemoRequest }