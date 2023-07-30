const express = require("express");
const path = require("path");
const fs = require('fs')
const util =  require('util')
const uuid = require('./helpers/uuid')
//setup express
const PORT = process.env.port || 5100
const app = express();

// MIDDLEWARE---- setup express app to handle data parsing
app.use(express.json()); // recognizes request object as json object
app.use(express.urlencoded({ extended: true })); //recognizes data as strings/arrays
app.use(express.static("public"));

//.promisify turens fs.readFile into a new function that we are calling readFromFile, it makes the fs.readFile return a promise. (point of confusion for me)
const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

  // This will read the file (./db/db.json)
const readAndAppend = (content, file) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
   // if there is an error, log error in console
    if (err) {
      console.error(err);
      //if reading is successful, the data variable will contain the contents from ./db/db.json  
    } else {
      const parsedData = JSON.parse(data);
      //this will push the new content to the data array that is in ./db/db.json
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// Express route definition : will send user to ./public/notes.html file when end point is http://localhost.3001/notes
// the res.sendFile is an express method used to send a file in the RESPONSE (res = response) the file being sent is mentioned above.
app.get("/notes", (req, res) =>
   res.sendFile(path.join(__dirname, "./public/notes.html"))
);
// this is another express route def: 
// we are using readFromFile function to read out database THEN we have a promise chain that will parsing the data from our db file 
app.get("/api/notes", (req, res) => {
   readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)))
});

//use post method to call on readAndAppend, post to db.
app.post("/api/notes", (req, res) => {
   //will log the HTTP method of the request (POST) and a message in the console.
   console.info(`${req.method} request received to add note`);
   const { title, text } = req.body;
   if (req.body) {
      const newNote = {
         title,
         text,
         note_id: uuid(),
      };
      readAndAppend(newNote, './db/db.json');
      res.json('Note added successfully');
   } else {
      res.error('Error in adding note');
   }
})
app.delete('/api/notes/:id', (req, res) => {
   const id = req.params.user_id;
   id.deleteData();
})
//  Get route for homepage - * any 'wildcards' (non-specified-routes) will be directed to the homepage.
app.get("*", (req, res) =>
   res.sendFile(path.join(__dirname, "./public/index.html"))
);
app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
