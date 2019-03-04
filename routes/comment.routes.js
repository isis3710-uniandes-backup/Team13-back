const express = require('express')
const router = express.Router()
const comment = require('../models/comment.model')

/* All comments */
router.get('/', async (req, res) => {
    await comment.getComments()
    .then(comments => res.json(comments))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* One comment by id */
router.get('/:id', async (req, res) => {
    const id = req.params.id
    await comment.getCommentById(id)
    .then(comment => res.json(comment))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new comment */
router.post('/', async (req, res) => {
    await comment.createComment(req.body)
    .then(comment => res.status(201).json({
        message: `The comment #${comment.id} has been created.`,
        content: comment
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update an comment */
router.put('/:id', async (req, res) => {
    const id = req.params.id
    await comment.updateComment(id, req.body)
    .then(comment => res.json({
        message: `The comment #${comment.id} has been updated`,
        content: comment
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a post */
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    await comment.deleteComment(id)
    .then(comment => res.json({
        message: `The comment #${id} has been deleted and all the elements have been rearranged`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})


// Routes
module.exports = router