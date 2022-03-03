import { Express, Request, Response } from 'express';
import { createContactHandler, deleteContactHandler, getcontactDetailsHandler, getContactsHandler, updateContactHandler } from './controllers/contacts.controller';
import { createScheduleHandler, deleteScheduleHandler, getScheduleDetailsHandler, getSchedulesHandler, updateScheduleHandler } from './controllers/schedules.controller';
import { contactRegisteredCheck } from './middleware/checkRegisteredContact';
import validate from './middleware/validateResource';
import { createContactSchema, updateContactSchema } from './schema/contact.schema';
import { createScheduleSchema } from './schema/schedule.schema';
import { apiMetaData } from './utils/metadata';

const routes = (app: Express) => {
  // API MetaData
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
      message: "Welcome to the LugahFront Demo Scheduling Service", 
      data: apiMetaData()
    })
  })
  
  // Contacts Handlers
  app.get('/contacts', getContactsHandler);
  app.post('/contacts', validate(createContactSchema, 'Contact'), createContactHandler);
  app.get('/contacts/:contactId', validate(updateContactSchema, 'Contact ID'), getcontactDetailsHandler)
  app.patch('/contacts/:contactId', validate(updateContactSchema, 'Contact ID'), updateContactHandler);
  app.delete('/contacts/:contactId', deleteContactHandler);

  // Demo Schedules Handlers 
  app.get('/schedule-demo', getSchedulesHandler);
  app.post('/schedule-demo', validate(createContactSchema, 'Contact'), validate(createScheduleSchema, 'Schedule'), contactRegisteredCheck, createScheduleHandler);
  app.get('/schedule-demo/:scheduleId', getScheduleDetailsHandler);
  app.patch('/schedule-demo/:scheduleId', updateScheduleHandler);
  app.delete('/schedule-demo/:scheduleId', deleteScheduleHandler);
}

export default routes;