const express = require('express')
const router = express.Router()
const chatmsg = require('../models/chatmsg.model')

/* All chatmsgs */
router.get('/', async (req, res) => {
    await chatmsg.getChatMessages()
    .then(chatmsgs => res.json(chatmsgs))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* One chatmsg by id */
router.get('/:id', async (req, res) => {
    const id = req.params.id
    await chatmsg.getChatMsgById(id)
    .then(chatmsg => res.json(chatmsg))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new chatmsg */
router.post('/', async (req, res) => {
    await chatmsg.createChatMessage(req.body)
    .then(chatmsg => res.status(201).json({
        message: `The chatmsg #${chatmsg.id} has been created.`,
        content: chatmsg
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update an chatmsg */
router.put('/:id', async (req, res) => {
    const id = req.params.id
    await chatmsg.updateChatMessage(id, req.body)
    .then(chatmsg => res.json({
        message: `The chatmsg #${chatmsg.id} has been updated`,
        content: chatmsg
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
    await chatmsg.deleteChatMessage(id)
    .then(chatmsg => res.json({
        message: `The chatmsg #${id} has been deleted and all the elements have been rearranged`
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