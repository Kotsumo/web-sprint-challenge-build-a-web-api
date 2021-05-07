// Write your "projects" router here!
const express = require('express');

const {
    validateProjectId,
    validateProject,
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

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, { name: req.name })
    .then( () => {
        return Project.getById(req.params.id)
    })
    .then(user => {
        res.json(user)
    })
    .catch(next)
});


module.exports = router;