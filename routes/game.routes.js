const express = require('express')
const router = express.Router()
const game = require('../models/game.model')
const middleauth = require('../middleware/auth.js');


/* All games */
router.get('/', middleauth.checkToken, async (req, res) => {
    await game.getGames()
    .then(games => res.json(games))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* One game by id */
router.get('/:id', middleauth.checkToken, async (req, res) => {
    const id = req.params.id
    await game.getGameById(id)
    .then(game => res.json(game))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new game */
router.post('/', middleauth.checkToken, async (req, res) => {
    await game.createGame(req.body)
    .then(game => res.status(201).json({
        message: `The game #${game.id} has been created.`,
        content: game
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update an game */
router.put('/:id', middleauth.checkToken, async (req, res) => {
    const id = req.params.id
    await game.updateGame(id, req.body)
    .then(game => res.json({
        message: `The game #${game.id} has been updated`,
        content: game
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
    await game.deleteGame(id)
    .then(game => res.json({
        message: `The game #${id} has been deleted and all the elements have been rearranged`
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