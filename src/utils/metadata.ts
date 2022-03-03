export const apiMetaData = () => ({
  resources: ["contacts", "schedules"],
  endpoints: {
    "/": [
      {
        method: "GET",
        body: null,
        response: "Returns API Metadata",
      },
    ],
    "/contacts": [
      {
        method: "GET",
        body: null,
        response: "Returns all contacts in database",
      },
      {
        method: "POST",
        body: "Contact resource input",
        response:
          "creates new contact record in databse and returns created contact",
      },
    ],
    "/contacts/:contactId": [
      {
        method: "GET",
        body: null,
        response:
          "Returns details of contact with 'id' of :contactId in database",
      },
      {
        method: "PATCH",
        body: "Contact resource input",
        response:
          "Updates details of contact with 'id' of :contactId in database - returns updated contact",
      },
      {
        method: "DELETE",
        body: null,
        response:
          "Deletes record of contact with 'id' of :contactId in database - return deleted contact",
      },
    ],
    "/schedule-demo": [
      {
        method: "GET",
        body: null,
        response: "Returns all scheduled demos in database",
      },
      {
        method: "POST",
        body: "ScheduledDemo resource input",
        response:
          "creates new schedule record in databse and returns created scheduled demo",
      },
    ],
    "/schedule-demo/:scheduleId": [
      {
        method: "GET",
        body: null,
        response:
          "Returns details of scheduled demo request with 'id' of :scheduledId in database",
      },
      {
        method: "PATCH",
        body: "scheduled demo request resource input",
        response:
          "Updates details of scheduled demo request with 'id' of :scheduledId in database - returns updated scheduled demo request",
      },
      {
        method: "DELETE",
        body: null,
        response:
          "Deletes record of scheduled demo request with 'id' of :scheduledId in database - return deleted scheduled demo request",
      },
    ],
  },
  schema: {
    Contact: {
      id: "number",
      email: "string - required",
      firstname: "string - required",
      lastname: "string - required",
      phone: "string",
      company: "string",
      industry: "string",
      location: "string - required",
      scheduledDemos: "ScheduledDemo[]",
      createdAt: "DateTime",
      updatedAt: "DateTime",
    },
    ScheduledDemo: {
      id: "number",
      requestedDate: "DateTime",
      template: "string",
      moreInfo: "string",
      contact: "Contact",
      createdAt: "DateTime",
      updatedAt: "DateTime",
    },
  },
});
