let express = require('express');
let router = express.Router();
let fs = require('fs');
let obj = require("../public/jsons/chat.json");
let usrs = require("../public/jsons/user.json");

/* GET users listing. */
router.get('/', function(req, res, next) {
  let chat_id = req.param('id');
  let ans = obj.find(el => el._id == chat_id);
  if(ans) {
    res.send(ans);
  }
  else {
    if (chat_id) res.send("Chat no encontrado");
    else res.send(obj);
  }
});

router.post('/', function(req, res) {
  let max = 999999999999999999999;
  let min = 10000000000000;
  let id= Math.random() * (max - min) + min;
  let users = [];
  if (req.body.users) users = users.concat(req.body.users);

  let convUsers = [];
  let messages = req.body.messages.map(m => {
    let theUser = usrs.find(el => el._id == m.userID);
    convUsers.push(theUser);
    if(!theUser) res.send('Usuario del mensaje de chat no existe');
    return {
      _id: Math.random() * (max - min) + min,
      text: m.text,
      timeStamp: m.timeStamp,
      userID: m.userID
    };
  });

  users = users.concat(convUsers);

  users = users.map(u => {
    return {
      _id: u._id,
      nickname: u.nickname,
      score: u.score,
      level: u.level,
      loggedIn: u.loggedIn,
      email: u.email
    }
  });

  obj.push({
    _id: id,
    messages: messages,
    users: users
  });
  fs.writeFile("./public/jsons/chat.json", JSON.stringify(obj), (err, result) => {
    if(err) console.log('error', err);
  });
  res.send(`Chat agregado correctamente con id ${id}`);
});

router.delete('/', function(req, res) {
  let chat_id = req.param('id');
  let index = -1;
  obj.forEach((el,i) => {
    if(el._id == chat_id) index = i
  });
  if(index !== -1) {
    obj.splice(index,1);
    fs.writeFile("./public/jsons/chat.json", JSON.stringify(obj), (err, result) => {
      if(err) console.log('error', err);
    });
    res.send('Chat eliminado correctamente');
  }
  else res.send('Chat no encontrado');
});

router.put('/', function(req, res) {
  let chat_id = req.param('id');
  let actual = obj.find(el => el._id == chat_id);
  if(!actual) res.send('Chat no encontrado');
  else{
    if (req.body.messages) {
      actual.messages = req.body.messages
    }
    if (req.body.users) {
      actual.users = req.body.users
    }
    fs.writeFile("./public/jsons/chat.json", JSON.stringify(obj), (err, result) => {
      if(err) console.log('error', err);
    });
    res.send('Chat Actualizado');
  }
});


module.exports = router;
