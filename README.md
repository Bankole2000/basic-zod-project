# Lugah Schedule Demo Service

REST API for collection contact information and scheduling demo presentations

Built with: 
1. Node JS
2. TypeScript
3. Express
4. Prisma 
5. PostgreSQL
6. Deployed to heroku

### Types
```js
type Contact = {
  id?: string | number,
  email: string,
  firstname: string,
  lastname: string,
  phone?: string,
  company?: string,
  industry?: string,
  location: string,
  scheduledDemos: ScheduledDemo[],
  createdAt?: DateTime,
  updatedAt?: DateTime,
}

type ScheduledDemo = {
  id?: string | number,
  requestedDate: DateTime,
  template?: string,
  moreInfo?: string,
  contact: Contact[],
  createdAt?: string,
  updatedAt?: string
}
```

### API Base URL
Is currently running at - [https://lugahfront.herokuapp.com/](https://lugahfront.herokuapp.com/)

### End points
| Method | Path             | Data                               | Response                                    |
| ------ | ---------------- | ---------------------------------- | ------------------------------------------- |
| GET    | "/"              | null                               | Returns JSON object with some api meta data |
| GET    | "/contacts"         | null                               | Returns all Contacts in database               |
| POST   | "/contacts"         | contact: Contact                     | Returns created Contact item                   |
| GET    | "/contacts/:contactId"     | {params: id}                       | Returns single contact of id :id          |
| PATCH  | "/contacts/:contactId"     | {params: id} todo fields to update | Returns updated contact                   |
| DELETE | "/contacts/:contactId"     | {params: id}                       | Returns deleted contact of id :id                |
| GET    | "/schedule-demo"         | null                               | Returns all Scheduled Demos in database               |
| POST   | "/schedule-demo"         | todoItem: Todo                     | Returns created demo Schedule Request item                   |
| GET    | "/schedule-demo/:scheduleId"     | {params: id}                       | Returns single Schedule Request item of id :scheduleId          |
| PATCH  | "/schedule-demo/:scheduleId"     | {params: id} todo fields to update | Returns updated Schedule Request item                   |
| DELETE | "/schedule-demo/:scheduleId"     | {params: id}                       | Returns deleted Schedule Request item of id :scheduleId                |

