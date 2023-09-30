// require function to import external modules or packages into your code. Once imported, you create variables to hold references to these modules

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Enable dotenv to load environment variables from a .env file

const dbService = require('./dbService');

app.use(cors()); // Enable CORS for your Express.js app

// This line of code tells your Express.js app to understand JSON data
// that might be sent in the request's body (the data sent along with the request).
app.use(express.json());

// This line of code tells your Express.js app to understand URL-encoded form data
// in the request's body.
// The "extended: false" option simplifies how this data is processed.
app.use(express.urlencoded({ extended: false }));


// 4 ROUTES CRUD

// create
app.post('/insert', (request, response) => {
    // Extract the name from the request body
    // {} destructures name so gets straight info
    const { name } = request.body;
    console.log(`${JSON.stringify(request.body)} inserted`);

    const db = dbService.getDbServiceInstance(); // gets the db instance

    const result = db.insertNewName(name);

    result
    .then(data => response.json({ success: true }))
    .catch(err => console.log(err));
});
 
// read
app.get('/getAll', async (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData()

    result
    .then(data => response.json({data:data}))
    .catch(err => console.log(err));
});


// update// update// update

// delete


// Summary on Routes in MERN Stack Applications:

// 1. HTTP Method (Name):

// Standardized action indicators like GET, POST, PUT, DELETE, etc.
// Dictates what operation is to be performed.
// While custom names can technically be used, it's recommended to use standard names for clarity and cross-system compatibility.


// 2. URL Pattern (Path/Endpoint):

// A specific URL path or route that your application recognizes.
// Acts as the 'address' for a particular action or resource within your application.
// When a client makes a request to this 'address', the application knows how to route and handle it.

// 3. Handler Function:

// Executed when a client sends a request matching the HTTP method and URL pattern.
// Carries out the main logic for the route: can involve data retrieval, database operations, data processing, etc., and returns a response to the client.

 app.listen(process.env.PORT, () => console.log('app is running'));