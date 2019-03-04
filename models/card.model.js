const filename = '../data/card.json'
let cards = require(filename)
const filenameToWrite = './data/card.json'
const fs = require('fs')

//GET ALL CARDS
function getCards(){
	return new Promise((resolve, reject) => {
        if (cards.length === 0) {
            reject({
                message: 'no cards available',
                status: 202
            })
        }

        resolve(cards)
    })
}

//GET SINGLE CARD BY ID
function getCardById(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(cards, id)
        .then(card => resolve(card))
        .catch(err => reject(err))
    })
}

//CREATE SINGLE CARD
function createCard(newCard) {
    return new Promise((resolve, reject) => {
        const newID = getNewId(cards) 
        newCard.id = newID
        cards.push(newCard)
        writeJSONFile(filenameToWrite, cards)
        resolve(newCard)
    })
}

//UPDATE SINGLE CARD
function updateCard(id, newCard) {
    return new Promise((resolve, reject) => {
        mustBeInArray(cards, id)
        .then(card => {
            card.imageURL = newCard.imageURL
            card.timestamp = newCard.timestamp
            card.text = newCard.text
            writeJSONFile(filenameToWrite, cards)
            resolve(card)
        })
        .catch(err => reject(err))
    })
}

//DELETE SINGLE CARD
function deleteCard(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(cards, id)
        .then(() => {
            cards = cards.filter(p => p.id != id)
            rearrangeIDs(cards)
            writeJSONFile(filenameToWrite, cards)
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
    getCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard
}