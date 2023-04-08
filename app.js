const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
app.use(bodyparser.json());
app.use(express.json());
const usersRouter = require('./routes/users')
const articleRouter = require('./routes/article')

cacabouda

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// connect to db
try {
    mongoose.connect(
        "mongodb+srv://sirine:sirine42@cluster0.ngthady.mongodb.net/test",
        { useNewUrlParser: true }
      );
      mongoose.connection.on("connected", () => {
        console.log("connected to db on 8000");
      });
} catch (error) {
  console.log(error);
}

// utilisation des routes

app.get("/", (req, res) => {
  res.send("welcome to the beginning of my project");
});
app.use('/users', usersRouter);
app.use('/articles',articleRouter);

app.listen(process.env.PORT || 8000);