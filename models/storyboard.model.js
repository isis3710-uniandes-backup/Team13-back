const filename = '../data/storyboard.json'
let storyboards = require(filename)
let cards = require('../data/card.json')
const filenameToWrite2 = './data/card.json'
const filenameToWrite = './data/storyboard.json'
const fs = require('fs')

//GET ALL STORYBOARDS
function getStoryboards(){
	return new Promise((resolve, reject) => {
        resolve(storyboards)
    })
}

//GET SINGLE STORYBOARD BY ID
function getStoryboardById(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(storyboards, id)
        .then(storyboard => resolve(storyboard))
        .catch(err => reject(err))
    })
}

//CREATE SINGLE STORYBOARD
function createStoryboard(newStoryboard) {
    return new Promise((resolve, reject) => {
        const newID = getNewId(storyboards) 
        newStoryboard.id = newID
        storyboards.push(newStoryboard)
        writeJSONFile(filenameToWrite, storyboards)
        resolve(newStoryboard)
    })
}

//UPDATE SINGLE STORYBOARD
function updateStoryboard(id, newStoryboard) {
    return new Promise((resolve, reject) => {
        mustBeInArray(storyboards, id)
        .then(storyboard => {
            storyboard.timestamp = newStoryboard.timestamp
            storyboard.title = newStoryboard.title
            writeJSONFile(filenameToWrite, storyboards)
            resolve(storyboard)
        })
        .catch(err => reject(err))
    })
}

//DELETE SINGLE STORYBOARD AND ALL CARDS FROM IT
function deleteStoryboard(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(storyboards, id)
        .then(() => {
            storyboards = storyboards.filter(p => p.id != id)
            cards = cards.filter(p => p.storyboardId != id)
            rearrangeIDs(storyboards)
            rearrangeIDs(cards)
            rearrangeCardIDs(cards)
            writeJSONFile(filenameToWrite, storyboards)
            writeJSONFile(filenameToWrite2, cards)
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

function rearrangeCardIDs(array){
    for(let i of array){
        if(i.storyboardId > 1){
            i.storyboardId = i.storyboardId-1;
        }
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
    getStoryboards,
    getStoryboardById,
    createStoryboard,
    updateStoryboard,
    deleteStoryboard
}