const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");
const uuid = require("uuid");

const app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
// changes from hexadeciaml to json back and forth
//Middleware // lets us have access to our html css and js
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// this made it so public folder // this removed the first error
app.use(express.static("public"));

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

// HTML Routes
// gets the notes html page and displays it in browser
app.get("/notes", (request, response) => {
  console.log("You are in the get /notes");
  response.sendFile(path.join(__dirname, "/public/notes.html"));
});

//gets the index.html page and displays in browser also if the url input doesnt have a route it'll default to this
app.get("/", (request, response) => {
  console.log("You are in the get / ");
  response.sendFile(path.join(__dirname, "/public/index.html"));
});

// API Routes
// gets
app.get("/api/notes", (request, response) => {
  console.log("You are in the get /api/notes");
  response.sendFile(path.join(__dirname, "/db/db.json"));
});

// app.get('/api/notes', (req, res) => {
//   res.json(noteDB);
// });

app.post("/api/notes", (request, response) => {
  console.log("You are in the post request");
  // console.log("request.body");
  // console.log(request.body)
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));

  // console.log('-----./db-----');
  // console.log(./db/db.json)
  // console.log('-----./db-----');

  console.log("-----Parse-----");
  console.log(fs.readFileSync("./db/db.json")); // logs the text being converted into hexadeciaml
  console.log("-----Parse-----");

  // console.log('-----JSONParse-----');
  // console.log(JSON.parse(fs.readFileSync("./db/db.json"))) // logs the text being converted into hexadeciaml
  // console.log('-----JSONParse-----');

  console.log("---------------notes:---------------");
  console.log(notes); // logs all the objects in the current api
  console.log("---------------notes:---------------");

  const newNotes = request.body;

  console.log("---------------newNotes:---------------");
  console.log(newNotes); // logs the current object that was typed in the browser
  console.log("---------------newNotes:---------------");

  newNotes.id = uuid.v4(); // gives an id to each object
  notes.push(newNotes); // pushes the mpst recent added note into the notes array(database)
  fs.writeFileSync("./db/db.json", JSON.stringify(notes)); // strinfifies the new array of obejcts
  response.json(notes); // sends back a json object
});

app.delete("/api/notes/:id", (request, response) => {
  console.log("You are in the delete request");

  const notes = JSON.parse(fs.readFileSync("./db/db.json"));

  // console.log('-----./db-----');
  // console.log(./db/db.json)
  // console.log('-----./db-----');

  console.log("-----Parse-----");
  console.log(fs.readFileSync("./db/db.json"));
  console.log("-----Parse-----");

  console.log("-----DELETE notes-----");
  console.log(notes); // logs all the current objects before one being deleted
  console.log("-----DELETE notes-----");

  const delNote = notes.filter((rmvNote) => rmvNote.id !== request.params.id);
  console.log("-----DELETE delNote-----");
  console.log(delNote); // logs all the current obejcts left after one of them was deleted
  console.log("-----DELETE delNote-----");

  fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
  console.log("JSON.stringify(delNote)");
  console.log(JSON.stringify(delNote)); // logs the current objects after one of them was deleted but all as a string
  console.log("JSON.stringify(delNote)");

  response.json(delNote);
  console.log(response.json(delNote)); // logs the current objects after one of them was deleted but as json
});

console.log(__dirname);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
