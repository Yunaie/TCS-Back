const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const {checkUser, requireAdmin} = require('./middleware/auth');
const cors = require("cors");
require('dotenv').config()
app.use(cors({
  origin: 'https://true-crime-story.onrender.com',
  credentials: true
}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.json());

app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});


const usersRouter = require('./routes/users')
const articleRouter = require('./routes/article')
const criminelRouter = require('./routes/criminel')
const victimeRouter = require('./routes/victime')
const crimeRouter = require('./routes/crime')
const commentaireRouter = require('./routes/commentaire')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// connect to db
try {
    mongoose.connect(
        `${process.env.MONGO_PASS}/test`,
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
app.use('/criminels',criminelRouter);
app.use('/victimes',victimeRouter);
app.use('/crimes',crimeRouter);
app.use('/commentaires',commentaireRouter);


app.listen(process.env.PORT || 8000);
