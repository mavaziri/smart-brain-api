const express = require("express");
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt-nodejs");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
const { hash } = require("bcrypt");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "smart-brain",
  },
});

// db.select("*")
//   .from("users")
//   .then((data) => console.log(data));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  // res.send(db.users);
  res.send("TEST");
});

app.post("/register", (req, res) => {
  debugger;
  register.handleRegister(db, bcrypt)(req, res);
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(db, bcrypt)(req, res);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  debugger
  console.log('HERE IN IMAGE ENDPOINT')
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  debugger
  console.log('HERE IN IMAGEURL ENDPOINT')
  image.handleApiCall(req, res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

//
// --> res= this is working
// signin --> POST = success/fail
// register --> POST = user
// profile/ :userId --> GET = user
// image --> PUT --> user
//
