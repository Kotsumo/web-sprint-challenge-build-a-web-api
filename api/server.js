const express = require('express');
const server = express();

const { logger } = require('./middleware/middleware')
const projectRouter = require('./projects/projects-router')


server.use(logger)
server.use('/api/projects', projectRouter);
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
