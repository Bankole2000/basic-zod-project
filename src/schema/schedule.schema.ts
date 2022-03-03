import { object, string, } from 'zod';

const createScheduleSchema = object({
  body: object({
    requestedDate: string({
      required_error: "Schedule date / time is required",
    }).refine((date) => {
      return new Date(date) > new Date(Date.now());
    }, "The Scheduled Date must be in the future")
  })
})

const scheduleDemoFields = ['requestedDate', 'template', 'moreInfo'];

export { createScheduleSchema, scheduleDemoFields }