const filename = '../data/user.json'
let users = require(filename)
const filenameToWrite = './data/user.json'
const fs = require('fs')
const dbConn = require("../database/user.database.js");

//LOGIN
//function login(){
//
//}

//GET ALL USERS
function getUsers(){
	return new Promise((resolve, reject) => {
        dbConn.connect( (client, collection) => {
            collection.find({}).toArray(function(errDatabase, docs) {
                
                if(errDatabase!==null)
                    console.log("Error while getting the collection", errDatabase);
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
            collection.find({"id": parseInt(id)}).toArray(function(errDatabase, docs){
                if(errDatabase!==null)
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
        dbConn.connect((client, collection) =>{
            collection.replaceOne({"id": parseInt(id)}, newUser).then((err)=>{
                if(err.result.nModified === 0){
                    reject({message: "Id not found"});
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
            collection.deleteOne({"id": parseInt(id)}).then(() => {
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
    deleteUser
}