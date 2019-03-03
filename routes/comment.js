let express = require('express');
let router = express.Router();
let fs = require('fs');
let obj = require("../public/jsons/comment.json");
let usrs = require("../public/jsons/user.json");

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user_id = req.param('id');
  let ans = obj.find(el => el._id === user_id);
  if(ans) {
    res.send(ans);
  }
  else {
    if (user_id) res.send("Comentario no encontrado");
    else res.send(obj);
  }

});

router.post('/', function(req, res) {
  let max = 999999999999999999999;
  let min = 10000000000000;
  let id = Math.random() * (max - min) + min;
  let text = req.body.text;
  let timeStamp = req.body.timeStamp;
  let userID = req.body.userID;
  let theUser = usrs.find(el => el._id === userID);
  obj.push({
    _id: id,
    text: text,
    timeStamp: timeStamp,
    user: {
      _id: userID,
      nickname: theUser.nickname,
      score: theUser.score,
      level: theUser.level,
      loggedIn: theUser.loggedIn,
      email: theUser.email
    }
  });
  fs.writeFile("./public/jsons/comment.json", JSON.stringify(obj), (err, result) => {
    if(err) console.log('error', err);
  });
  res.send('Comentario agregado');
});

router.delete('/', function(req, res) {
  let comment_id = req.param('id');
  let index = -1;
  obj.forEach((el,i) => {
    if(el._id == comment_id) index = i
  });
  if(index !== -1) {
    obj.splice(index,1);
    fs.writeFile("./public/jsons/comment.json", JSON.stringify(obj), (err, result) => {
      if(err) console.log('error', err);
    });
    res.send('Comentario eliminado');
  }
  else res.send('Comentario no encontrado');
});

router.put('/', function(req, res) {
  let comment_id = req.param('id');
  let actual = obj.find(el => el._id == comment_id);
  if(!actual) res.send('Comentario no encontrado');
  else{
    let userID = req.body.userID;
    if(req.body.text) actual.text = req.body.text;
    if(req.body.timeStamp) actual.timeStamp = req.body.timeStamp;
    if(userID && (actual.user._id != userID)) {
      let theUser = usrs.find(el => el._id == userID);
      if(!theUser) res.send('Usuario del comentario no encontrado');
      else{
        actual.user = {
          _id: req.body.userID,
          nickname: theUser.nickname,
          score: theUser.score,
          level: theUser.level,
          loggedIn: theUser.loggedIn,
          email: theUser.email
        };
      }
    }
  }
  fs.writeFile("./public/jsons/comment.json", JSON.stringify(obj), (err, result) => {
    if(err) console.log('error', err);
  });
  res.send('Comentario Actualizado');
});


module.exports = router;
