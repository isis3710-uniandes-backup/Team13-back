const filename = '../data/game.json'
let games = require(filename)
const filenameToWrite = './data/game.json'
const fs = require('fs')

//GET ALL GAMES
function getGames(){
	return new Promise((resolve, reject) => {
        if (games.length === 0) {
            reject({
                message: 'no games available',
                status: 202
            })
        }

        resolve(games)
    })
}

//GET SINGLE GAME BY ID
function getGameById(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(games, id)
        .then(game => resolve(game))
        .catch(err => reject(err))
    })
}

//CREATE SINGLE GAME
function createGame(newGame) {
    return new Promise((resolve, reject) => {
        const newID = getNewId(games) 
        newGame.id = newID
        games.push(newGame)
        writeJSONFile(filenameToWrite, games)
        resolve(newGame)
    })
}

//UPDATE SINGLE GAME
function updateGame(id, newGame) {
    return new Promise((resolve, reject) => {
        mustBeInArray(games, id)
        .then(game => {
            game.timestampinit = newGame.timestampinit
            game.timestampend = newGame.timestampend
            game.isActive = newGame.isActive
            writeJSONFile(filenameToWrite, games)
            resolve(game)
        })
        .catch(err => reject(err))
    })
}

//DELETE SINGLE GAME
function deleteGame(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(games, id)
        .then(() => {
            games = games.filter(p => p.id != id)
            rearrangeIDs(games)
            writeJSONFile(filenameToWrite, games)
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
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}