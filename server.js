const express = require("express");
const htmlRoutes = require('./Routes/htmlRoute')
const apiRoutes = require('./Routes/apiRoute')


//setup express
const PORT = process.env.port || 5100
const app = express();

// MIDDLEWARE---- setup express app to handle data parsing
app.use(express.json()); // recognizes request object as json object
app.use(express.urlencoded({ extended: true })); //recognizes data as strings/arrays
app.use(express.static("public"));
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)
//.promisify turns fs.readFile into a new function that we are calling readFromFile, it makes the fs.readFile return a promise. (point of confusion for me)


//  Get route for homepage - * any 'wildcards' (non-specified-routes) will be directed to the homepage.

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
