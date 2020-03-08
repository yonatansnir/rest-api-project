//require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => console.error('Something went wrong!'));
db.once('open', () => console.log('Connected to Database'))


// Routes
const usersRouter = require('./routes/userRouter');
const todosRouter = require('./routes/todosRouter');
const postsRouter = require('./routes/postsRouter');

app.use(express.json());
app.use('/users', usersRouter);
app.use('/todos', todosRouter);
app.use('/posts', postsRouter);

app.listen(8000, () => console.log('Running on Port 8000'))