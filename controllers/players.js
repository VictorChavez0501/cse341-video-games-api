const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL PLAYERS
const getAll = async (req, res) => {
  try {

    const result = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('players')
      .find();

    const players = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(players);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET PLAYER BY ID
const getSingle = async (req, res) => {
  try {

    const playerId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('players')
      .findOne({ _id: playerId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE PLAYER
const createPlayer = async (req, res) => {
  try {

    const player = {
      username: req.body.username,
      favoriteGame: req.body.favoriteGame,
      country: req.body.country,
      hoursPlayed: req.body.hoursPlayed
    };

    const response = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('players')
      .insertOne(player);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error creating player');
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PLAYER
const updatePlayer = async (req, res) => {
  try {

    const playerId = new ObjectId(req.params.id);

    const player = {
      username: req.body.username,
      favoriteGame: req.body.favoriteGame,
      country: req.body.country,
      hoursPlayed: req.body.hoursPlayed
    };

    const response = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('players')
      .replaceOne({ _id: playerId }, player);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error updating player');
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PLAYER
const deletePlayer = async (req, res) => {
  try {

    const playerId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('players')
      .deleteOne({ _id: playerId });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Error deleting player');
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlayer,
  updatePlayer,
  deletePlayer
};