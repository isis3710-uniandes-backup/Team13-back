const dbConn = require("../database/user.database.js");
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

//LOGIN
//password debe ser el hash md5 de la contraseña. PASSWORD NO DEBE VIAJAR EN TEXTO PLANO.
function login(username, password) {

    return new Promise((resolve, reject) => {
        if (username && password) {

            //Busca el usuario con el username especificado
            dbConn.connect((client, collection) => {
                collection.find({ "nickname": username }).toArray((errDatabase, docs) => {
                    if (errDatabase !== null) {
                        console.log("Error while getting the collection", errDatabase);
                        reject(errDatabase);
                        return;
                    }
                    if (docs.length < 1) {
                        reject({
                            message: 'Username already taken'
                        });
                        return;
                    }
                    if (docs.length > 1) {
                        console.log("REPEATED USERNAME");
                        reject({ message: "repeatedUsername" });
                        return;
                    }

                    user = docs[0];

                    if (user.password === password) {
                        let token = jwt.sign({ username: username },
                            config.secret, { expiresIn: '2h' });

                        user.isLoggedin = true;

                        collection.replaceOne({ "id": parseInt(user.id) }, user).then((err) => {
                            if (err.result.nModified === 0) {
                                reject({ message: "Id not found" });
                                return;
                            }
                        });

                        resolve({
                            message: 'Authentication successful!',
                            token: token,
                            user: user
                        });

                    } else {
                        reject({
                            message: 'Incorrect username or password!'
                        });
                    }
                });
            });
        }

    });

}

//REGISTER
//Contraseña debe entrar como un md5
function register(nickname, password) {

    return new Promise((resolve, reject) => {
        console.log(nickname);
        console.log(password);
        if (nickname && password) {
            //Comprobar que no exista otro usuario con el mismo nickname
            dbConn.connect((client, collection) => {
                collection.find({ "nickname": nickname }).toArray(function(errDatabase, docs) {

                    if(docs.length>0){
                        reject({message: "Missing nickname or password"});
                        return;
                    }
                    getUsers().then( (u) => {
                       newUser = {
                            "nickname": nickname,
                            "password": password,
                            "id": getNewId(u),
                            "isLoggedin": false 
                        };

                        createUser(newUser).then(resolve).catch(reject);

                    })
                    

                });
            });
        }
        else{
            reject({message: "Missing nickname or password"});
        }
    });
}

function logout(){

}

//GET ALL USERS
function getUsers() {
    return new Promise((resolve, reject) => {
        dbConn.connect((client, collection) => {
            collection.find({}).toArray(function(errDatabase, docs) {

                if (errDatabase !== null) {
                    console.log("Error while getting the collection", errDatabase);
                    reject(errDatabase);
                    return;
                }
                resolve(docs);
                client.close();
            })
        });
    });
}

//GET SINGLE USER BY ID
function getUserById(id) {
    return new Promise((resolve, reject) => {
        dbConn.connect((client, collection) => {
            collection.find({ "id": parseInt(id) }).toArray(function(errDatabase, docs) {
                if (errDatabase !== null)
                    console.log("Error while getting the collection", errDatabase);
                resolve(docs);
                client.close();
            });
        });
    })
}

//CREATE SINGLE USER
function createUser(newUser) {
    return new Promise((resolve, reject) => {
        getUsers().then((u) => {

            newUser.id = getNewId(u);

            dbConn.connect((client, collection) => {
                collection.insert(newUser).then(() => {
                    resolve(newUser);
                });
            });
        });
    })
}

//UPDATE SINGLE USER
function updateUser(id, newUser) {
    return new Promise((resolve, reject) => {
        newUser.id = parseInt(id);
        dbConn.connect((client, collection) => {
            collection.replaceOne({ "id": parseInt(id) }, newUser).then((err) => {
                if (err.result.nModified === 0) {
                    reject({ message: "Id not found" });
                    return;
                }
                resolve(newUser);
            });
        });
    });
}

//DELETE SINGLE USER
function deleteUser(id) {
    return new Promise((resolve, reject) => {

        dbConn.connect((client, collection) => {
            collection.deleteOne({ "id": parseInt(id) }).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    })
}

//USEFUL FUNCTIONS ---------------------------------------------------------------

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}


//EXPORTS THAT WILL BE USED IN EXPRESS ROUTING-----------------------------------------------
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    register
}