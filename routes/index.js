const express = require('express');

// Import file containing our route
const notesRouter = require('./api/notes');

// Create an instance of express so we can apply middleware and routing
const app = express();

app.use('/notes', notesRouter);

module.exports = app;
