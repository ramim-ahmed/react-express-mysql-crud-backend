const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());

//create mysql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "moviedb",
});

//connect to db
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql database connected");
});


//insert movie review
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_review(movieName, reviews) VALUES (?,?);";

  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});




// get all movie feedback
app.get("/api/get", (req, res) => {
  const sqlSelect =
    "SELECT * FROM movie_review";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});









app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`sever running on http://localhost:${port}`);
});
