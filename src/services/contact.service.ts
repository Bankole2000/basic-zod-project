import { PrismaClient, Contact } from "@prisma/client";
import log from '../utils/logger';
const prisma = new PrismaClient();

const createContact = async (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' >) => {
  try {
    const contact = await prisma.contact.create({data: contactData})
    return contact;
  } catch (error) {
    console.log({error})
    log.error("🚀 ~ file: contact.service.ts ~ line 8 ~ createContact ~ error", error)
    return null
  }
}

const findContactByEmail = async ({email}: {email: string}) => {
  try {
    const contact = await prisma.contact.findUnique({ where: { email }, include: { scheduledDemos: true } });
    return contact;
  } catch (error) {
    log.error("🚀 ~ file: contact.service.ts ~ line 19 ~ findContactByEmail ~ error", error)
    return null;
  }
}

const findContactById =async (id:number | undefined) => {
  try {
    const contact = await prisma.contact.findUnique({where: {id}, include: {scheduledDemos: true}});
    return contact;
  } catch (error) {
    log.error("🚀 ~ file: contact.service.ts ~ line 30 ~ findContactById ~ error", error)
    return null;
  }
}

const getAllContacts = async () => {
  try {
    const contacts = await prisma.contact.findMany();
    return contacts;
  } catch (error) {
    log.error("🚀 ~ file: contact.service.ts ~ line 29 ~ getAllContacts ~ error", error)
    return null;
  }
}

const updateContactById =async (contactData:Omit<Contact, 'createdAt' | 'updatedAt' >, id: number | undefined) => {
  try {
    const updatedContact = await prisma.contact.update({
      where: {
        id
      }, 
      data: {
        ...contactData
      }
    })
    return updatedContact
  } catch (error) {
    console.log("🚀 ~ file: contact.service.ts ~ line 50 ~ updateContactById ~ error", error)
    return null
  }
}

const updateContactByEmail = async (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' >) => {
  try {
    const updatedContact = await prisma.contact.update({
      where: {
        email: contactData.email
      },
      data: {
        ...contactData
      }
    })
    return updatedContact
  } catch (error) {
    console.log("🚀 ~ file: contact.service.ts ~ line 50 ~ updateContact ~ error", error)
    return null;
  }
}

const deleteContact =async ({id}:{id: number | undefined }) => {
  try {
    const deletedContact = await prisma.contact.delete({ where: {id}})
    return deletedContact;
  } catch (error) {
    console.log("🚀 ~ file: contact.service.ts ~ line 39 ~ deleteContact ~ error", error)
    return null;
  }
}

export { createContact, findContactByEmail, getAllContacts, deleteContact, findContactById, updateContactByEmail, updateContactById }