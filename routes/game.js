let express = require('express');
let router = express.Router();
let fs = require('fs');
let gFile = require("../public/jsons/game.json");
let cFile = require("../public/jsons/chat.json");
let uFile = require("../public/jsons/user.json");


//métodos para comenzar juegos y para añadir usuarios.
var uid =  1;

/*	games: [
		{
			uid: 0,
			timeStampInit: new Date(),
			timeStampEnd: null,
			active: true,

			//TODO, relaciones
			host: "placeholder",
			guests: ["placeholderG1", "placeholderG2"],
			//OJO, si active == true <-> winner == null
			winner: null,
			chat: "placeholderChat",
			storyboards: ["placeholderSBs"],
			gType: "placeholderType"
		}
	],*/

/*
Recibe por parámetro un uid de un juego y retorna el objeto juego correspondiente o null si no existe.
uid: uid del juego
returns: objeto juego o null si no se encontró un juego con ese uid
*/
router.get('/', (req, res) => {

	let id = req.param("id");

	if(id !== undefined && id !== null){
		let game = gFile.find( g => {
			return g._id == id;
		});
		if(game === undefined){
			res.status(404);
			res.send("game not found");
			return;
		}
		res.send(game);
	}
	else{
		res.send(gFile);
		return;
	}
});

/*
Método que permite añadir un juego.
game: objeto juego que se añadirá, requiere de un host y gType. 
	todos los demás valores se inicializan a valores por defecto.
returns true si el usuario se puedo añadir, string de error de modo contrario
*/
router.post("/", (req, res) => {

	game = req.body;

	if( game.host === undefined || game.host === null || game.tipo ===undefined 
		|| game.tipo === null ){
		res.status(400);
		res.send("invalid param");
		return; 
	}


	
	
	//verificar que el usuario host existe. 

	let user = uFile.find( u => {
		return u.nickname === game.host.nickname;
	});

	if (user === undefined){
		res.status(404);
		res.send("host not found");
		return;
	}


	//Al crear el juego se debe crear su correspondiente chat

  	let max = 999999999999999999999;
  	let min = 10000000000000;
	let id= Math.random() * (max - min) + min;
	let chat = {
		_id: id,
   	 	messages: [],
    	users: [user]
	};

	cFile.push(chat);

	fs.writeFile("./public/jsons/chat.json", JSON.stringify(cFile), (err, result) => {
   		if(err) console.log('error', err);
	});

	let newG = {
		_id: uid++,
		timeStampInit: new Date(),
		timeStampEnd: null,
		active: true,

		host: user,
		guests: [],
		winner: null,
		chat: chat,
		storyboards: [],
		tipo: game.tipo
	};

	gFile.push(newG);

	fs.writeFile("./public/jsons/game.json", JSON.stringify(gFile), (err, result) => {
   		if(err) console.log('error', err);
	});
	
	console.log(gFile);

	res.send(newG);
});


/*
Modifica un juego existente, cambiando su estado de activo, sus guests y su ganador.
Params: objeto juego con los nuevos valores.
return, mensaje de error si no se pudo añadir, juego modificado de modo contrario.
*/
router.put('/', (req, res) => {

	let game = req.body;

	if( game._id === undefined || game._id === null){
		res.status(400);
		res.send("invalid param");
		return;
	}

	let oldGame = gFile.find( g => {
		return g._id === game._id;
	});

	if(oldGame === undefined){
		res.status(400);
		res.send("game not found");
		return;
	}

	oldGame.active = game.active;
	oldGame.guests = game.guests;

	if(!oldGame.active){
		oldGame.winner = game.winner;
		oldGame.timeStampEnd = new Date();
	}
	oldGame.storyboards = game.storyboards;

	fs.writeFile("./public/jsons/game.json", JSON.stringify(gFile), (err, result) => {
   		if(err) console.log('error', err);
	});
	

	res.send(oldGame);
});

/*
	Elimina el juego dueño del id dado.
	retorna error si no se encontró el juego. true de modo contrario.
*/
router.delete("/", (req, res) =>{

	let uid = req.param("id");

	if( uid === undefined || uid === null){
		res.status(404)
		res.send("invalid param")
		return;
	}

	let game = gFile.find( g => {
			return g._id === uid;
	});

	if(game === null){
		return "game not found";
	}

	gFile.splice(gFile.indexOf(game), 1);

	fs.writeFile("./public/jsons/game.json", JSON.stringify(gFile), (err, result) => {
   		if(err) console.log('error', err);
	});
	

	res.send(true);

});

	/*
	método que termina un juego.
	uid: id del juegom
	winner: jugador ganador del juego
	returns: true si se pudo acabar el juego, mensaje de error de modo contrario.
	*/
/*	endGame: (uid, winner) =>{

		if(uid===undefined || uid === null || winner === undefined || winner === null){
			return "invalid param";
		}

		let game = GameLogic.get(uid);

		if(game === null){
			return "game not found";
		}

		//verificar que winner es un jugador real.
		if(ul.get(winner.uid) === null){
			return "user not found";
		}

		game.winner = winner;
		game.active = false;

		return true
	},

	/*
	método que añade un sb a un juego
	uid: id del juegom
	sb: storyboard a añadirse
	returns: true si se pudo añadir el sb, mensaje de error de modo contrario.
	*/
/*	addStoryboard: (uid, sb) => {

		if(uid === undefined || uid === null || sb ===undefined || sb ===null){
			return "invalid param";
		}

		let game = GameLogic.get(uid);

		if(game === null){
			return "game not found";
		}
		//TODO, verificar que sb es un storyboard real.

		game.storyboards.append(sb);

		return true;
	},

	/*
	método que añade un guest a un juego.
	uid: id del juego.
	guest: jugador que se añadirá como guest.
	returns: true si se pudo añadir al jugador al juego, mensaje de error de modo contrario.
	*/
/*	addGuest: (uid, guest) => {

		if(uid === undefined || uid === null || guest ===undefined || guest ===null){
			return "invalid param";
		}

		let game = GameLogic.get(uid);

		if(game === null){
			return "game not found";
		}

		//verificar que winner es un jugador real.
		if(ul.get(winner.uid) === null){
			return "user not found";
		}

		game.guests.append(guest);

		return true;
	}
};*/

module.exports = router;