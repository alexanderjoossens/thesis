import {vector_user_1, vector_user_2, recommendationDoneOne, recommendationDoneTwo, afterDBcheck, getData, renderuser1ready} from "./index.js"
import {insertRecSongDataToDB, db, globalVector2state, globalVector1, globalVector2, currentUser, currentCode, currentVector} from './database_functionality.js'
import {getTop3CharacteristicsTwo, top3ValuesTwo, top3characteristicsIndicesTwo, top3characteristicsNamesTwo} from './vector.js'
export{finalTrackIdList, recommendationSongs,recommendationSongNames,recommendationArtistNames}

let recTrackTitlesA = []
let recTrackTitlesB = []
let recoSongIDs = []
let recoSongIDsA = []
let recoSongIDsB = []
let tracksA = []
let tracksB = []
let artistsA = []
let artistsB = []
let mutualTracks = []
let mutualArtists = []
let mutualGenres = []
let mutualRecTracks = []
let codeHere = ''
let finalTrackIdList = []   
let nb_final_songs = 20
let tracksWithSameArtist = []
let recommendationSongs = []
let recommendationSongNames = []
let recommendationArtistNames = []

export async function getCombinedRecTracksOne(code) {
    // remove old lists
    finalTrackIdList = []
    recommendationSongs = []
    recommendationSongNames = []
    recommendationArtistNames = []
    mutualTracks = []
    mutualArtists = []
    mutualGenres = []
    mutualRecTracks = []
    tracksWithSameArtist = []
    recoSongIDs = []
    recoSongIDsA = []
    recoSongIDsB = []

    getTop3CharacteristicsTwo(vector_user_1, vector_user_2)
    //console.log('in GetCombinedRecTracks with code: ', code);
    getMutualTracksOne(code)
    getMutualArtistSongsOne(code)
    getMutualRecTracksOne(code)
    console.log('timeout of 3sec to go to getCombinedRecTracksOne1')
    setTimeout(getCombinedRecTracksOne1, 3000)
}

function getCombinedRecTracksOne1() {
    // the more songs they selected, the longer it takes to check for mutual tracks and artists
    if (tracksA.length < 50) {
        console.log('timeout of ',5000,'sec to go to getCombinedRecTracks2')
        setTimeout(getCombinedRecTracksOne2, 5000)
    }
    else if (tracksA.length < 150) {
        console.log('timeout of ',15000,'sec to go to getCombinedRecTracks2')
        setTimeout(getCombinedRecTracksOne2, 15000)
    }
    else if (tracksA.length < 500) {
        console.log('timeout of ',23000,'sec to go to getCombinedRecTracks2')
        setTimeout(getCombinedRecTracksOne2, 23000)
    }
    else {
        console.log('timeout of ',33000,'sec to go to getCombinedRecTracks2')
        setTimeout(getCombinedRecTracksOne2, 33000)
    }
}

function getCombinedRecTracksOne2() {
    console.log('mutualTracks: ', mutualTracks)
    console.log('mutualArtists: ', mutualArtists)
    console.log('tracksWithSameArtist.length: ', tracksWithSameArtist.length)
    //console.log('mutualRecTracks: ', mutualRecTracks)
    //console.log('(mutual)recoSongIDs: ', recoSongIDs)
    // if more than 20 mutual songs, take the first 10

    finalTrackIdList = mutualTracks.slice(0,7)
    console.log('(met mutualTracks) finalTrackIdList: ', finalTrackIdList)

    if (tracksWithSameArtist.length + mutualTracks.length > nb_final_songs) {
        while (finalTrackIdList.length <= 14) {
            finalTrackIdList.push(tracksWithSameArtist[0])
            tracksWithSameArtist = tracksWithSameArtist.slice(1, 999)
        }
        console.log('(met tracksWithSameArtist) finalTrackIdList: ', finalTrackIdList)
    }
    else {
        for (var track of tracksWithSameArtist) {
            finalTrackIdList.push(track)
        }
        console.log('(met tracksWithSameArtist) finalTrackIdList: ', finalTrackIdList)
    }

    // if (finalTrackIdList.length < nb_final_songs) {
    //     while (finalTrackIdList.length <= 20) {
    //         if (recoSongIDs.length > 0) {
    //             finalTrackIdList.push(recoSongIDs[0])
    //             recoSongIDs = recoSongIDs.slice(1, 999)
    //         }
    //         else {
    //             break;
    //         }
    //     }
    //     console.log('(met recoSongIDs) finalTrackIdList: ', finalTrackIdList)
    // }

    // remove duplicates
    let indices_of_duplicates = []
    finalTrackIdList = finalTrackIdList.filter((element, index) => {
        if (finalTrackIdList.indexOf(element) !== index) {
            indices_of_duplicates.push(index)
        }
        return finalTrackIdList.indexOf(element) === index;
    });

    // if still not enough, add recoSongsA and recoSongsB
    if (finalTrackIdList.length < nb_final_songs) {
        console.log('recoSongIDsA: ', recoSongIDsA)
        console.log('recoSongIDsB: ', recoSongIDsB)
        console.log('recosongIDsA.length: ', recoSongIDsA.length)
        console.log('recosongIDsB.length: ', recoSongIDsB.length)
        recoSongIDsA = shuffle(recoSongIDsA)
        recoSongIDsB = shuffle(recoSongIDsB)
	// alternativly add recoSongsA and recoSongsB
        var i, l = Math.min(recoSongIDsA.length, recoSongIDsB.length);
        for (i = 0; i < l; i++) {
            // stop when finalTrackIdList has length 18 or 19
            if (finalTrackIdList.length > nb_final_songs-2) {
                break;
            }
            finalTrackIdList.push(recoSongIDsA[i], recoSongIDsB[i])
        }
        finalTrackIdList.push(...recoSongIDsA.slice(l), ...recoSongIDsB.slice(l));
    console.log('finalTrackIdList na alternate: ',finalTrackIdList)
    }
    finalTrackIdList = finalTrackIdList.slice(0, nb_final_songs)

    // remove duplicates again
    let indices_of_duplicates2 = []
    finalTrackIdList = finalTrackIdList.filter((element2, index2) => {
        if (finalTrackIdList.indexOf(element2) !== index2) {
            indices_of_duplicates2.push(index2)
        }
        return finalTrackIdList.indexOf(element2) === index2;
    });

    console.log('voor shuffle finalTrackIdList: ', finalTrackIdList)
    // shuffle the order of the finalTrackIdList
    finalTrackIdList = shuffle(finalTrackIdList)
    console.log('na shuffle: finalTrackIdList: ', finalTrackIdList)
    getCombinedRecTracksOne3(finalTrackIdList);
}

// gets the recommended songs for the users and their names and artist names
async function getCombinedRecTracksOne3(finalTrackIdList) {

    for (var track of finalTrackIdList) {
        if (track == undefined) {
          continue;
        }
        track = track.replaceAll('"','');
        let current_track = await getData("/tracks/"+track)
        if (current_track == undefined) {
            console.log('track from getData("/tracks/"+track) is undefined! with id: ',track)
            continue;
        }
        recommendationSongs.push(current_track)
        let current_track_name = current_track.name
        recommendationSongNames.push(current_track_name)
        //console.log('current_track', current_track)
        if (current_track.artists == undefined) {
            continue;
        }        
	let current_track_artist = current_track.artists[0].name
        recommendationArtistNames.push(current_track_artist)
        let current_track_artist_id = current_track.artists[0].id
        let current_track_name_artist = current_track_name + ' - ' + current_track_artist
    }
    for (var song of recommendationSongs) {
        if (song == undefined) {
            console.log('there is a recommendationSong that is undefined!')
        }
    }
    //console.log('recommendationSongs: (n printen te lang)')
    //console.log('recommendationSongNames: ', recommendationSongNames)
    //console.log('recommendationArtistNames: ', recommendationArtistNames)
    //console.log('timeout of 3sec to go to recommendationDoneOne')
    setTimeout(recommendationDoneOne, 3000);
}


function getMutualTracksOne(code) {
    tracksA = getTracksOne('a',code)
    tracksB = getTracksOne('b',code)
    codeHere = code
    setTimeout(getMutualTracksOne2,1000)
}

function getMutualTracksOne2() {
    mutualTracks = tracksA.filter(value => tracksB.includes(value));
}

function getMutualArtistSongsOne(code) {
    getMutualArtistsOne(code)
    setTimeout(getMutualArtistSongsOne2,2000)
}

async function getMutualArtistSongsOne2() {
    // remove duplicates
    mutualArtists = mutualArtists.filter((element, index) => {
        return mutualArtists.indexOf(element) === index;
    });

    for (var trackA of tracksA) {
        trackA = trackA.replaceAll('"','');
        let current_track = await getData("/tracks/"+trackA)
        if (current_track.artists == undefined) {
            continue;
        }
        if (mutualArtists.includes(current_track.artists[0].id)) {
            tracksWithSameArtist.push(trackA)
        }
    }
    // API rate limit exceeded
    for (var trackB of tracksB) {
        trackB = trackB.replaceAll('"','');
        let current_track = await getData("/tracks/"+trackB)
        if (current_track.artists == undefined) {
            continue;
        }        
	if (mutualArtists.includes(current_track.artists[0].id)) {
            tracksWithSameArtist.push(trackB)
        }
    }
    //console.log('tracksWithSameArtist: ', tracksWithSameArtist)

    // todo remove duplicates
    // also, on the picasso server I think this start end loop is going faster so more tracks are added

}

function getMutualArtistsOne(code) {
    getArtistsOne('a',code)
    getArtistsOne('b',code)
    codeHere = code
    // console.log('waiting 1sec... can be made shorter??')
    setTimeout(getMutualArtistsOne2,1000)
}

function getMutualArtistsOne2() {
    mutualArtists = artistsA.filter(value => artistsB.includes(value));
    for (var artist of mutualArtists) {
        artist = artist.replaceAll('"','');
    }
}

function getMutualRecTracksOne(code) {
    recTrackTitlesA = getRecTrackTitlesAndIDsOne('a',code)
    recTrackTitlesB = getRecTrackTitlesAndIDsOne('b',code)
    codeHere = code
    setTimeout(getMutualRecTracksOne2,1000)
}

function getMutualRecTracksOne2() {
    // console.log('recTrackTitlesA: ',recTrackTitlesA)
    // console.log('recTrackTitlesB: ',recTrackTitlesB)
    mutualRecTracks = recTrackTitlesA.filter(value => recTrackTitlesB.includes(value));
    for (var mutualRecTrack of mutualRecTracks) {
        mutualRecTrack = mutualRecTrack.replaceAll('"','');
    }
}

function getTracksOne(user, code) {
    let sqlTra = ""
    let tracksToReturn = []
    if (user == 'a') {
        sqlTra = "SELECT tracksA FROM spotify_table4 WHERE code = '"+code.toString()+"'";
    }
    else {
        sqlTra = "SELECT tracksB FROM spotify_table4 WHERE code = '"+code.toString()+"'";
    }
    let query = db.query(sqlTra,(err,retreivedTrackData)=>{
        if (err) throw err;
        // console.log('retrData: ', retreivedTrackData)
        tracksToReturn = retreivedTrackData.toString().split(',')
        // console.log('tracksToReturn: ', tracksToReturn)

        if (user == 'a') {
            // console.log('retrData: ', retreivedTrackData[0].tracksA)
            // console.log('retrData.split: ', retreivedTrackData[0].tracksA.split(','))
            tracksA = retreivedTrackData[0].tracksA.split(',')
        }
        else {
            // console.log('retrData: ', retreivedTrackData[0].tracksB)
            // console.log('retrData.split: ', retreivedTrackData[0].tracksB.split(','))
            tracksB = retreivedTrackData[0].tracksB.split(',')
        }
    });
    return tracksToReturn
}

function getArtistsOne(user, code) {
    //console.log('getting artists from user ',user,'...')
    let sqlArt = ""
    if (user == 'a') {
        sqlArt = "SELECT artistsA FROM spotify_table4 WHERE code = '"+code.toString()+"'";
    }
    else {
        sqlArt = "SELECT artistsB FROM spotify_table4 WHERE code = '"+code.toString()+"'";
    }
    // console.log('sqlArt: ',sqlArt)
    let query = db.query(sqlArt,(err,retreivedArtistsData)=>{
        if (err) throw err;
        if (user == 'a') {
            // console.log('retrData: ', retreivedArtistsData[0].artistsA)
            // console.log('retrData.split: ', retreivedArtistsData[0].artistsA.split(','))
            artistsA = retreivedArtistsData[0].artistsA.split(',')
        }
        else {
            // console.log('retrData: ', retreivedArtistsData[0].artistsB)
            // console.log('retrData.split: ', retreivedArtistsData[0].artistsB.split(','))
            artistsB = retreivedArtistsData[0].artistsB.split(',')
        }
    });
}

function getRecTrackTitlesAndIDsOne(user, code) {
    let sql3 = ""
    if (user == 'a') {
        sql3 = "SELECT recTracksA FROM spotify_table4 WHERE code = '"+code.toString()+"'";
    }
    else {
        sql3 = "SELECT recTracksB FROM spotify_table4 WHERE code = '"+code.toString()+"'";
    }
    let regex = /\\/g;
    let recoSongTitles = []
    let query = db.query(sql3,(err,retreivedData)=>{
        if (err) throw err;
        // console.log('sql3: ',sql3)
        // console.log('retreivedData: ', retreivedData)
        // console.log('retreivedData type: ', typeof retreivedData)
        // console.log('retreivedData[0].recTracksA: ',retreivedData[0].recTracksA);
        // console.log('JSON.parse(retreivedData[0].recTracksA).replace(/\\/g, ""): ',JSON.parse(retreivedData[0].recTracksA.replace(/\\/g, "")));
        // console.log('type: ',typeof retreivedData[0].recTracksA)
        //let recoTracksA = JSON.parse(retreivedData[0].recTracksA.replace(/\\/g, ""));
        let recoTracks = null
        if (user == 'a') {
            recoTracks = JSON.parse(retreivedData[0].recTracksA);
        }
        else {
            recoTracks = JSON.parse(retreivedData[0].recTracksB);
        }
        recoSongIDs = []
        // console.log('recoTracks: ',recoTracks)
        let recoTracksLength = Object.keys(recoTracks).length;
        // console.log('recoTracks.length: ',recoTracksLength);
        for (let i=0;i<recoTracksLength;i++) {
            // console.log('recoTracksA[i.toString()]: ', recoTracksA[i.toString()])
            // console.log('JSON.parse(recoTracksA[i.toString()]): ', JSON.parse(recoTracksA[i.toString()]))
            // console.log('JSON.parse(recoTracks[i.toString()])["name"] ', JSON.parse(recoTracks[i.toString()])["name"])
            recoSongTitles.push(JSON.parse(recoTracks[i.toString()])["name"])
            recoSongIDs.push(JSON.parse(recoTracks[i.toString()])["id"])
        }
        if (user == 'a') {
            recoSongIDsA = recoSongIDs
            //console.log('recoSongIDsA: ', recoSongIDsA)
        }
        else {
            recoSongIDsB = recoSongIDs
            recoSongIDs = []
            //console.log('recoSongIDsB: ', recoSongIDsB)
            recoSongIDs = recoSongIDsA.filter(value => recoSongIDsB.includes(value));
            //console.log('recoSongIDs: ', recoSongIDs)
        }
        // console.log('all recommended song titles: ',recoSongTitles)
    });
    return recoSongTitles
}

// shuffle list with the Fisher-Yates algorithm
function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = list[i]
      list[i] = list[j]
      list[j] = temp
    }
    return list
  }
