### LINK

[assement test](#https://docs.google.com/document/d/1d-Qjaw6hs6lZxiNxWTpPD2EeRXyIoH4q/edit)
[postman](#https://documenter.getpostman.com/view/4219273/2s93XsY66g)

# How to run
- ## With docker
1. Get in to root folder of this project
2. make an `.env` file in the root folder `PORT=3000` AND `DB_MONGO_URL=mongodb://mongodb:27017`
3. run command `docker-compose up -d --build`

- ## With npm command
1. get in to root folder
2. run command `npm install`
3. make sure you have nodejs minimal version `18.14`
4. run your mongodb
5. make an `.env` file in the root folder `PORT=3000` AND `DB_MONGO_URL=mongodb://localhost:27017`
6. run command `npm run start:dev`


# Folder structure
- src
- - configs `folder for define config of all dependencies`
- - - mongo `config of mongodb example mongodbUrl`
- - microservices `dummies module from other services`
- - - account-service `dummies data from account service`
- - - company-service `dummies data from company service`
- - models `list all models from orm`
- - - mongo `list of models from mongodb orm`
- - modules `list all business logic modules`
- - - apps `list of modules for apps platform`
- - - - notifications `list of service for notifications modules`
- - - middleware `list of modules for 3rd party middleware`
- - - - notification-channel `list of 3rd part for sending data notification based on channel`
- - utils `list all of helper based on context`

---

# NOTIFICATIONS CHANNEL MODULE (src -> modules -> notification-channel)
the purpose of this module is to have every implementation based on each 3rd party that we have for notification channel, because we have multiple channel we need to force each implementation to have same arguments list.

`notification.channel.interface.ts` is an interface file that need to be implemented by all notification channel service.

after that we have `notification.channel.factory.ts` for a gateway for other service to access the channel. this file will distribute the channel based on argument that provider from the accessor

if you want to create new channel, create new folder with channel name, and make `module` based on its name and create new `service` that implemented the `interface`.
after that import this new channel module file to root module of this `notification channel module`. and add new `key` and the `value` inside the dictionary object in `notification.channel.factory` constructor.


# NOTIFICATION MODULE (src -> apps -> notification)
this module purpose is to implementing notification on business logic.
we have `notification.factory` as a gateway to distribute a `notification type` to it's `notification type service class`

if you want to add another notification type. you should create new class and implement `INotification` interface inside `notification-factory.interface.ts` file,
and then define supported channel for your new notification type as private attribute inside that class. and implement `INotification` `send` function. inside that function call all the `supported channels` that have `intersection` with `user subscribed channels`


# Company List
```typescript 
companies = [
    {
      id: 1,
      name: 'Skiba',
      notifChannels: ['ui'],
    },
    {
      id: 2,
      name: 'Kazu',
      notifChannels: ['email'],
    },
    {
      id: 3,
      name: 'Skinder',
      notifChannels: ['ui', 'email'],
    },
  ];
  ```

  # User List
  ```typescript
  users = [
    {
      id: 1,
      name: 'Dionysus Andrioletti',
      email: 'dandrioletti0@ucoz.com',
      notifChannels: ['ui'],
      companyId: 1,
    },
    {
      id: 2,
      name: 'Lucille Douce',
      email: 'ldouce1@newsvine.com',
      notifChannels: ['ui'],
      companyId: 1,
    },
    {
      id: 3,
      name: 'Melloney Rachuig',
      email: 'mrachuig2@cpanel.net',
      notifChannels: ['email'],
      companyId: 3,
    },
    {
      id: 4,
      name: 'Brand Risso',
      email: 'brisso3@google.com',
      notifChannels: ['ui', 'email'],
      companyId: 1,
    },
    {
      id: 5,
      name: 'Neda Tench',
      email: 'ntench4@nba.com',
      notifChannels: ['ui', 'email'],
      companyId: 2,
    },
    {
      id: 6,
      name: 'Kassi Vinker',
      email: 'kvinker5@slate.com',
      notifChannels: ['ui', 'email'],
      companyId: 3,
    },
  ];
  ```