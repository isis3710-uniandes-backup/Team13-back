const filename = '../data/comment.json'
let comments = require(filename)
const filenameToWrite = './data/comment.json'
const fs = require('fs')

//GET ALL COMMENTS
function getComments(){
	return new Promise((resolve, reject) => {
        resolve(comments)
    })
}

//GET SINGLE COMMENT BY ID
function getCommentById(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(comments, id)
        .then(comment => resolve(comment))
        .catch(err => reject(err))
    })
}

//CREATE SINGLE COMMENT
function createComment(newComment) {
    return new Promise((resolve, reject) => {
        const newID = getNewId(comments) 
        newComment.id = newID
        comments.push(newComment)
        writeJSONFile(filenameToWrite, comments)
        resolve(newComment)
    })
}

//UPDATE SINGLE COMMENT
function updateComment(id, newComment) {
    return new Promise((resolve, reject) => {
        mustBeInArray(comments, id)
        .then(comment => {
            comment.text = newComment.text
            comment.timestamp = newComment.timestamp
            writeJSONFile(filenameToWrite, comments)
            resolve(comment)
        })
        .catch(err => reject(err))
    })
}

//DELETE SINGLE COMMENT
function deleteComment(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(comments, id)
        .then(() => {
            comments = comments.filter(p => p.id != id)
            rearrangeIDs(comments)
            writeJSONFile(filenameToWrite, comments)
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
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}