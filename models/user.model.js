const filename = '../data/user.json'
let users = require(filename)
const filenameToWrite = './data/user.json'
const fs = require('fs')

//GET ALL USERS
function getUsers(){
	return new Promise((resolve, reject) => {
        if (users.length === 0) {
            reject({
                message: 'no users available',
                status: 202
            })
        }

        resolve(users)
    })
}

//GET SINGLE USER BY ID
function getUserById(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(users, id)
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
}

//CREATE SINGLE USER
function createUser(newUser) {
    return new Promise((resolve, reject) => {
        const newID = getNewId(users) 
        newUser.id = newID
        users.push(newUser)
        writeJSONFile(filenameToWrite, users)
        resolve(newUser)
    })
}

//UPDATE SINGLE USER
function updateUser(id, newUser) {
    return new Promise((resolve, reject) => {
        mustBeInArray(users, id)
        .then(user => {
            user.nickname = newUser.nickname
            user.fullname = newUser.fullname
            user.score = newUser.score
            user.level = newUser.level
            user.isloggedin = newUser.isloggedin
            writeJSONFile(filenameToWrite, users)
            resolve(user)
        })
        .catch(err => reject(err))
    })
}

//DELETE SINGLE USER
function deleteUser(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(users, id)
        .then(() => {
            users = users.filter(p => p.id != id)
            rearrangeIDs(users)
            writeJSONFile(filenameToWrite, users)
            resolve()
        })
        .catch(err => reject(err))
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

function mustBeInArray(array, id){
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'ID is not good',
                status: 404
            })
        }
        resolve(row)
    })
}

function rearrangeIDs(array){
    let count = 1;
    for(let i of array){
        i.id = count;
        count++;
    }
}

function writeJSONFile(filename, content) {
    fs.writeFile(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}


//EXPORTS THAT WILL BE USED IN EXPRESS ROUTING-----------------------------------------------
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}