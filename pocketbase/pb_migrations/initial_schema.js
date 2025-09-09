// PocketBase Initial Schema Migration
// Run this after setting up PocketBase server

migrate((db) => {
  // Users Collection
  const users = new Collection({
    name: "users",
    type: "base",
    schema: [
      {
        name: "phone",
        type: "text",
        required: true,
        options: {
          min: 10,
          max: 15,
          pattern: "^[0-9+\\-\\s()]*$"
        }
      },
      {
        name: "points",
        type: "number",
        required: false,
        options: {
          min: 0
        }
      },
      {
        name: "name",
        type: "text",
        required: false
      },
      {
        name: "avatar",
        type: "file",
        required: false,
        options: {
          maxSelect: 1,
          maxSize: 2097152,
          mimeTypes: ["image/jpeg", "image/png", "image/gif"]
        }
      }
    ]
  });

  // Drivers Collection
  const drivers = new Collection({
    name: "drivers",
    type: "base",
    schema: [
      {
        name: "phone",
        type: "text",
        required: true
      },
      {
        name: "assignedBusID",
        type: "text",
        required: false
      },
      {
        name: "status",
        type: "select",
        required: true,
        options: {
          values: ["online", "offline", "busy"]
        }
      },
      {
        name: "currentLocation",
        type: "json",
        required: false
      },
      {
        name: "name",
        type: "text",
        required: false
      }
    ]
  });

  // Buses Collection
  const buses = new Collection({
    name: "buses",
    type: "base",
    schema: [
      {
        name: "routeID",
        type: "text",
        required: true
      },
      {
        name: "boardingQR",
        type: "text",
        required: true
      },
      {
        name: "exitQR",
        type: "text",
        required: true
      },
      {
        name: "lastKnownLocation",
        type: "json",
        required: false
      },
      {
        name: "routeName",
        type: "text",
        required: false
      },
      {
        name: "capacity",
        type: "number",
        required: false
      }
    ]
  });

  // Trips Collection
  const trips = new Collection({
    name: "trips",
    type: "base",
    schema: [
      {
        name: "userID",
        type: "relation",
        required: true,
        options: {
          collectionId: users.getId(),
          cascadeDelete: false
        }
      },
      {
        name: "busID",
        type: "relation",
        required: true,
        options: {
          collectionId: buses.getId(),
          cascadeDelete: false
        }
      },
      {
        name: "startTime",
        type: "date",
        required: true
      },
      {
        name: "endTime",
        type: "date",
        required: false
      },
      {
        name: "pointsEarned",
        type: "number",
        required: false,
        options: {
          min: 0
        }
      },
      {
        name: "status",
        type: "select",
        required: true,
        options: {
          values: ["boarding", "traveling", "completed", "cancelled"]
        }
      }
    ]
  });

  // Rewards Collection
  const rewards = new Collection({
    name: "rewards",
    type: "base",
    schema: [
      {
        name: "userID",
        type: "relation",
        required: true,
        options: {
          collectionId: users.getId(),
          cascadeDelete: false
        }
      },
      {
        name: "points",
        type: "number",
        required: true
      },
      {
        name: "redeemed",
        type: "bool",
        required: true
      },
      {
        name: "redeemedAt",
        type: "date",
        required: false
      },
      {
        name: "description",
        type: "text",
        required: false
      }
    ]
  });

  return dao.saveCollection(users) && 
         dao.saveCollection(drivers) && 
         dao.saveCollection(buses) && 
         dao.saveCollection(trips) && 
         dao.saveCollection(rewards);
});