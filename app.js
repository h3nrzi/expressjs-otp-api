const express = require('express');
const userRouter = require('./Routers/userRouter');

const app = express();

//////// MIDDLEWARES
app.use(express.json());

//////// ROUTES
app.use('/api/user', userRouter);

module.exports = app;
