const filename = '../data/gametype.json'
let gametypes = require(filename)
const filenameToWrite = './data/gametype.json'
const fs = require('fs')

//GET ALL GAME TYPES
function getGameTypes(){
	return new Promise((resolve, reject) => {
        if (gametypes.length === 0) {
            reject({
                message: 'no game types available',
                status: 202
            })
        }

        resolve(gametypes)
    })
}

//GET SINGLE GAME TYPE BY ID
function getGameTypeById(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(gametypes, id)
        .then(gametype => resolve(gametype))
        .catch(err => reject(err))
    })
}

//CREATE SINGLE GAME TYPE
function createGameType(newGameType) {
    return new Promise((resolve, reject) => {
        const newID = getNewId(gametypes) 
        newGameType.id = newID
        gametypes.push(newGameType)
        writeJSONFile(filenameToWrite, gametypes)
        resolve(newGameType)
    })
}

//UPDATE SINGLE GAME TYPE
function updateGameType(id, newGameType) {
    return new Promise((resolve, reject) => {
        mustBeInArray(gametypes, id)
        .then(gametype => {
            gametype.name = newGameType.name
            gametype.description = newGameType.description
            gametype.logoURL = newGameType.logoURL
            gametype.timelimit = newGameType.timelimit
            writeJSONFile(filenameToWrite, gametypes)
            resolve(gametype)
        })
        .catch(err => reject(err))
    })
}

//DELETE SINGLE GAME TYPE
function deleteGameType(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(gametypes, id)
        .then(() => {
            gametypes = gametypes.filter(p => p.id != id)
            rearrangeIDs(gametypes)
            writeJSONFile(filenameToWrite, gametypes)
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
    getGameTypes,
    getGameTypeById,
    createGameType,
    updateGameType,
    deleteGameType
}