const express = require('express')
const router = express.Router()
module.exports = router

router.use('/api/achievements', require('./achievement.routes'))
router.use('/api/cards', require('./card.routes'))
router.use('/api/chats', require('./chat.routes'))
router.use('/api/chatmsgs', require('./chatmsg.routes'))
router.use('/api/comments', require('./comment.routes'))
router.use('/api/games', require('./game.routes'))
router.use('/api/gametypes', require('./gametype.routes'))
router.use('/api/storyboards', require('./storyboard.routes'))
router.use('/api/users', require('./user.routes'))