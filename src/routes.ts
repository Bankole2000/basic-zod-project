import { Express, Request, Response } from 'express';
import { createContactHandler, deleteContactHandler, getContactsHandler, updateContactHandler } from './controllers/contacts.controller';
import { createScheduleHandler, deleteScheduleHandler, getSchedulesHandler, updateScheduleHandler } from './controllers/schedules.controller';
import { contactRegisteredCheck } from './middleware/checkRegisteredContact';
import validate from './middleware/validateResource';
import { createContactSchema, updateContactSchema } from './schema/contact.schema';
import { createScheduleSchema } from './schema/schedule.schema';

const routes = (app: Express) => {
  // API MetaData
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
      message: "Welcome to the LugahFront Demo Scheduling Service"
    })
  })
  
  // Contacts Handlers
  app.post('/contacts', validate(createContactSchema, 'Contact'), createContactHandler);
  app.get('/contacts', getContactsHandler);
  app.patch('/contacts/:contactId', validate(updateContactSchema, 'Contact ID'), updateContactHandler);
  app.delete('/contacts/:contactId', deleteContactHandler);

  // Demo Schedules Handlers 
  app.post('/schedule-demo', validate(createContactSchema, 'Contact'), validate(createScheduleSchema, 'Schedule'), contactRegisteredCheck, createScheduleHandler);
  app.get('/schedule-demo', getSchedulesHandler);
  app.patch('/schedule-demo', updateScheduleHandler);
  app.delete('/schedule-demo', deleteScheduleHandler);
}

export default routes;