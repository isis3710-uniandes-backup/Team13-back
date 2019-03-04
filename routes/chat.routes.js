const express = require('express')
const router = express.Router()
const chat = require('../models/chat.model')

/* All chats */
router.get('/', async (req, res) => {
    await chat.getChats()
    .then(chats => res.json(chats))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* One chat by id */
router.get('/:id', async (req, res) => {
    const id = req.params.id
    await chat.getChatById(id)
    .then(chat => res.json(chat))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new chat */
router.post('/', async (req, res) => {
    await chat.createChat(req.body)
    .then(chat => res.status(201).json({
        message: `The chat #${chat.id} has been created.`,
        content: chat
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update an chat */
router.put('/:id', async (req, res) => {
    const id = req.params.id
    await chat.updateChat(id, req.body)
    .then(chat => res.json({
        message: `The chat #${chat.id} has been updated`,
        content: chat
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
    await chat.deleteChat(id)
    .then(chat => res.json({
        message: `The chat #${id} has been deleted and all the elements have been rearranged`
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