const express = require("express");
const path = require("path");
const fs = require("fs")

const app = express();
const PORT = 7000;

// ======== MIDDLEWARE

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======== API ROUTES

app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    const json = JSON.parse(data)
    console.log("data", json)
    res.json(json)
  })
});

// app.post("/api/notes", function(req, res) {
//   console.log(req.body)
//   const newNote = req.body
//   // const parsedNote = JSON.stringify(newNote)

//   fs.readFile("./db/db.json", "utf-8", (err, data) => {
//       const parsedArray = JSON.parse(data)
//       console.log(parsedArray)
//       parsedArray.push(newNote)
//       console.log("PUSHED")
//       const stringArray = JSON.stringify(parsedArray)
//       fs.writeFile("./db/db.json", stringArray, "utf-8", (err) => {
//         if (err) throw err
//         console.log("writing")
//       })
//       res.json(parsedArray)
//     })
// })

// DELETE NOTE

// app.delete("/api/notes/:id", function(req, res) {
// // get id from note in db
// // if id matches delte
//   // const query = req.params
//   const idToDelete = parseInt(req.params.id);
//   fs.readFile("./db/db.json", "utf-8", (err, data) => {
//     const parsedArray = JSON.parse(data)
//     console.log(parsedArray)
    
//     idArray = parsedArray.map((note, index) => {
//       note.id = index
//     })
//     console.log("added id", parsedArray)
//     const filteredArray = parsedArray.filter(note => 
//       note.id !== parseInt(query.id))
//     console.log("REMOVED QUERIES", filteredArray)
//   })
// })

app.post("/api/notes", function(req, res) {
  console.log(req.body);
  const newNote = req.body;
  // const parsedNote = JSON.stringify(newNote)
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    const parsedArray = JSON.parse(data);
    console.log(parsedArray);
    parsedArray.push(newNote);
    console.log("PUSHED");
    idArray = parsedArray.map((note, index) => {
      note.id = index;
    });
    const stringArray = JSON.stringify(parsedArray);
    fs.writeFile("./db/db.json", stringArray, "utf-8", err => {
      if (err) throw err;
      console.log("writing");
    });
    res.json(parsedArray);
  });
});

// DELETE NOTE
app.delete("/api/notes/:id", function(req, res) {
  // get id from note in db
  // if id matches delte
  const idToDelete = parseInt(req.params.id);
  let dbJSON = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  console.log(dbJSON);
  console.log(idToDelete);
  const filteredArray = dbJSON.filter(note => note.id !== idToDelete);
  //console.log("query id", query.id);
  console.log("REMOVED QUERIES", filteredArray);
  const stringedDB = JSON.stringify(filteredArray);
  fs.writeFile("./db/db.json", stringedDB, "utf8", (err, data) => {
    if (err) throw err;
    console.log("success");
  });
  res.json(filteredArray);
});


// ========= HTML ROUTES
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});