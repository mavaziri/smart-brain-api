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
    port: 5432,
    user: "postgres",
    password: "%@XdEj#V+4SpZJcE",
    database: "smart-brain",
  },
});

db.select("*")
  .from("users")
  .then((data) => console.log(data));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/register", (req, res) => {
  register.handleRegister(db, bcrypt)(req, res);
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(db, bcrypt)(req, res);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

//
// --> res= this is working
// signin --> POST = success/fail
// register --> POST = user
// profile/ :userId --> GET = user
// image --> PUT --> user
//
