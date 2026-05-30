const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');
const validation = require('../middleware/validate');

router.get('/', gamesController.getAll);

router.get('/:id', gamesController.getSingle);

router.post(
  '/',
  validation.validateGame,
  gamesController.createGame
);

router.put(
  '/:id',
  validation.validateGame,
  gamesController.updateGame
);

router.delete('/:id', gamesController.deleteGame);

module.exports = router;