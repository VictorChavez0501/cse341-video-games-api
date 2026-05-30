const express = require('express');
const mongodb = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Video Games API is running');
});

app.use('/games', require('./routes/games'));
app.use('/players', require('./routes/players'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});