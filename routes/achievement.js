let express = require('express');
let router = express.Router();
let fs = require('fs');
let obj = require("../public/jsons/achievement.json");
let usrs = require("../public/jsons/user.json");

/* GET users listing. */
router.get('/', function(req, res, next) {
	let achiev_id = req.param('id');
	let ans = obj.find(el => el._id == achiev_id);
	if(ans) {
		res.send(ans);
	}
	else {
		if (achiev_id) res.send("Logro no encontrado");
		else res.send(obj);
	}
});

router.post('/', function(req, res) {
	let max = 999999999999999999999;
	let min = 10000000000000;
	let id= Math.random() * (max - min) + min;
	let users = [];
	let elem = req.body;
	if ( !elem.name ) res.send('Es obligatorio que le logro/achievement tenga un nombre')
	if (req.body.users) users = users.concat(req.body.users);

	obj.push({
		_id: id,
		name: elem.name,
		description: elem.description,
		isReward: elem.isReward,
		users: users
	});
	fs.writeFile("./public/jsons/achievement.json", JSON.stringify(obj), (err, result) => {
		if(err) console.log('error', err);
	});
	res.send(`Logro (achievement) agregado correctamente con id ${id}`);
});

router.delete('/', function(req, res) {
	let achiev_id = req.param('id');
	let index = -1;
	obj.forEach((el,i) => {
		if(el._id == achiev_id) index = i
	});
	if(index !== -1) {
		obj.splice(index,1);
		fs.writeFile("./public/jsons/achievement.json", JSON.stringify(obj), (err, result) => {
			if(err) console.log('error', err);
		});
		res.send('Logro eliminado correctamente');
	}
	else res.send('Logro / achievement no encontrado');
});

router.put('/', function(req, res) {
	let achiev_id = req.param('id');
	let actual = obj.find(el => el._id == achiev_id);
	if(!actual) res.send('Logro / achievement no encontrado');
	else{
		if (req.body.name) actual.name = req.body.name;
		if (req.body.description) actual.description = req.body.description;
		if (req.body.logoURL) actual.logoURL = req.body.logoURL;
		if (req.body.isReward) actual.isReward = req.body.isReward;
		if (req.body.users) actual.users = req.body.users;

		fs.writeFile("./public/jsons/achievement.json", JSON.stringify(obj), (err, result) => {
			if(err) console.log('error', err);
		});
		res.send('Logro / achievement Actualizado');
	}
});


module.exports = router;
