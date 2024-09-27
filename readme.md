# CRM TypeScript API

A Custom CRM (Customer Relationship Management) API built with TypeScript, developed specifically for [Tecmedios](https://github.com/Tecmedios). This API is designed to streamline and enhance the management of customer data, providing a comprehensive suite of features for handling various aspects of customer relationships. Key functionalities include:

## Technologies:

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Joi](https://img.shields.io/badge/Joi-4E8A8A?style=for-the-badge&logo=joomla&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76d04b?style=for-the-badge&logo=nodemon&logoColor=white)
![Pre-commit](https://img.shields.io/badge/Pre--commit-F7D76D?style=for-the-badge&logo=pre-commit&logoColor=white)
![Rimraf](https://img.shields.io/badge/Rimraf-6C78AF?style=for-the-badge&logo=rimraf&logoColor=white)

## Instructions:

1 - Clone the repository:
```sh
    git clone https://github.com/lopezrunco/tecmedios-crm-api
    cd custom-crm-api
```

2 - Install dependencies:
Make sure you have Node.js installed. Then run:
```sh
    npm install
```
3 - Set up environment variables:
Create a .env file in the root directory and add your environment variables. An example .env file might look like this:

```sh
    PORT=3000
    DB_HOST=mdb-cluster.1234.mongodb.net
    DB_PORT=27017
    DB_NAME=db-name
    DB_USER=user-name
    DB_PASSWORD=db-password
    JWT_KEY=1234567890
```

## Usage:

1 - Run the development server:
```sh
    npm run dev
```

2 - Run tests:
```sh
    npm test
```

3 - Build the project for production:
```sh
    npm run build
```

4 - Insert demo data:
```sh
    npm run seed
```

5 - Start the production server:
```sh
    npm start
```

## Roadmap:

- [ ] Protect endpoints with checkUserCredentials & checkUserRole middlewares.
- [ ] Add events.
- [ ] Generate PDF receipts.
- [ ] Allow to order priorizing the delivery date.
- [ ] Create alerts close to delivery date.
- [ ] Refactor the tests.
