const writeNotes = require('express').Router();


const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
const readAndAppend = (content, file) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// GET Route for retrieving all the notes from db.json
app.get('/api/notes', (req,res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json')
    .then((data)=> res.json(JSON.parse(data)))
    .catch((err)=>{
       console.error(err);
       res.status(500).json({error: 'Failed to read data from the database'});
    });
 
 });
 
 // POST route for adding a note
 // POST Route for a new UX/UI tip
 app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
    console.log(req.body);
  
    const { title, text} = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

  module.exports = writeNotes;

// get /api/notes
//get ('/notes',)
    // Should return all notes 

// POST /api/notes
//post('/notes')
    // fs.readFile first
    // add new thing
    //writeFile (over write file)

//delete('/notes') //extra credit**********

