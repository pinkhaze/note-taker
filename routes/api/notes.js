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

// API route for POST /api/notes
// 
notes.post('/', (req, res) => {
    console.log(`${req.method} request received for new note`);
    console.log(req.body);

    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            id: uuid.v4(),
            title,
            text,
        };
        
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) throw err
            const parsedNotes = JSON.parse(data)
            parsedNotes.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 3), function () {
                if (err) throw err;
                return res.json(parsedNotes)
            });
        });
    }
});

// API route for DELETE /api/notes/:id
// Read all notes from db.json file, remove note w/ given id property, and rewrite filtered notes to db.json file
notes.delete('/:id', (req, res) => {
  console.log(`${req.method} request received for note deletion`);

  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) throw err
    const parsedNotes = JSON.parse(data)
    const filteredNotes = parsedNotes.filter((note) => note.id !== req.params.id);
    
    fs.writeFile('./db/db.json', JSON.stringify(filteredNotes, null, 3), function() {
      if (err) throw err;
      return res.json(filteredNotes)
    })
  })
})

module.exports = notes;