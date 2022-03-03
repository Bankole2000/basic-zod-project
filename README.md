# Lugah Schedule Demo Service

REST API for collection contact information and scheduling demo presentations [@Spoke.ai](https://spoke.ai)

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
| GET    | "/contacts"         | null                               | Returns all Todos in database               |
| POST   | "/contacts"         | todoItem: Todo                     | Returns created todo item                   |
| GET    | "/contacts/:contactId"     | {params: id}                       | Returns single todo item of id :id          |
| PATCH  | "/contacts/:contactId"     | {params: id} todo fields to update | Returns updated todo item                   |
| DELETE | "/contacts/:contactId"     | {params: id}                       | Returns deleted todo item id                |
| GET    | "/schedule-demo"         | null                               | Returns all Todos in database               |
| POST   | "/schedule-demo"         | todoItem: Todo                     | Returns created todo item                   |
| GET    | "/schedule-demo/:scheduleId"     | {params: id}                       | Returns single todo item of id :id          |
| PATCH  | "/schedule-demo/:scheduleId"     | {params: id} todo fields to update | Returns updated todo item                   |
| DELETE | "/schedule-demo/:scheduleId"     | {params: id}                       | Returns deleted todo item id                |

