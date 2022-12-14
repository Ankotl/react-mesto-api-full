const router = require('express').Router();
const userRoute = require('./users');
const cardsRoute = require('./cards');

const ErrorNotFound = require('../errors/ErrorNotFound');

router.use('/users', userRoute);
router.use('/cards', cardsRoute);

router.use((req, res, next) => {
  next(new ErrorNotFound('Запрашиваемая страница отсутствует'));
});

module.exports = router;
