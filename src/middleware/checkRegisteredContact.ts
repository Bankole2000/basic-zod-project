import { NextFunction, Request, Response } from "express";
import { findContactByEmail } from "../services/contact.service";

const contactRegisteredCheck = async (req:Request, res: Response, next: NextFunction) => {
  const registeredContact = await findContactByEmail({email: req.body.email});
  if(!registeredContact){
    return next();
  }
  
  res.locals.registeredEmail = registeredContact.email
  return next();
}

export {contactRegisteredCheck}