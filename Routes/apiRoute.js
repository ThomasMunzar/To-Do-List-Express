const fs = require('fs')
const util =  require('util')
const uuid = require('../helpers/uuid')
const router = require('express').Router()


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


// this is another express route def: 
// we are using readFromFile function to read out database THEN we have a promise chain that will parsing the data from our db file 
router.get("/notes", (req, res) => {
  readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)))
});

//use post method to call on readAndAppend, post to db.
router.post("/notes", (req, res) => {
  //will log the HTTP method of the request (POST) and a message in the console.
  console.info(`${req.method} request received to add note`);
  const { title, text } = req.body;
  if (req.body) {
     const newNote = {
        title,
        text,
        id: uuid(),
     };
     readAndAppend(newNote, './db/db.json');
     res.json('Note added successfully');
  } else {
     res.error('Error in adding note');
  }
})
router.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  readFromFile('./db/db.json').then((data)=> {
     const notes = JSON.parse(data)
     const filteredNotes = notes.filter(note => note.id !== id)
     writeToFile('./db/db.json', filteredNotes)
     res.json(200)
  })

})

module.exports = router