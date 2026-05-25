const express = require('express');
const router = express.Router();

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL PLAYERS
router.get('/', async (req, res) => {
  try {

    const result = await mongodb
      .getDb()
      .db('videogamesDB')
      .collection('players')
      .find();

    result.toArray().then((players) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(players);
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET PLAYER BY ID
router.get('/:id', async (req, res) => {
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
});

// CREATE PLAYER
router.post('/', async (req, res) => {
  try {

    const player = {
      username: req.body.username,
      favoriteGame: req.body.favoriteGame,
      country: req.body.country,
      hoursPlayed: req.body.hoursPlayed
    };

    // VALIDATION
    if (
      !player.username ||
      !player.favoriteGame ||
      !player.country
    ) {
      return res.status(400).json({
        message: 'All required fields must be filled'
      });
    }

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
});

// UPDATE PLAYER
router.put('/:id', async (req, res) => {
  try {

    const playerId = new ObjectId(req.params.id);

    const player = {
      username: req.body.username,
      favoriteGame: req.body.favoriteGame,
      country: req.body.country,
      hoursPlayed: req.body.hoursPlayed
    };

    // VALIDATION
    if (
      !player.username ||
      !player.favoriteGame ||
      !player.country
    ) {
      return res.status(400).json({
        message: 'All required fields must be filled'
      });
    }

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
});

// DELETE PLAYER
router.delete('/:id', async (req, res) => {
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
});

module.exports = router;