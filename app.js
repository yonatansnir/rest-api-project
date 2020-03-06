require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => console.error('Something went wrong!'));
db.once('open', () => console.log('Connected to Database'))


// Routes
const usersRouter = require('./routes/userRouter');

app.use(express.json());
app.use('/users', usersRouter);

app.listen(8000, () => console.log('Running on Port 8000'))