const express = require('express')
const router = express.Router()
const user = require('../models/user.model')
const middleauth = require('../middleware/auth.js');


router.post('/isLogin', async (req, res) => {
    console.log("ISLOGIN");
    const token = req.body.token;
    await user.isLogin(token)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
})

/*Log in, obtain JWT*/
router.post('/login', async (req, res) => {
    console.log("LOGIN");
    const username = req.body.nickname;
    const password = req.body.password;
    await user.login(username, password)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
})

/*register*/
router.post('/register', async (req, res) => {
    const username = req.body.nickname;
    const password = req.body.password;
    console.log("On router register");
    await user.register(username, password)
        .then(response => res.json(response))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
})

/*Logout*/

/* All users */
router.get('/', middleauth.checkToken, async (req, res) => {
    await user.getUsers()
        .then(users => res.json(users))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* One user by id */
router.get('/:id', middleauth.checkToken, async (req, res) => {
    const id = req.params.id
    await user.getUserById(id)
        .then(user => res.json(user))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new user */
router.post('/', middleauth.checkToken, async (req, res) => {
    await user.createUser(req.body)
        .then(user => res.status(201).json({
            message: `The user #${user.id} has been created.`,
            content: user
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

/* Update an user */
router.put('/:id', middleauth.checkToken, async (req, res) => {
    const id = req.params.id
    await user.updateUser(id, req.body)
        .then(user => res.json({
            message: `The user #${user.id} has been updated`,
            content: user
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
    await user.deleteUser(id)
        .then(user => res.json({
            message: `The user #${id} has been deleted and all the elements have been rearranged`
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