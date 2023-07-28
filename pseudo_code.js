// What is being asked?
    // landing page with link to a notes page when app is opened
    //
    // create save icon when new note is written

    // ROUTES
        // 1. Get /notes
        // 2. GET *
        // 3. GET /api/notes
        // 4. POST /api/notes

        



//Look Through Starter code.
    // Need a server.js file(code for server)
    // Separation of concern (routes folder)
    // db folder will be where we reading from a json file ?? idk what this means

//server-side
    // look at server from activity for layout

    const express = require('express');
    const path = require('path');
    const app = express();
    const PORT = 3000;
    // import public folder, html routes,

// Serve images, css files, js files from the public directory
// Allows us to reference files with their relative path
// Example: http://localhost:3001/images/cat.jpg
//https://expressjs.com/en/starter/static-files.html


app.use(express.static('public')); //middlewear css, img, html will go in the public folder. Everyone has access to it.
app.use(express.urlencoded({extend:true}));// accepting html forms, url encoded, HTTP POST request. key value pairs VS string or array 
app.use(express.json()) // telling it that we could be passing JSON objects in the body so that it will know to handle them


// two routes - HTML and API ---SEPARATION OF CONCERN

app.use('api',)