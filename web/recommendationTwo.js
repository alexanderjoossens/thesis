import {vector_user_1, vector_user_2, recommendationDoneTwo, afterDBcheck, getData, renderuser1ready} from "./index.js"
import {insertRecSongDataToDB, db, globalVector2state, globalVector1, globalVector2, currentUser, currentCode, currentVector} from './database_functionality.js'
import {getTop3CharacteristicsTwo, top3ValuesTwo, top3characteristicsIndicesTwo, top3characteristicsNamesTwo} from './vector.js'
export {recommendationSongsTwo, finalTrackIdListTwo}


let recTracksATwo = []
let recTracksBTwo = []
let recoSongIDsA = []
let recoSongIDsB = []
let nb_final_songsTwo = 20
let combined_users_vectorTwo = []
let combined_characteristicsTwo = []
let recTracksAcharacteristicsTwo = []
let recTracksBcharacteristicsTwo = []
let recommendationSongsTwo = []
let finalTrackIdListTwo = []

export async function getCombinedRecTracksTwo(code) {
    // remove old lists
    recTracksATwo = []
    recTracksBTwo = []
    recoSongIDsA = []
    recoSongIDsB = []
    combined_users_vectorTwo = []
    combined_characteristicsTwo = []
    recTracksAcharacteristicsTwo = []
    recTracksBcharacteristicsTwo = []
    recommendationSongsTwo = []
    finalTrackIdListTwo = []

    // first get both uservectors
    // then combine these into 1 vector and save the most overlapping characteristics
    // then get recommendedsongs from both users
    // then get the most overlapping recommended songs based on the combined vector

    // get top3 most similar characteristics
    // put it in variables: top3Values,
    //       top3characteristicsIndicesTwo and top3characteristicsNamesTwo
    getTop3CharacteristicsTwo(vector_user_1, vector_user_2)

    // get recTracksA and recTracksB from Database
    getRecTracksFromDBTwo('a',code)
    getRecTracksFromDBTwo('b',code)

    console.log('timeout of 3sec to go to getCombinedRecTracksTwo2')
    setTimeout(getCombinedRecTracksTwo2, 3000)
}


function getCombinedRecTracksTwo2() {

    // get combined characteristics from recTracksA and recTracksB
    // put it in variables recTracksAcharacteristicsTwo and recTracksBcharacteristicsTwo
    getCharacteristicsFromRecTracksTwo()

    console.log('timeout of 3sec to go to getCombinedRecTracksTwo3')
    setTimeout(getCombinedRecTracksTwo3, 3000)
}

// gets the recommended songs for the users and their names and artist names
async function getCombinedRecTracksTwo3() {
    getFinalRecSongsWithTop3CharacteristicsTwo(top3characteristicsIndicesTwo, top3ValuesTwo, recTracksAcharacteristicsTwo, recTracksBcharacteristicsTwo, 
        recTracksAcharacteristicsTwo, recTracksBcharacteristicsTwo)

}

// fill out recTracksATwo and recTracksBTwo
export async function getRecTracksFromDBTwo(user, code) {
    let sql3 = ""
    if (user == 'a') {
        sql3 = "SELECT recTracksA FROM spotify_table4 WHERE code = '"+code.toString()+"'";
    }
    else {
        sql3 = "SELECT recTracksB FROM spotify_table4 WHERE code = '"+code.toString()+"'";
    }
    let regex = /\\/g;
    let query = db.query(sql3,(err,retreivedData)=>{
        if (err) throw err;
        if (user == 'a') {
            recTracksATwo = JSON.parse(retreivedData[0].recTracksA);
        }
        else {
            recTracksBTwo = JSON.parse(retreivedData[0].recTracksB);
        }
    });

}

// get the song characteristics of the two recommended track lists
async function getCharacteristicsFromRecTracksTwo() {

    let recTracksALengthTwo = Object.keys(recTracksATwo).length;
    for (let i=0;i<recTracksALengthTwo;i++) {
        recoSongIDsA.push(JSON.parse(recTracksATwo[i.toString()])["id"])
    }
    let recTracksBLengthTwo = Object.keys(recTracksBTwo).length;
    for (let i=0;i<recTracksBLengthTwo;i++) {
        recoSongIDsB.push(JSON.parse(recTracksBTwo[i.toString()])["id"])
    }

    recTracksAcharacteristicsTwo = []
    recTracksBcharacteristicsTwo = []

    for (var trackID of recoSongIDsA) {
        var trackData = await getData("/audio-features/"+trackID)
        // characteristics: acousticness, danceability, energy, loudness, mode, 
        // speechiness, instrumentalness, liveness, tempo, duration_ms, time_signature
        recTracksAcharacteristicsTwo.push
            ([trackData.acousticness, trackData.danceability, trackData.energy,
                trackData.loudness, trackData.mode, trackData.speechiness,
                trackData.instrumentalness, trackData.liveness, trackData.tempo,
                trackData.duration_ms, trackData.time_signature])
    }
    for (var trackID of recoSongIDsB) {
        var trackData = await getData("/audio-features/"+trackID)
        // characteristics: acousticness, danceability, energy, loudness, mode, 
        // speechiness, instrumentalness, liveness, tempo, duration_ms, time_signature
        recTracksBcharacteristicsTwo.push
            ([trackData.acousticness, trackData.danceability, trackData.energy,
                trackData.loudness, trackData.mode, trackData.speechiness,
                trackData.instrumentalness, trackData.liveness, trackData.tempo,
                trackData.duration_ms, trackData.time_signature])
    }
}

// combine recTracksA and recTracksB with focus on the top 3 characteristics
function getFinalRecSongsWithTop3CharacteristicsTwo(top3characteristicsIndicesTwo, top3ValuesTwo, recTracksACharacteristicsTwo, recTracksBCharacteristicsTwo) {
    // select the songs where the top 3 characteristics are the closest to the top3ValuesTwo
    let allDiffs = []
    for (var i = 0; i < recTracksAcharacteristicsTwo.length; i++) {
        // current_3 contains the values of the top 3 characteristics of the current song
        let current_3 = []
        for (var j = 0; j < 3; j++) {
            //console.log('recTracksAcharacteristicsTwo[i]', recTracksAcharacteristicsTwo[i])
            //console.log('recTracksAcharacteristicsTwo[i][top3characteristicsIndicesTwo[j]]', recTracksAcharacteristicsTwo[i][top3characteristicsIndicesTwo[j]])
            current_3.push(recTracksAcharacteristicsTwo[i][top3characteristicsIndicesTwo[j]])
        }
        let diff = 0
        for (var k = 0; k < 3; k++) {
            diff += Math.abs(current_3[k] - top3ValuesTwo[k])
        }
        // allDiffs contains the differences between the top 3 characteristics of the current song and the top 3 goal values
        allDiffs.push(diff)
    }
    for (var i = 0; i < recTracksBcharacteristicsTwo.length; i++) {
        let current_3 = []
        for (var j = 0; j < 3; j++) {
            current_3.push(recTracksBcharacteristicsTwo[i][top3characteristicsIndicesTwo[j]])
        }
        let diff = 0
        for (var k = 0; k < 3; k++) {
            diff += Math.abs(current_3[k] - top3ValuesTwo[k])
        }
        allDiffs.push(diff)
    }

    // get indices from the smallest X diffs (X is nb_final_songsTwo)
    let smallestDiffsIndices = []
    for (var l = 0; l < nb_final_songsTwo; l++) {
        let min = Math.min(...allDiffs)
        let index = allDiffs.indexOf(min)
        smallestDiffsIndices.push(index)
        allDiffs[index] = 99999999
    }

    // finalRecSongsTwo are the songs with these smallest Diffs Indices
    console.log('smallestDiffsIndices.length: ', smallestDiffsIndices.length)
    for (var m = 0; m < smallestDiffsIndices.length; m++) {
        let recTracksALength = Object.keys(recTracksATwo).length
        //console.log('recTracksATwo: ',recTracksATwo)
	//console.log('recTracksALength: ', recTracksALength)
        //console.log('typeof recTracksATwo: ', typeof recTracksATwo)
        //console.log('smallestDiffsIndices: ', smallestDiffsIndices)
	if (smallestDiffsIndices[m] < recTracksALength) {
	    console.log('smallestDiffsIndices[m]: ', smallestDiffsIndices[m])
            var song = Object.values(recTracksATwo)[smallestDiffsIndices[m]]; // smallestDiffsIndices[m] if
            song = JSON.parse(song)
            recommendationSongsTwo.push(song)
            finalTrackIdListTwo.push(song["id"])
        }
        else {
            var song = Object.values(recTracksBTwo)[smallestDiffsIndices[m] - recTracksALength];
            console.log('smallestDiffsIndices[m]: ', smallestDiffsIndices[m])
	    console.log('smallestDiffsIndices[m] - recTracksALength: ', smallestDiffsIndices[m] - recTracksALength)
	    song = JSON.parse(song) //at position smallestDiffsIndices[m]-recTracksALength else
            recommendationSongsTwo.push(song)
            finalTrackIdListTwo.push(song["id"])
        }
    }

    // shuffle two lists in the same way
    let shuffled = shuffle2lists(recommendationSongsTwo, finalTrackIdListTwo)
    recommendationSongsTwo = shuffled[0]
    finalTrackIdListTwo = shuffled[1]

    // replace &quot; out of names recommendationSongsTwo[0].name back to '
    for (var i = 0; i < recommendationSongsTwo.length; i++) {
        let name = recommendationSongsTwo[i].name
        name = name.replace(/&quot;/g, "'")
        recommendationSongsTwo[i].name = name
    }

    console.log('timeout of 3sec to go to recommendationDoneTwo')
    setTimeout(recommendationDoneTwo, 3000);
}

// shuffle two lists in the same way
function shuffle2lists(list1, list2) {
    var list1 = list1.slice(0);
    var list2 = list2.slice(0);
    var list1Shuffled = [];
    var list2Shuffled = [];
    while (list1.length > 0) {
        var randomIndex = Math.floor(Math.random() * list1.length);
        list1Shuffled.push(list1[randomIndex]);
        list2Shuffled.push(list2[randomIndex]);
        list1.splice(randomIndex, 1);
        list2.splice(randomIndex, 1);
    }
    return [list1Shuffled, list2Shuffled];
}


