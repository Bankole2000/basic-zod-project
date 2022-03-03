import { object, string, TypeOf } from 'zod';

const createContactSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid Email"),
    firstname: string({
      required_error: 'First Name is required'
    }),
    lastname: string({
      required_error: 'Last Name is required'
    }),
    location: string({
      required_error: 'Location (Country) is required'
    }),
  })
})

const updateContactSchema = object({
  params: object({
    contactId: string({
      required_error: "contact ID is required"
    })
  })
})

const contactFieldsList = ['email', 'lastname', 'firstname','phone','location','company', 'industry']

export { createContactSchema, contactFieldsList, updateContactSchema }