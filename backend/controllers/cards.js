const Cards = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send(cards.reverse()))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы невалидные данные при создании карточки'));
      } else {
        next(err);
      }
    }).catch(next);
};

const likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      next(new ErrorNotFound('Запрашиваемая карточка не найдена'));
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      if (err.statusCode === 404) {
        return next(new ErrorNotFound('Запрашиваемая карточка не найдена'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      next(new ErrorNotFound('Запрашиваемая карточка не найдена'));
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные для снятия лайка'));
      }
      if (err.statusCode === 404) {
        return next(new ErrorNotFound('Запрашиваемая карточка не найдена'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  return Cards.findById(cardId)
    .orFail(() => {
      next(new ErrorNotFound('Запрашиваемая карточка не найдена'));
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Cards.findByIdAndRemove(cardId).then(() => res.send(card)).catch(next);
      } else {
        next(new ForbiddenError('В доступе отказано'));
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
