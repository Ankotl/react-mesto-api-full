require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handelError = require('./middlewares/handelError');
const { validationLogin, validationCreateUser } = require('./middlewares/validations');

const options = {
  origin: [
    'http://localhost:3000',
    'https://ankotlyakov.frontend.mesto.nomoredomains.sbs',
    'https://Ankotl.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();
const { PORT = 3010 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('*', cors(options));
app.use(express.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handelError);
app.listen(PORT);
