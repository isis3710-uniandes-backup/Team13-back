const express = require('express')
const router = express.Router()
const ach = require('../models/achievement.model')

/* All achievements */
router.get('/', async (req, res) => {
    await ach.getAchievements()
    .then(achs => res.json(achs))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* One achievement by id */
router.get('/:id', async (req, res) => {
    const id = req.params.id
    await ach.getAchievementById(id)
    .then(achievement => res.json(achievement))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new achievement */
router.post('/', async (req, res) => {
    await ach.createAchievement(req.body)
    .then(achievement => res.status(201).json({
        message: `The achievement #${achievement.id} has been created.`,
        content: achievement
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update an achievement */
router.put('/:id', async (req, res) => {
    const id = req.params.id
    await ach.updateAchievement(id, req.body)
    .then(achievement => res.json({
        message: `The achievement #${achievement.id} has been updated`,
        content: achievement
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
    await ach.deleteAchievement(id)
    .then(achievement => res.json({
        message: `The achievement #${id} has been deleted and all the elements have been rearranged`
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