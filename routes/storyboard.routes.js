const express = require('express')
const router = express.Router()
const storyboard = require('../models/storyboard.model')
const middleauth = require('../middleware/auth.js');


/* All storyboards */
router.get('/', middleauth.checkToken, async (req, res) => {
    await storyboard.getStoryboards()
    .then(storyboards => res.json(storyboards))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* One storyboard by id */
router.get('/:id', middleauth.checkToken, async (req, res) => {
    const id = req.params.id
    await storyboard.getStoryboardById(id)
    .then(storyboard => res.json(storyboard))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new storyboard */
router.post('/', middleauth.checkToken, async (req, res) => {
    await storyboard.createStoryboard(req.body)
    .then(storyboard => res.status(201).json({
        message: `The storyboard #${storyboard.id} has been created.`,
        content: storyboard
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update an storyboard */
router.put('/:id', middleauth.checkToken, async (req, res) => {
    const id = req.params.id
    await storyboard.updateStoryboard(id, req.body)
    .then(storyboard => res.json({
        message: `The storyboard #${storyboard.id} has been updated`,
        content: storyboard
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a post */
router.delete('/:id', middleauth.checkToken, async (req, res) => {
    const id = req.params.id
    await storyboard.deleteStoryboard(id)
    .then(storyboard => res.json({
        message: `The storyboard #${id} has been deleted, its cards removed and 
        all the elements have been rearranged`
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