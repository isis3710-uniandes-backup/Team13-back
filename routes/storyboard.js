let express = require('express');
let router = express.Router();
let fs = require('fs');
let uFile = require("../public/jsons/user.json");

//ás adelante se debe reemplazar por una conexión al a BD.
//No se le incluye contraseña a los usuarios, puesto que esta autenticación se piensa manejar con
//auth0.
var uid = 1

/*	users: [
		{	
			nickname: "FelipeV",
			uid: 0,
			score: 0,
			level: 1,
			loggedIn: false,
			email: "f.velasquez@uniandes.edu.co",

			//TODO, estos y (sus métodos (add achievement, etc...)?)
			achievements: [],
			pastGames: [],
			currentGame: null,
			storyboards: [],
			chats: []
		}
	],*/

/*
Recibe por parámetro un nickname de un usuario y retorna el objeto usuario correspondiente o null si no existe.
nickname: nickname del usuario, correspondiente a su nickname 
returns: objeto usuario o null si no se encontró un usuario con ese nickname
*/
router.get("/", (req, res) => {

	let nickname = req.param("nickname");

	if(nickname !== undefined && nickname != null){
		//En el futuro, esto se deberá cambiar por una función que busque en la base de datos.
		//Preferiblemente en otro módulo (para mantener lógica separado de acceso a datos).
		let user = users.find( u => {
			return u.nickname === nickname;
		});

		if (nickname === undefined){
			res.status(404);
			res.send("user not found");
		}
		else{
			res.send(gt);
		}
	}
	else{
		res.send(uFile);
	}

	
});


	/*
	Recibe por parámetro un id de un usuario y retorna el objeto usuario correspondiente o null si no existe.
	uid: uid del usuario
	returns: objeto usuario o null si no se encontró un usuario con ese id
	*/
/*	getById(): (uid) => {
		if(uid === undefined || uid === null){
			return "invalid param";
		}

		//En el futuro, esto se deberá cambiar por una función que busque en la base de datos.
		//Preferiblemente en otro módulo (para mantener lógica separado de acceso a datos).
		let user = users.find( u => {
			return u.uid === uid;
		});

		return (user === undefined)? null : user;
	},

/*
Método que permite añadir a la base de datos un usuario. Retorna false si el correo ingresado 
	no es correcto, o si el nickname ya se encuentra registrado.
user: objeto usuario. Debe contener como mínimo nickname e email. score, lebel y loggedIn se 
	inicializan con valores por defecto. Cualquier otro atributo se ignorará.
returns el objeto creado si el usuario se puedo añadir, string de error de modo contrario
*/
router.post('/', (req, res) => {

	let user = req.body;
		
	if(user.nickname === undefined || user.email === undefined 
		|| user.nickname === null || user.email === null){
		return "missing information";
	}

	let u = uFile.find( g => {
		return g.nickname == user.nickname;
	});
	if(u !== undefined){
		res.send("nickname already exists");
		return;
	}
	if(!validateEmail(user.email)){
		res.send("invalid email");
		return;
	}

	//Esto deberá reemplazarse por una inserción a BD más adelante.
	let newU = {
		nickname: user.nickname,
		//id debería ser autogenerado por BD
		uid: uid++,
		score: 0,
		level: 1, 
		loggedIn: false,
		email: user.email,
		achievements: [],
		pastGames: [],
		currentGame: null,
		storyboards: [],
		chats: []
	};

	uFile.push(newU);

	fs.writeFile("./public/jsons/user.json", JSON.stringify(uFile), (err, result) => {
   		if(err) console.log('error', err);
	});

	res.send(newU);
});


/*
Modifica un usuario existente, cambiando su correo y estado de login.
Params: objeto usuario con los nuevos valores.
return, mensaje de error si no se pudo añadir, usuario modificado de modo contrario.
*/
router.put("/", (req, res) =>{

	let user = req.body;
		
	if(user.nickname === undefined || user.email === undefined || user.nickname === null || user.email === null){
			return "missing information";
	}

	let u = uFile.find( g => {
		return g.nickname == user.nickname;
	});

	if(u === undefined){
		res.status(404);
		res.send("user not found");
		return;
	}
	if(!validateEmail(user.email)){
		res.status(400);
		res.send("invalid email");
		return;
	}

	//Por ahora, no se permite modificaciones de niveles, o puntaje. Puesto que esto son eventeos 
	//que se generan tras terminar juegos.
	//el nickname e id son inmutables.

	u.email = user.email;
	u.loggedIn = user.loggedIn;

	fs.writeFile("./public/jsons/user.json", JSON.stringify(uFile), (err, result) => {
   		if(err) console.log('error', err);
	});

	res.send(u);

});
/*
	Elimina el usuario dueño del id dado (ojo: id, no nickname)
	retorna error si no se encontró el usuario. true de modo contrario.
*/
router.delete("/", (req, res)=>{

	let uid = req.param("id");

	if(uid === undefined || uid === null){
		res.status(400);
		res.send("invalid param");
		return;
	}

	let user = uFile.find( g => {
		return g.nickname == uid;
	});

	if(user === null){
		res.status(404);
		res.send("user not found");
		return; 
	}

	uFile.splice(uFile.indexOf(user), 1);

	fs.writeFile("./public/jsons/user.json", JSON.stringify(uFile), (err, result) => {
   		if(err) console.log('error', err);
	});

	res.send(true);
}); 

	/*
	Suma un número dado al puntaje de un usuario.
	uid: uid del usuario,
	score: puntaje que se sumará,
	returns: mensaje de error si no fue posible sumarlo, objeto usuario con el 
		nuevo puntaje de modo contrario.
	*/
/*	addScore: (uid, score) =>{
		if(uid === undefined || uid === null){
			return "invalid param";
		}

		let user = UserLogic.getById(uid);

		if(user === null){
			return "user not found";
		}

		user.score += score;

		return user;
	},

	/*
	Aumenta a un usuario dado un nivel.
	returns mensaje de error si no fue posible aumentar el nivel,
		el objeto usuario con el nivel aumentado si sí fue posible.
	*/
/*	advanceLevel: (uid) => {
		
		if(uid === undefined || uid === null){
			return "invalid param";
		}

		let user = UserLogic.getById(uid);

		if(user === null){
			return "user not found";
		}

		user.level++;

		return user;
	},*/

	//función tomada de https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
var validateEmail= (email)  => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


module.exports = router;