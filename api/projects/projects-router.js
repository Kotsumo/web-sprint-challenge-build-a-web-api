// Write your "projects" router here!
const express = require('express');

const {
    validateProjectId,
} = require('../middleware/middleware');

const Project = require('./projects-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
    .then(project => {
        res.json(project)
    })
    .catch(next)
});

router.get('./:id', validateProjectId, (req, res) => {
    res.json(req.project)
});

module.exports = router;