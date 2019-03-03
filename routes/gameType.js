let express = require('express');
let router = express.Router();
let fs = require('fs');
let gtFile = require("../public/jsons/gameType.json");

var id = 1;



/*
Retorna un game type con el id pasado por parámetro o todos si no se pasó ningún id
returns: null si no se encontró el juego, juego o todos los juegos.
*/
router.get('/', (req, res) => {

	let uid = req.param("id");
	console.log("en gt get");
	if(uid != undefined && uid != null){
		
		let gt = gtFile.find( g => {
			return g._id === uid;
		});

		if (gt === undefined){
			res.status(404);
			res.send("game type not found");
		}
		else{
			res.send(gt);
		}
	}
	else{
		res.send(gtFile);
	}
});

/*
Crea un nuevo tipo de juego a partir del objeto pasado por parámetro.
gt: objeto tipod de juego. Debe contener name, description, timeLimit y logoUrl.
returns: mensaje de error si el objeto no tiene uno de los parámetros requeridos,
	el nuevo objeto si fue posible crearlo.
*/
router.post('/', (req, res) => {
	let gt = req.body;
	if (gt.name === undefined || gt.name === null || gt.description === undefined
		|| gt.description === null || gt.timeLimit === undefined || 
		gt.timeLimit ===null || gt.logoURL === undefined || gt.logoURL === null){
		res.status(400);
		res.send("invalid param");
		return;
	}

	let newGt ={
		description: gt.description,
		name: gt.name, 
		timeLimit: gt.timeLimit,
		_id: id++,
		logoURL: gt.logoURL
	};

	gtFile.push(newGt);

	fs.writeFile("./public/jsons/gameType.json", JSON.stringify(gtFile), (err, result) => {
   		if(err) console.log('error', err);
	});

	res.send(newGt);
});

/*
Modifica un game type existente, cambiando su nombre, descripción, límite de tiempo,
	y url de logo.
gt: GameType con las modificaciones deseadas.
returns: mensaje de error si no fue posible realizar la modificación; objeto modificado si
	sí fue posible.
*/
router.put('/', (req, res) => {

	let gt = req.body;

	if (gt._id === undefined || gt._id === null){

		res.status(400);
		res.send("invalid param");
		return;
	}

	let oldGt = gtFile.find( g => {
		return g._id === gt._id;
	});

	if(oldGt === undefined){
		res.status(404);
		res.send("game type not found");
		return;
	}
	else{
		oldGt.name = gt.name; 
		oldGt.description = gt.description;
		oldGt.timeLimit = gt.timeLimit;
		oldGt.logoUrl = gt.logoUrl;

		fs.writeFile("./public/jsons/gameType.json", JSON.stringify(gtFile), (err, result) => {
    		if(err) console.log('error', err);
  		});

		res.send(oldGt);
	}
});

/*
Elimina el gt con el uid dado por parámetro.
uid: id del gt que se eliminará.
returns: mensaje de error si no fue posible eliminar el objeto, 
true de modo contrario.
*/
router.delete("/", (req, res) => {

	let uid = req.param('id');

	if( uid === undefined || uid === null){
		res.status(400);
		res.send("invalid param");
		return;
	}

	let gt = gtFile.find( g => {
		return g._id === uid;
	});

	if(gt === undefined){
		res.status(404);
		res.send("game type not found");
	}
	else{
		gtFile.splice(gtFile.indexOf(gt), 1);

		fs.writeFile("./public/jsons/gameType.json", JSON.stringify(gtFile), (err, result) => {
    		if(err) console.log('error', err);
  		});

		res.send(true);
	}

});


module.exports = router;