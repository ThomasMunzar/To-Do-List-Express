// direct traffic  of ROUTES in here:
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');


// const miniApp = require('express').Router();
// const apiRouter = require('./apiRoute.js');
// const htmlRouter = require('./htmlRoute.js');
// app.use('/api', apiRouter);//tarmac
// app.use('/', htmlRouter);
// module.exports = miniApp;

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/notes", (req, res) =>
   res.sendFile(path.join(__dirname, "./public/notes.html"))
);






app.get("*", (req, res) =>
   res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.listen(PORT, () => console.log(`server is running http://localhost:${PORT}`));


// create - GET method
//read- PUT method
//update
//delete