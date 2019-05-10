const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const tasks = require('./routes');
const cors = require('cors');
const port = 5000;
const app = express();

app.use(
  cors({
    origin: "http://192.168.1.135:3000",
    credentials: true
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client')));

app.use('/api', tasks);

app.listen(port, () => {
  console.log(`Listen on port ${port}`)
});

