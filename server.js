const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

const tasks = require('./routes');
const cors = require('cors');

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION,
	{useNewUrlParser: true}, () => console.log('Connected to DB'));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', tasks);
app.listen(port, () => {
	 console.log(`Server start on port ${port}`)
});

