const filename = '../data/chat.json'
let chats = require(filename)
const filenameToWrite = './data/chat.json'
const fs = require('fs')

//GET ALL CHATS
function getChats(){
	return new Promise((resolve, reject) => {
        if (chats.length === 0) {
            reject({
                message: 'no chats available',
                status: 202
            })
        }

        resolve(chats)
    })
}

//GET SINGLE CHAT BY ID
function getChatById(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(chats, id)
        .then(chat => resolve(chat))
        .catch(err => reject(err))
    })
}

//CREATE SINGLE CHAT
function createChat(newChat) {
    return new Promise((resolve, reject) => {
        const newID = getNewId(chats) 
        newChat.id = newID
        chats.push(newChat)
        writeJSONFile(filenameToWrite, chats)
        resolve(newChat)
    })
}

//UPDATE SINGLE CHAT
function updateChat(id, newChat) {
    return new Promise((resolve, reject) => {
        mustBeInArray(chats, id)
        .then(chat => {
            chat.name = newChat.name
            chat.capacity = newChat.capacity
            writeJSONFile(filenameToWrite, chats)
            resolve(chat)
        })
        .catch(err => reject(err))
    })
}

//DELETE SINGLE CHAT
function deleteChat(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(chats, id)
        .then(() => {
            chats = chats.filter(p => p.id != id)
            rearrangeIDs(chats)
            writeJSONFile(filenameToWrite, chats)
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
    getChats,
    getChatById,
    createChat,
    updateChat,
    deleteChat
}