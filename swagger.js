const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Video Games API',
    description: 'CRUD API for games and players'
  },
  host: 'cse341-video-games-api-z4xu.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);