const filename = '../data/achievements.json'
let ach = require(filename)
const filenameToWrite = './data/achievements.json'
const fs = require('fs')

//GET ALL ACHIEVEMENTS
function getAchievements(){
	return new Promise((resolve, reject) => {
        if (ach.length === 0) {
            reject({
                message: 'no achievements available',
                status: 202
            })
        }

        resolve(ach)
    })
}

//GET SINGLE ACHIEVEMENT BY ID
function getAchievementById(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(ach, id)
        .then(achievement => resolve(achievement))
        .catch(err => reject(err))
    })
}

//CREATE SINGLE ACHIEVEMENT
function createAchievement(newAch) {
    return new Promise((resolve, reject) => {
        const newID = getNewId(ach) 
        newAch.id = newID
        ach.push(newAch)
        writeJSONFile(filenameToWrite, ach)
        resolve(newAch)
    })
}

//UPDATE SINGLE ACHIEVEMENT
function updateAchievement(id, newAch) {
    return new Promise((resolve, reject) => {
        mustBeInArray(ach, id)
        .then(achievement => {
            achievement.name = newAch.name
            achievement.description = newAch.description
            achievement.logoURL = newAch.logoURL
            achievement.isReward = newAch.isReward
            writeJSONFile(filenameToWrite, ach)
            resolve(achievement)
        })
        .catch(err => reject(err))
    })
}

//DELETE SINGLE ACHIEVEMENT
function deleteAchievement(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(ach, id)
        .then(() => {
            ach = ach.filter(p => p.id != id)
            rearrangeIDs(ach)
            writeJSONFile(filenameToWrite, ach)
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

const newDate = () => new Date().toString()

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
    getAchievements,
    getAchievementById,
    createAchievement,
    updateAchievement,
    deleteAchievement
}