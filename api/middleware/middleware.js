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
        const project = await Project.getById(req.params.id)
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


module.exports = {
    logger,
    validateProjectId,
}