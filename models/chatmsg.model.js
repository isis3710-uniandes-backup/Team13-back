const filename = '../data/chatmsg.json'
let chatmsgs = require(filename)
const filenameToWrite = './data/chatmsg.json'
const fs = require('fs')

//GET ALL CHAT MESSAGES
function getChatMessages(){
	return new Promise((resolve, reject) => {
        if (chatmsgs.length === 0) {
            reject({
                message: 'no chat messages available',
                status: 202
            })
        }

        resolve(chatmsgs)
    })
}

//GET SINGLE CHAT MESSAGE BY ID
function getChatMsgById(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(chatmsgs, id)
        .then(chatmsg => resolve(chatmsg))
        .catch(err => reject(err))
    })
}

//CREATE SINGLE CHAT MESSAGE
function createChatMessage(newChatMsg) {
    return new Promise((resolve, reject) => {
        const newID = getNewId(chatmsgs) 
        newChatMsg.id = newID
        chatmsgs.push(newChatMsg)
        writeJSONFile(filenameToWrite, chatmsgs)
        resolve(newChatMsg)
    })
}

//UPDATE SINGLE CHAT MESSAGE
function updateChatMessage(id, newChatMsg) {
    return new Promise((resolve, reject) => {
        mustBeInArray(chatmsgs, id)
        .then(chatmsg => {
            chatmsg.timestamp = newChatMsg.timestamp
            chatmsg.text = newChatMsg.text
            writeJSONFile(filenameToWrite, chatmsgs)
            resolve(chatmsg)
        })
        .catch(err => reject(err))
    })
}

//DELETE SINGLE CHAT MESSAGE
function deleteChatMessage(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(chatmsgs, id)
        .then(() => {
            chatmsgs = chatmsgs.filter(p => p.id != id)
            rearrangeIDs(chatmsgs)
            writeJSONFile(filenameToWrite, chatmsgs)
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
    getChatMessages,
    getChatMsgById,
    createChatMessage,
    updateChatMessage,
    deleteChatMessage
}