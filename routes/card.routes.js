const express = require('express')
const router = express.Router()
const card = require('../models/card.model')

/* All cards */
router.get('/', async (req, res) => {
    await card.getCards()
    .then(cards => res.json(cards))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* All cards from Storyboard*/
router.get('/story/:id', async (req, res) => {
    const id = req.params.id
    await card.getCardsByStoryboard(id)
    .then(cards => res.json(cards))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* One card by id */
router.get('/:id', async (req, res) => {
    const id = req.params.id
    await card.getCardById(id)
    .then(card => res.json(card))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new card */
router.post('/', async (req, res) => {
    await card.createCard(req.body)
    .then(card => res.status(201).json({
        message: `The card #${card.id} has been created.`,
        content: card
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update an card */
router.put('/:id', async (req, res) => {
    const id = req.params.id
    await card.updateCard(id, req.body)
    .then(card => res.json({
        message: `The card #${card.id} has been updated`,
        content: card
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
    await card.deleteCard(id)
    .then(card => res.json({
        message: `The card #${id} has been deleted and all the elements have been rearranged`
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