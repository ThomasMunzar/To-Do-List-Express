// direct traffic  of ROUTES in here:

const miniApp = require('express').Router();

const apiRouter = require('./apiRoute.js');
const htmlRouter = require('./htmlRoute.js');

// const app = express();

miniApp.use('/api', apiRouter);//tarmac
miniApp.use('/', htmlRouter);
module.exports = miniApp;
