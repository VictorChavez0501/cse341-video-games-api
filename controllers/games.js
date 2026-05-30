const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL GAMES
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('games')
      .find();

    const games = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(games);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET GAME BY ID
const getSingle = async (req, res) => {
  try {

    const gameId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('games')
      .findOne({ _id: gameId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE GAME
const createGame = async (req, res) => {
  try {

    const game = {
      title: req.body.title,
      genre: req.body.genre,
      platform: req.body.platform,
      developer: req.body.developer,
      releaseYear: req.body.releaseYear,
      rating: req.body.rating,
      multiplayer: req.body.multiplayer,
      price: req.body.price
    };

    const response = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('games')
      .insertOne(game);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error creating game');
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE GAME
const updateGame = async (req, res) => {
  try {

    const gameId = new ObjectId(req.params.id);

    const game = {
      title: req.body.title,
      genre: req.body.genre,
      platform: req.body.platform,
      developer: req.body.developer,
      releaseYear: req.body.releaseYear,
      rating: req.body.rating,
      multiplayer: req.body.multiplayer,
      price: req.body.price
    };

    const response = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('games')
      .replaceOne({ _id: gameId }, game);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error updating game');
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE GAME
const deleteGame = async (req, res) => {
  try {

    const gameId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('games')
      .deleteOne({ _id: gameId });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Error deleting game');
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createGame,
  updateGame,
  deleteGame
};