const Project = require('../projects/projects-model')

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timestamp}] ${method} to ${url}`);
    next();
}

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if(!project) {
            res.status(404).json({
                message: "project not found",
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "problem finding project"
        })
    }
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    if(!name && !description || !name.trim() && !description.trim()){
        res.status(400).json({
            message: 'missing required name field', 
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        next();
    }
}

function validatePost(req, res, next){
    const { text } = req.body
    if (!text || !text.trim()){
        res.status(400).json({
            message: 'missing required text',
        })
    } else {
        req.text = text.trim()
        next();
    }
}

module.exports = {
    logger,
    validateProjectId,
    validateProject,
    validatePost,
}