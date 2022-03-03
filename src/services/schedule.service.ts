import { PrismaClient, ScheduledDemo, Contact } from "@prisma/client";
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
    const demoRequests = prisma.scheduledDemo.findMany({include: {contact: true}});
    return demoRequests
  } catch (error) {
    log.error("🚀 ~ file: schedule.service.ts ~ line 30 ~ getAllDemoRequests ~ error", error)
    console.log("🚀 ~ file: schedule.service.ts ~ line 29 ~ getAllDemoRequests ~ error", {error});
    return null;
  }
}

const deleteAllContactDemoRequests =async (email:string) => {
  try {
    const deletedRequests = prisma.scheduledDemo.deleteMany({
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

export { createContactDemoRequest, getAllDemoRequests, deleteAllContactDemoRequests }