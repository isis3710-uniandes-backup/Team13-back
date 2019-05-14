const express = require('express')
const router = express.Router()
const gametype = require('../models/gametype.model')
const middleauth = require('../middleware/auth.js');

/* All gametypes */
router.get('/', middleauth.checkToken, async (req, res) => {
    await gametype.getGameTypes()
    .then(gametypes => res.json(gametypes))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* One gametype by id */
router.get('/:id', middleauth.checkToken, async (req, res) => {
    const id = req.params.id
    await gametype.getGameTypeById(id)
    .then(gametype => res.json(gametype))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new gametype */
router.post('/', middleauth.checkToken, async (req, res) => {
    await gametype.createGameType(req.body)
    .then(gametype => res.status(201).json({
        message: `The gametype #${gametype.id} has been created.`,
        content: gametype
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update an gametype */
router.put('/:id', middleauth.checkToken, async (req, res) => {
    const id = req.params.id
    await gametype.updateGameType(id, req.body)
    .then(gametype => res.json({
        message: `The gametype #${gametype.id} has been updated`,
        content: gametype
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
    await gametype.deleteGameType(id)
    .then(gametype => res.json({
        message: `The gametype #${id} has been deleted and all the elements have been rearranged`
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