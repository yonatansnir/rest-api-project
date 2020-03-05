require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => console.error('Something went wrong!'));
db.once('open', () => console.log('Connected to Database'))

// Routering
const usersRouter = require('./routers/userRouter');

app.use('/users', usersRouter);

app.listen(8000, () => console.log('Running on Port 8000'))