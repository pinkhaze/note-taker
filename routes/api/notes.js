const notes = require('express').Router();
const fs = require('fs');
const uuid = require("uuid");

// API route for GET /api/notes
// Read db.json file and return all saved notes as JSON
notes.get('/', (req, res) => {
    console.log(`${req.method} request received for all notes`);

    // Asynchronously read contents of db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const note = JSON.parse(data);
        return res.json(note);
    });
});




module.exports = notes;