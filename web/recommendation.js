import {recommendationDone, afterDBcheck, getData, renderuser1ready, rendervisual} from "./index.js"
import {insertRecSongDataToDB, db, globalVector2state, globalVector1, globalVector2, currentUser, currentCode, currentVector} from './database_functionality.js'

export{recommendationSongs,recommendationSongNames,recommendationArtistNames}

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

export async function getCombinedRecTracks(code) {
    console.log('in GetCombinedRecTracks with code: ', code);
    getMutualTracks(code)
    getMutualArtistSongs(code)
    // getMutualGenres(code)
    getMutualRecTracks(code)
    // todo hier iets aan doen
    // todo add more songs based on mutual characteristics
    console.log('timeout of 10sec to go to getCombinedRecTracks2')
    setTimeout(getCombinedRecTracks2, 10000)
}

function getCombinedRecTracks2() {
    console.log('mutualTracks: ', mutualTracks)
    console.log('mutualArtists: ', mutualArtists)
    console.log('tracksWithSameArtist: ', tracksWithSameArtist)
    console.log('mutualGenres: ', mutualGenres)
    console.log('mutualRecTracks: ', mutualRecTracks)
    console.log('(mutual)recoSongIDs: ', recoSongIDs)
    if (mutualTracks.length > nb_final_songs) {
        finalTrackIdList = mutualTracks.slice(0,nb_final_songs)
    }
    else {
        for (var track of mutualTracks) {
            finalTrackIdList.push(track)
        }
    }
    console.log('(met mutualTracks) finalTrackIdList: ', finalTrackIdList)
    if (tracksWithSameArtist.length + mutualTracks.length > nb_final_songs) {
        while (finalTrackIdList.length <= 20) {
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
    if (finalTrackIdList.length < nb_final_songs) {
        while (finalTrackIdList.length <= 20) {
            if (recoSongIDs.length > 0) {
                finalTrackIdList.push(recoSongIDs[0])
                recoSongIDs = recoSongIDs.slice(1, 999)
            }
            else {
                break;
            }
        }
        console.log('(met recoSongIDs) finalTrackIdList: ', finalTrackIdList)
    }
    if (finalTrackIdList.length < nb_final_songs) {
        console.log('hallo1: ', recoSongIDsA)
        while (finalTrackIdList.length <= 20) {
            console.log('hallo2: ', recoSongIDsA)
            if (recoSongIDsA.length > 0) {
                console.log('hierrrrrrrrr')
                finalTrackIdList.push(recoSongIDsA[0])
                recoSongIDsA = recoSongIDsA.slice(1, 999)
            }
            else {
                break;
            }
        }
        console.log('(met recoSongIDsA) finalTrackIdList: ', finalTrackIdList)
    }
    getCombinedRecTracks3(finalTrackIdList);
}

// gets the recommended songs for the users and their names and artist names
async function getCombinedRecTracks3(finalTrackIdList) {
    for (var track of finalTrackIdList) {
        track = track.replaceAll('"','');
        let current_track = await getData("/tracks/"+track)
        recommendationSongs.push(current_track)
        let current_track_name = current_track.name
        recommendationSongNames.push(current_track_name)
        //console.log('current_track', current_track)
        //console.log('current_track.artists', current_track.artists)
        let current_track_artist = current_track.artists[0].name
        recommendationArtistNames.push(current_track_artist)
        let current_track_artist_id = current_track.artists[0].id
        let current_track_name_artist = current_track_name + ' - ' + current_track_artist
    }
    console.log('recommendationSongs: (n printen te lang)')
    console.log('recommendationSongNames: ', recommendationSongNames)
    console.log('recommendationArtistNames: ', recommendationArtistNames)
    console.log('timeout of 3sec to go to recommendationDone')
    setTimeout(recommendationDone, 3000);
}


function getMutualTracks(code) {
    tracksA = getTracks('a',code)
    tracksB = getTracks('b',code)
    codeHere = code
    setTimeout(getMutualTracks2,1000)
}

function getMutualTracks2() {
    mutualTracks = tracksA.filter(value => tracksB.includes(value));
}

function getMutualArtistSongs(code) {
    getMutualArtists(code)
    setTimeout(getMutualArtistSongs2,1000)
}

async function getMutualArtistSongs2() {
    // remove duplicates
    mutualArtists = mutualArtists.filter((element, index) => {
        return mutualArtists.indexOf(element) === index;
    });

    for (var trackA of tracksA) {
        trackA = trackA.replaceAll('"','');
        let current_track = await getData("/tracks/"+trackA)
        if (mutualArtists.includes(current_track.artists[0].id)) {
            tracksWithSameArtist.push(trackA)
        }
        // todo this is an ugly fix for the api rate limit (waste time -> too much?)
        let start = 1
        let end = 1000
        for (let i = start; i <= end; i+=2) {
            end +=1
        }
    }
    // API rate limit exceeded
    for (var trackB of tracksB) {
        trackB = trackB.replaceAll('"','');
        let current_track = await getData("/tracks/"+trackB)
        if (mutualArtists.includes(current_track.artists[0].id)) {
            tracksWithSameArtist.push(trackB)
        }
        // todo this is an ugly fix for the api rate limit (waste time -> too much?)
        let start = 1
        let end = 1000
        for (let i = start; i <= end; i+=2) {
            end +=1
        }
    }
    console.log('tracksWithSameArtist: ', tracksWithSameArtist)
    // todo remove duplicates
}

function getMutualArtists(code) {
    getArtists('a',code)
    getArtists('b',code)
    codeHere = code
    // console.log('waiting 1sec... can be made shorter??')
    setTimeout(getMutualArtists2,1000)
}

function getMutualArtists2() {
    mutualArtists = artistsA.filter(value => artistsB.includes(value));
    for (var artist of mutualArtists) {
        artist = artist.replaceAll('"','');
    }
}

function getMutualGenres(code) {
    return null
}

function getMutualRecTracks(code) {
    recTrackTitlesA = getRecTrackTitlesAndIDs('a',code)
    recTrackTitlesB = getRecTrackTitlesAndIDs('b',code)
    codeHere = code
    setTimeout(getMutualRecTracks2,1000)
}

function getMutualRecTracks2() {
    // console.log('recTrackTitlesA: ',recTrackTitlesA)
    // console.log('recTrackTitlesB: ',recTrackTitlesB)
    mutualRecTracks = recTrackTitlesA.filter(value => recTrackTitlesB.includes(value));
    for (var mutualRecTrack of mutualRecTracks) {
        mutualRecTrack = mutualRecTrack.replaceAll('"','');
    }
}

function getTracks(user, code) {
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

function getArtists(user, code) {
    console.log('getting artists from user ',user,'...')
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

function getRecTrackTitlesAndIDs(user, code) {
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
            console.log('recoSongIDsA: ', recoSongIDsA)
        }
        else {
            recoSongIDsB = recoSongIDs
            recoSongIDs = []
            console.log('recoSongIDsB: ', recoSongIDsB)
            recoSongIDs = recoSongIDsA.filter(value => recoSongIDsB.includes(value));
            console.log('recoSongIDs: ', recoSongIDs)
        }
        // console.log('all recommended song titles: ',recoSongTitles)
    });
    return recoSongTitles
}
