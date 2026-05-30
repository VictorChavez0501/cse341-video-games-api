const validateGame = (req, res, next) => {

  const {
    title,
    genre,
    platform,
    developer
  } = req.body;

  if (
    !title ||
    !genre ||
    !platform ||
    !developer
  ) {
    return res.status(400).json({
      message: 'All required game fields must be filled'
    });
  }

  next();
};

const validatePlayer = (req, res, next) => {

  const {
    username,
    favoriteGame,
    country
  } = req.body;

  if (
    !username ||
    !favoriteGame ||
    !country
  ) {
    return res.status(400).json({
      message: 'All required player fields must be filled'
    });
  }

  next();
};

module.exports = {
  validateGame,
  validatePlayer
};