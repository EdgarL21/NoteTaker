const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
// changes from hexadeciaml to json back and forth
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

// gets the notes html page and displays it in browser
app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "./public/notes.html"));
});

//gets the index.html page and displays in browser also if the url input doesnt have a route it'll default to this
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", (request, response) => {
  response.send(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (request, response) => {

})

console.log(__dirname);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
