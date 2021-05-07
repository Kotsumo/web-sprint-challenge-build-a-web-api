// Write your "projects" router here!
const express = require('express');

const {
    validateProjectId,
    validateProject,
    validatePost,
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


////// ??????????????????? //////////
router.post('/', validateProject, validatePost, async (req, res, next) => {
    try {
        const result = await Project.insert({
            name: req.name,  
            description: req.description,
        })
        res.status(201).json(result)
    } catch(err) {
        next(err)
    }
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

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        next(err)
    }
});

module.exports = router;