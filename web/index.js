import express, { response } from "express"; // a node.js web application framework
import fetch from "node-fetch";
import {make_percentages_per_playlist,matchPercentagesPerPlaylist,top3characteristicsNamesTwo, getMatchPercentagesForAllFinalTracks,generate_doubleVectorForFinalTracks, double_vector_final_tracks, cosinesim, generate_globalAverageVector_from_tracks, globalAverageVector, globalAllSongsVector } from "./vector.js";
//import {db_function} from "./own_database.js"
import {finalTrackIdList, recommendationSongs, recommendationSongNames, recommendationArtistNames, getCombinedRecTracksOne } from "./recommendationOne.js";
import {getCombinedRecTracksTwo, recommendationSongsTwo, finalTrackIdListTwo} from "./recommendationTwo.js";
import {insertRecSongDataToDB, db, globalVector2state, globalVector1, globalVector2, currentUser, currentCode, currentVector} from './database_functionality.js'
import * as db_func from "./database_functionality.js"
import mysql from "mysql";
import * as path from 'path';

export {tracksPerSelectedPlaylist, selected_tracks, vector_user_1, vector_user_2}

// global Variables
const redirect_uri = "http://picasso.experiments.cs.kuleuven.be:3411/callback";
const client_id = "ae9bd966e4dd4bbd8d9e2b745dfad1e3";
const client_secret = "7d3e0ce6672a46faa277a6c504653fb9";
var playlists = []
var selected_playlists = [];
let selected_tracks = [];
var recommended_tracks = [];
var recommended_tracks_names = [];
var recommended_tracks_artists = [];
var recommended_tracks_urls = [];
var playlist_names = [];
var selected_track_ids = []
var selected_artist_ids = []
var selected_genres = []
let temp_req = undefined
let temp_ress = undefined
let temp_res2 = undefined
let temporaryPlaylistSelection = 'dummyValue'
let tempPlaylistNames = 'dummyValue'
let name_1 = 'empty'
let name_2 = 'empty'
let currentname = 'empty'
let vector_user_1 = []
let vector_user_2 = []
let current_algo = 0
let matchPercentagesForAllRecTracksUser1 = []
let matchPercentagesForAllRecTracksUser2 = []
let current_user_id = 'empty'
let user_id_1 = 'empty'
let user_id_2 = 'empty'
let response_with_playlist_id = 'empty'
let user1readycanclick = false
let tracksPerSelectedPlaylist = []
let total_nb_sel_pl = 0


const app = express();
app.use(express.static("public")); // needed for style.css to work
app.use(express.urlencoded({extended: true}))
app.set("views", "./views");
app.set("view engine", "pug"); // use pug to generate html pages
global.access_token;

//Insert (new) vector
let givenCodet = "t1"
let vector1 = "1-1.1-1.11";
let todo = true;

app.get("/addVector", (req, res)=>{
	let vectorToPutt = vector1;
	let DB = app.get("/getDB");
	console.log("DB: ",DB);
	for (let i=0; i<DB.length; i++) {
	  // check if code is already present in DB
	  console.log('DB[0]: ', DB[0])
	}
	if (todo) {
	  // code was not present in DB. Inserting new vector...
	  let vectorToPut = {code: givenCodet, vector1: vectorToPutt, vector2: "empty"};
	  let sql = "INSERT INTO vectors SET ?"
	  let query = db.query(sql,vectorToPut,(err,result)=>{
		if (err) throw err;
		console.log("result");
		todo = false;
		res.send("Vector inserted");
	  });
	}
  });
// render '/' page (index page)
app.get("/", function (req, res) {
	// create table if it does not exist
	if (0) {
		let sql = "CREATE TABLE spotify_table4(id int AUTO_INCREMENT, code VARCHAR(225),vector1 VARCHAR(225),vector2 VARCHAR(225),PRIMARY KEY(id), sel_pl1 VARCHAR(1000), sel_pl2 VARCHAR(1000), recTracksA LONGTEXT, recTracksB LONGTEXT, tracksA LONGTEXT, tracksB LONGTEXT, artistsA LONGTEXT, artistsB LONGTEXT)";
		db.query(sql,(err,result)=>{
		  if (err) throw err;
		})
	  };
  	user1readycanclick = false;
	res.render("index");
  });

// endpoints for quickly testing visuals
app.get('/visual1test', function (req, res) {
	res.render("visual1", {matches1: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],matches2: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],code: 'ay12test', top3characteristicsNamesTwo: top3characteristicsNamesTwo, name_1: 'Tom', name_2: 'Alice', vector1:globalVector1,vector2:globalVector2,playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: {
	  tracks: [
		{
		  album: [Object],
		  artists: [Array],
		  available_markets: [Array],
		  disc_number: 1,
		  duration_ms: 153406,
		  explicit: true,
		  external_ids: [Object],
		  external_urls: [Object],
		  href: 'https://api.spotify.com/v1/tracks/22ruOqBqBRiZDiXFud4OXa',
		  id: '22ruOqBqBRiZDiXFud4OXa',
		  is_local: false,
		  name: 'Over The Top (feat. Drake)',
		  popularity: 67,
		  preview_url: 'https://p.scdn.co/mp3-preview/fe8684f8bba6ed431d672960cf2b2e260361c52a?cid=3e1c8f186968494ba2a1891f461566cb',
		  track_number: 6,
		  type: 'track',
		  uri: 'spotify:track:22ruOqBqBRiZDiXFud4OXa'
		}]
	  }.tracks}
  )});
app.get('/visual2test', function (req, res) {
	res.render("visual2", {matches1: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],matches2: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],code: 'ay12test', name_1: 'Tom', name_2: 'Alice', vector1:globalVector1,vector2:globalVector2,pl1names: ['leukeliedjes', 'beats'], pl2names: ['rapmuziekk', 'coole muziekk'], rec_tracks: {
	  tracks: [
		{
		  album: [Object],
		  artists: [Array],
		  available_markets: [Array],
		  disc_number: 1,
		  duration_ms: 153406,
		  explicit: true,
		  external_ids: [Object],
		  external_urls: [Object],
		  href: 'https://api.spotify.com/v1/tracks/22ruOqBqBRiZDiXFud4OXa',
		  id: '22ruOqBqBRiZDiXFud4OXa',
		  is_local: false,
		  name: 'Over The Top (feat. Drake)',
		  popularity: 67,
		  preview_url: 'https://p.scdn.co/mp3-preview/fe8684f8bba6ed431d672960cf2b2e260361c52a?cid=3e1c8f186968494ba2a1891f461566cb',
		  track_number: 6,
		  type: 'track',
		  uri: 'spotify:track:22ruOqBqBRiZDiXFud4OXa'
		}]
	  }.tracks}
)});


app.get("/info", function (req, res) {
	res.render("info");
});


// load Spotify authorization/login page and redirect to Spotify
app.get("/authorize", (req, res) => {
	var auth_query_parameters = new URLSearchParams({
	  response_type: "code",
	  client_id: client_id,
	  scope: "user-read-recently-played playlist-modify-public user-library-read",
	  redirect_uri: redirect_uri,
	});
	console.log("authorization clicked")

	res.redirect(
	  "https://accounts.spotify.com/authorize?" + auth_query_parameters.toString()
	);
  });


// Spotify redirects back to '/callback'. Here we save the authorization code and redirect to the dashbord
app.get("/callback", async (req, res) => {
	const code = req.query.code;

	var body = new URLSearchParams({
	  code: code,
	  redirect_uri: redirect_uri,
	  grant_type: "authorization_code",
	});

	const response = await fetch("https://accounts.spotify.com/api/token", {
	  method: "post",
	  body: body,
	  headers: {
		"Content-type": "application/x-www-form-urlencoded",
		Authorization:
		  "Basic " +
		  Buffer.from(client_id + ":" + client_secret).toString("base64"),
	  },
	});

	const data = await response.json();
	global.access_token = data.access_token;

	console.log('modifying globalVector2state to empty...')
	db_func.modifyCurrentVector2State('empty')
	console.log('modifying temporaryPlaylistSelection and tempPlaylistNames to dummyvalue...')
	temporaryPlaylistSelection = 'dummyvalue'
	tempPlaylistNames = 'dummyvalue'
	res.redirect("/playlistselection");
});

// render '/playlistselection' page
app.get("/playlistselection", async (req, res) => {
	// GET request: /me
	const userInfo = await getData("/me");
        current_user_id = userInfo.id
	const username = userInfo.display_name;
	const first_name = username.split(" ")[0]
        currentname = first_name
	const tracks = await getData("/me/tracks?limit=10");
	playlists = await getData("/me/playlists?limit=15");

	res.render("playlistselection", {first_name:first_name, user: userInfo, tracks: tracks.items, playlists: playlists.items });
});

// render '/recommendations' page (when some playlists are selected)
app.get("/recommendations", async (req, res) => {
	console.log('in app.get(/recommendations)')
	console.log('selected playlists now: ',selected_playlists)
	// const artist_id = req.query.artist;
	// const track_id = req.query.track;
	const artist_id = "3TVXtAsR1Inumwj472S9r4"
	const track_id = "3F5CgOj3wFlRv51JsHbxhe"

	const params = new URLSearchParams({
	  seed_artist: artist_id,
	  seed_genres: "hip-hop",
	  seed_tracks: track_id,
	});

	const data1 = await getData("/recommendations?" + params);
	console.log('data1: ',data1)
	res.render("recommendations", { rec_tracks: data1.tracks , playlists: ['c1r7YlhStD1shjJxQyVIwmt','2e7IuH9wImdX4ulWvzi4q'], playlist_names: ['eerste geselecteerde playlist', 'tweede geselecte playlist']});
});

// render '/playlist' page
app.get("/playlist", async (req, res) => {
	const playlist_id = req.query.playlist_id;
	console.log('playlist id',playlist_id)
	const playlist_name = req.query.playlist_name
	const params = new URLSearchParams({
	  playlist_id: playlist_id,
	});

	// GET request: /playlists/{playlistID}/tracks
	const data2 = await getData("/playlists/"+playlist_id+'/tracks'); //todo limit erachter EN bug als playlist leeg is
	res.render("playlist", { tracks: data2.items, name: playlist_name });
});


app.post('/', async(req,res) => {
    res.redirect("/info")
})

app.post('/info', async(req,res) => {
    res.redirect("/authorize")
})

app.post('/backfromplaylist', async(req, ressback) => {
  console.log('\n\n-----post backfromplaylist-----')
  ressback.redirect("playlistselection")
});

app.post('/playlistselection', async (req, res) => {
	console.log('\n\n-----post playlistselection-----')
	temporaryPlaylistSelection = Object.keys(req.body)
  	// if no playlist selected, reload page
  	if (temporaryPlaylistSelection.length == 0){
    		console.log('no playlist selected, reload page')
    		res.redirect("/playlistselection")
  	}
	console.log('temporaryPlaylistSelection: ',temporaryPlaylistSelection)
	console.log('making user vectors...')
	temp_res2 = res
	makeUserVector(req.body) // req.body = selected_playlists
});

export function rendercodepage(){
	db_func.modifyCurrentVector(globalAverageVector)
	console.log('rendering code page...')
	temp_res2.render("code", {playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: recommended_tracks})
}

app.post('/code', async(req, ress) => {
	console.log('\n\n-----post codepage-----')
	db_func.modifyCurrentVector(globalAverageVector)
	db_func.modifyCurrentCode(req.body.code);
	temp_req = req;
	temp_ress = ress;
	console.log('check if code is already in DB...')
	db_func.isCodeInDB(req.body.code);
	//after this (1sec) code will continue in afterDBcheck()
});

app.post('/codetwice', async(req, resstwice) => {
  console.log('\n\n-----post codetwice-----')
  resstwice.render("code", {playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: recommended_tracks})
});

app.post('/addplaylist', async(req,res) => {
  console.log('\n\n-----post addplaylist-----')
  db_func.addPlButtonClickToDB(currentCode)
  addPlaylistToAccount()
});

app.post('/user1readyclick', async(req,res) => {
  if (user1readycanclick == false){
    console.log('user1readycanclick = false, reloading page...')
    res.render("user1ready")
  }
  else {
    console.log('user1readycanclick = true, showing final page to user1...')
    // set back to false
    user1readycanclick = false
    showFinalPageToUser1(res)
  }
});

export function afterDBcheck() {

	console.log('DB check done. vector2state=',globalVector2state)
	let req = temp_req;
	let ress = temp_ress;
	// res = full OR halffull OR empty
	if (globalVector2state[0] == 'f') {
          ress.render("codetwice")
	  return
	}
	else if (globalVector2state[0] == 'h') {
	  let id = globalVector2state.slice(8)
	  console.log('adding vector 2...')
    	  name_2 = currentname
    	  user_id_2 = current_user_id
    	  console.log('user_id_2: ',user_id_2)
          vector_user_2 = globalAverageVector
          console.log('vector_user_2: ',vector_user_2)
	  let added = db_func.insertVector2andRecSongDataB(req.body.code, currentVector, id, recommended_tracks,recommended_tracks_urls,recommended_tracks_names,recommended_tracks_artists, selected_track_ids, selected_artist_ids)
	}
	else if (globalVector2state[0] == 'e') {
	  console.log('adding new entry with code and vector 1...')
    	  name_1 = currentname
    	  user_id_1 = current_user_id
    	  console.log('user_id_1: ',user_id_1)
    	  vector_user_1 = globalAverageVector
          console.log('vector_user_1: ',vector_user_1)
	  let added = db_func.insertVector1andRecSongDataA(req.body.code, currentVector,recommended_tracks,recommended_tracks_urls,recommended_tracks_names,recommended_tracks_artists)
	  db_func.addSelectedTrackIdsToDB('a',req.body.code, selected_track_ids)
	  db_func.addSelectedArtistIdsToDB('a',req.body.code, selected_artist_ids)
	  db_func.addPlaylistSelectionToDB(req.body.code, temporaryPlaylistSelection)
	}
}

export async function algo1() {
        current_algo=1
	console.log('adding playlist selection to DB...')
	// add playlists of user 2 to database
	db_func.addPlaylistSelectionToDB(currentCode, temporaryPlaylistSelection)

	console.log('go to recommendationOne.js...')
	getCombinedRecTracksOne(currentCode)
}

export async function recommendationDoneOne() {
  console.log('finalTrackIdList: ',finalTrackIdList)
  console.log('making percentages per playlist...')
  // generates the variable "matchPercentagesPerPlaylist"
  generate_doubleVectorForFinalTracks('One',finalTrackIdList)
}

export async function recommendationDoneOnePart2() {
  make_percentages_per_playlist(tracksPerSelectedPlaylist, finalTrackIdList)
  tracksPerSelectedPlaylist = []
  // wait 2 second per selected playlist
  console.log('waiting 2 seconds per selected playlist (=',2000*total_nb_sel_pl,'sec)...')
  setTimeout(recommendationDoneOnePart3, 2000*total_nb_sel_pl)
}

export async function recommendationDoneOnePart3() {
  total_nb_sel_pl = 0
  matchPercentagesForAllRecTracksUser1 = []
  matchPercentagesForAllRecTracksUser2 = []
  matchPercentagesForAllRecTracksUser1 =
      getMatchPercentagesForAllFinalTracks(vector_user_1)
  matchPercentagesForAllRecTracksUser2 =
      getMatchPercentagesForAllFinalTracks(vector_user_2)
  console.log('matchPercentagesForAllRecTracksUser1: ',matchPercentagesForAllRecTracksUser1)
  console.log('matchPercentagesForAllRecTracksUser2: ',matchPercentagesForAllRecTracksUser2)
  console.log('matchPercentagesPerPlaylist: ',matchPercentagesPerPlaylist)
  console.log('recommendationSongNames: ',recommendationSongNames);
  console.log('recommendationArtistNames: ',recommendationArtistNames);
  //remove duplicates
  if(currentCode[0] == 'a') {
    user1readycanclick = true
    temp_ress.render("visual1", {plpercentages:matchPercentagesPerPlaylist,matches1:matchPercentagesForAllRecTracksUser1,matches2:matchPercentagesForAllRecTracksUser2,code: currentCode, top3characteristicsNamesTwo: top3characteristicsNamesTwo, name_1: name_1, name_2: name_2, vector1:globalVector1,vector2:globalVector2,playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: recommendationSongs })
  }
  else if(currentCode[0] == 'b') {
    db_func.getPlaylistNamesFromDB(currentCode)
    // after this continue in renderVis2()
  }
}

export async function algo2() {
  current_algo = 2
  db_func.addPlaylistSelectionToDB(currentCode, temporaryPlaylistSelection)
  console.log('go to recommendationTwo.js...')
  getCombinedRecTracksTwo(currentCode)
}

export async function recommendationDoneTwo() {
  generate_doubleVectorForFinalTracks('Two',finalTrackIdListTwo)
  console.log('making percentages per playlist...')
}

export async function recommendationDoneTwoPart2() {
  // generates variable "matchPercentagesPerPlaylist"
  make_percentages_per_playlist(tracksPerSelectedPlaylist, finalTrackIdListTwo)
  tracksPerSelectedPlaylist = []
  console.log('waiting 2 seconds per selected playlist (=',2000*total_nb_sel_pl,'sec)...')
  setTimeout(recommendationDoneTwoPart3, 2000*total_nb_sel_pl)
}

export async function recommendationDoneTwoPart3() {
  total_nb_sel_pl = 0
  matchPercentagesForAllRecTracksUser1 = []
  matchPercentagesForAllRecTracksUser2 = []
  matchPercentagesForAllRecTracksUser1 =
    getMatchPercentagesForAllFinalTracks(vector_user_1)
  matchPercentagesForAllRecTracksUser2 =
    getMatchPercentagesForAllFinalTracks(vector_user_2)
  console.log('matchPercentagesForAllRecTracksUser1: ',matchPercentagesForAllRecTracksUser1)
  console.log('matchPercentagesForAllRecTracksUser2: ',matchPercentagesForAllRecTracksUser2)
  console.log('matchPercentagesPerPlaylist: ',matchPercentagesPerPlaylist)
  //remove duplicates
  if(currentCode[0] == 'a') {
    user1readycanclick = true
    temp_ress.render("visual1", {plpercentages:matchPercentagesPerPlaylist,matches1:matchPercentagesForAllRecTracksUser1,matches2:matchPercentagesForAllRecTracksUser2,code: currentCode, top3characteristicsNamesTwo: top3characteristicsNamesTwo, name_1: name_1, name_2:name_2, vector1:globalVector1,vector2:globalVector2,playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: recommendationSongsTwo})
  }
  else if(currentCode[0] == 'b') {
    db_func.getPlaylistNamesFromDB(currentCode)
  }
}

export async function renderVis2() {
  console.log('rendering visual2...')
  // 2 different cases because they have different variables
  if (current_algo == 1) {
    user1readycanclick = true
    temp_ress.render("visual2", {plpercentages:matchPercentagesPerPlaylist,matches1:matchPercentagesForAllRecTracksUser1,matches2:matchPercentagesForAllRecTracksUser2,code: currentCode, name_1: name_1, name_2: name_2,pl1names: db_func.pl1names, pl2names: db_func.pl2names, playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: recommendationSongs})
  }
  else if (current_algo == 2) {
    user1readycanclick = true
    temp_ress.render("visual2", {plpercentages:matchPercentagesPerPlaylist,matches1:matchPercentagesForAllRecTracksUser1,matches2:matchPercentagesForAllRecTracksUser2,code: currentCode, name_1: name_1, name_2: name_2,pl1names: db_func.pl1names, pl2names: db_func.pl2names, playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: recommendationSongsTwo})
  }
}

export async function renderuser1ready() {
	console.log('rendering user1ready...')
	temp_ress.render("user1ready")
}

export async function showFinalPageToUser1(res) {
  if (current_algo == 1) {
    if(currentCode[0] == 'a') {
      console.log('rendering visual1 for algo 1 for user 1...')
      res.render("visual1", {plpercentages:matchPercentagesPerPlaylist,matches1:matchPercentagesForAllRecTracksUser1,matches2:matchPercentagesForAllRecTracksUser2,code: currentCode, top3characteristicsNamesTwo:top3characteristicsNamesTwo, name_1: name_1, name_2:name_2, vector1:globalVector1,vector2:globalVector2,playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: recommendationSongs })
    }
    else if(currentCode[0] == 'b') {
      console.log('rendering visual2 for algo 1 for user 1...')
      res.render("visual2", {plpercentages:matchPercentagesPerPlaylist,matches1:matchPercentagesForAllRecTracksUser1,matches2:matchPercentagesForAllRecTracksUser2 ,code: currentCode, name_1: name_1, name_2: name_2,pl1names: db_func.pl1names, pl2names: db_func.pl2names, playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: recommendationSongs})
    }
  }
  else if (current_algo == 2) {
    if(currentCode[0] == 'a') {
      console.log('rendering visual1 for algo 2 for user 1...')
      res.render("visual1", {plpercentages:matchPercentagesPerPlaylist,matches1:matchPercentagesForAllRecTracksUser1,matches2:matchPercentagesForAllRecTracksUser2,code: currentCode, top3characteristicsNamesTwo:top3characteristicsNamesTwo, name_1: name_1, name_2:name_2, vector1:globalVector1,vector2:globalVector2,playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: recommendationSongsTwo})
    }
    else if(currentCode[0] == 'b') {
      console.log('rendering visual2 for algo 2 for user 1...')
      res.render("visual2", {plpercentages:matchPercentagesPerPlaylist,matches1:matchPercentagesForAllRecTracksUser1,matches2:matchPercentagesForAllRecTracksUser2,code: currentCode, name_1: name_1, name_2: name_2,pl1names: db_func.pl1names, pl2names: db_func.pl2names, playlist_names: playlist_names, playlists: selected_playlists, rec_tracks: recommendationSongsTwo})
    }
  }
}

async function makeUserVector(selectedPlaylists) {

	console.log('making user vector...')
	// for item (=playlist id) get all tracks
	selected_playlists = []
	playlist_names = []
	selected_tracks = []
	selected_track_ids = []
	selected_artist_ids = []
	selected_genres = []
	recommended_tracks = []
	recommended_tracks_names = []
	recommended_tracks_artists = []
	recommended_tracks_urls = []
	for(var item in selectedPlaylists) {
	  selected_playlists.push(item);
	}

	for (var playlist_id of selected_playlists) {
    	  total_nb_sel_pl += 1
	  var playlistData = await getData("/playlists/"+playlist_id)
	  playlist_names.push(playlistData.name)
	  const trackData = await getData("/playlists/"+playlist_id+'/tracks');

          // case of empty playlist
          if (trackData.items == undefined || trackData.items.length == 0) {
            continue;
          }
          else{
	    let current_pl_tracks = []
	    // take only the first 150 tracks
	    trackData.items = trackData.items.slice(0,150)
	    for (var track of trackData.items) {
        	var artist_id = track.track.artists[0].id;
        	var track_id = track.track.id;
        	var trackGenreData = await getData("/artists/"+artist_id);
        	// default genre
        	var track_genre = "pop";
        	if (trackGenreData != undefined) {
          		if (trackGenreData.genres != undefined) {
            			if (trackGenreData.genres[0] != undefined) {
              				track_genre = trackGenreData.genres[0];
            			}
          		}
        	}
        	//console.log('track_genre: ', track_genre)
        	current_pl_tracks.push(track)
        	selected_tracks.push(track)
        	selected_track_ids.push(track_id)
        	selected_artist_ids.push(artist_id)
        	if (recommended_tracks.length>15) {
          		continue;
        	}
        	const params = new URLSearchParams({
          	  limit: 3,
          	  seed_artist: artist_id,
          	  seed_genres: track_genre,
          	  seed_tracks: track_id,
        	});
        	const recData = await getData("/recommendations?" + params);
        	// case of empty playlist
        	if (recData.tracks == undefined || recData.tracks.length == 0) {
          	  continue;
        	}
                else {
                  for (const reco_track of recData.tracks) {
		  recommended_tracks.push(reco_track)
		  recommended_tracks_names.push(reco_track.name)
		  recommended_tracks_artists.push(reco_track.artists[0].name)
		  recommended_tracks_urls.push(reco_track.preview_url)
		}
	    }
	  }
	tracksPerSelectedPlaylist.push(current_pl_tracks)
	}
  }
  console.log('recommended tracks names:',recommended_tracks_names)
  console.log('generating vector from tracks in vector.js...')
  //variance=false: use average, variance=true: use Variance = average squared deviation
  generate_globalAverageVector_from_tracks(false)
}


// "you cannot create a playlist for another user"
async function addPlaylistToAccount() {
  // global n meer nodig TODO of toch wel maar hoeft niet global te zijn dus op lijn43weg
  current_user_id = user_id_1
  setTimeout(addPlaylistToAccount2, 500)
}

async function addPlaylistToAccount2() {
  console.log('adding playlist to account of user'+current_user_id+'...')
  let user_id_to_use = current_user_id
  let endpoint = "/users/"+user_id_to_use+"/playlists"
  let data = {
    name: 'Generated Playlist '+currentCode,
    description: 'A playlist generated by Alexander Joossens based on your mutual taste in music.',
    public: true
  }
  console.log('making playlist for user with id: ',user_id_to_use+'...')
  response_with_playlist_id = await postData(endpoint,data)
  setTimeout(addPlaylistToAccount3, 2000)
}

async function addPlaylistToAccount3() {
  // if response is an error with status 403, then we have to use user_id_2
  console.log('response_with_playlist_id.length: ',Object.keys(response_with_playlist_id).length)
  console.log('response_with_playlist_id.error.status: ',response_with_playlist_id.status)
  if (Object.keys(response_with_playlist_id).length == 1) {
    console.log('error! so we have to use user_id_2')
    current_user_id = user_id_2
    setTimeout(addPlaylistToAccount2, 500)
  }
  else {
    console.log('response_with_playlist_id: ',response_with_playlist_id)
    let playlist_id_2 = response_with_playlist_id.id
    console.log('playlist_id_2: ',playlist_id_2)
    //await addCoverImageToPlaylist('2', playlist_id_2)
    let result2 = await addSongsToPlaylist(playlist_id_2)
    setTimeout(everythingAdded, 3000)
  }
}

async function everythingAdded() {
  console.log('everything added!')
}

async function addCoverImageToPlaylist(user, playlist_id) {
  console.log('adding cover image to playlist...')
  let user_id_to_use = undefined
  if (user == '1') {
    user_id_to_use = user_id_1
  }
  else if (user == '2') {
    user_id_to_use = user_id_2
  }
  let endpoint = "/users/"+user_id_to_use+"/playlists/"+playlist_id+"/images"
  let data = {
    url: 'https://i.pinimg.com/originals/18/b9/ff/18b9ffb2a8a791d50213a9d595c4ddc3.jpg'
  }
  const response = putData(endpoint,data)
  console.log('response: ',response)
}

async function addSongsToPlaylist(playlist_id) {
  let idListToUse = undefined
  if (current_algo == 1) {
    console.log('using trackIdList from algo 1')
    idListToUse = finalTrackIdList
  }
  else {
    console.log('using trackIdListTwo from algo 2')
    idListToUse = finalTrackIdListTwo
  }
  let urisToUse = []
  for (var id of idListToUse) {
    urisToUse.push("spotify:track:"+id.toString())
  }
  let data = {
    "playlist_id": playlist_id,
    "uris": urisToUse
  }
  let params = new URLSearchParams(data)
  let endpoint = "/playlists/"+playlist_id.toString()+"/tracks?"+params
  console.log('adding songs to playlist with id: ',playlist_id+'...')
  const response = await postData(endpoint,data)
  setTimeout(addSongsToPlaylist2, 500, response)
}

async function addSongsToPlaylist2(response) {
  console.log('new generated playlist added to account.')
}

// function to make GET request (used for various endpoints)
export async function getData(endpoint) {
	const response = await fetch("https://api.spotify.com/v1" + endpoint, {
	  method: "get",
	  headers: {
		Authorization: "Bearer " + global.access_token,
	  },
	});

	//GET request to: https://api.spotify.com/v1"+endpoint
	const data = await response.json();

	// if you retreive user (/me) and there is no image found -> set default user image
	if (endpoint == "/me" && (data.images == undefined || data.images == [] || data.images.length < 1)) {
	  console.log("no image found. setting default.\n")
	  data.images = [
		{
		  height: null,
		  url: 'https:/i.pinimg.com/originals/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg',
		  width: null
		}
	  ]
	  console.log("default profile pic set.")
	}

	// if you retreive playlists and there is no image found -> set default image
	if (endpoint.includes("playlists") && endpoint.includes("me") && !(endpoint.includes("tracks"))) { //only check profile picture playlist when retreiving playlists (not tracks from 1)
	  console.log("data.items (=playlists): "+data.items)
	  for (const item of data.items) {
		if (item.images == undefined || item.images == [] || item.images.length < 1) {
		  console.log("playlist image empty. setting default")
		  item.images = []
		  item.images = [
			{
			  height: null,
			  url: 'https://www.iphonefaq.org/files/styles/large/public/apple_music.jpg',
			  width: null
			}
		  ]
		}
	  }
	}
	return data;
}


// function to make POST request (used for various endpoints)
export async function postData(endpoint, data) {
  const response = await fetch("https://api.spotify.com/v1" + endpoint, {
    method: "post",
    headers: {
    Authorization: "Bearer " + global.access_token,
    },
    body: JSON.stringify(data),
    dataType: "json",
  });
  const data2 = await response.json();
  return data2;
}

// function to make PUT request (used for various endpoints)
export async function putData(endpoint, data) {
  const response = await fetch("https://api.spotify.com/v1" + endpoint, {
    method: "put",
    headers: {
    Authorization: "Bearer " + global.access_token,
    },
    body: JSON.stringify(data),
  });
  const data2 = await response.json();
  return data2;
}

app.get('/hier', (req, res) => {
	db_func.printdb(req,res)
});

let listener = app.listen(5000, function () {
	console.log(
	  "The app is listening on http://localhost:" + listener.address().port
	);
});
