import mysql from "mysql";
import {renderVis2, algo1, algo2, afterDBcheck, getData, recommendationDoneTwo, renderuser1ready} from "./index.js"
import {} from "./recommendationOne.js";
export {pl1names, pl2names, curr_result, curr_pl1, curr_pl2, curr_code, db, globalVector2state, globalVector1, globalVector2, currentUser, currentCode, currentVector};

const connection = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST || 'db',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'test'
});

let db = connection;
let globalVector1 = 'empty';
let globalVector2 = 'empty';
let globalVector2state = 'empty';
let currentUser = 1;
var currentCode = "startDummyValue";
var currentVector = 'startDummyValue';
let curr_pl1 = []
let curr_pl2 = []
let curr_code = null
let curr_result = null;
let pl1names = []
let pl2names = []
let clickedCode = 'empty'


export function printdb(req, res) {
  connection.query('SELECT * FROM spotify_table4' , (err, rows) => {
    console.log('in /hier')
    if(err){
      console.log('error! ',err)
      res.json({
        success: false,
        err
        });
    }
    else{
      console.log('geen error!')
      res.json({
        success: true,
        rows
        });
    }
  });
}

// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "spotify_db"
// });

// //connect to database
// db.connect((err)=>{
//   if (err) {
//     throw err;
//   }
// });

//test
//returns a promise that resolves to a result set on success
function execSql(statement, values) {
  let p = new Promise(function (res, rej) {
    db.query(statement, values, function (err, result) {
      if (err) rej(err);
      else res(result);
    });
  });
  return p;
}

function insertTest(vector1test, vector2test) {
  console.log('in insertTest with vector1test=',vector1test,'and vector2test=',vector2test)
  execSql("INSERT INTO spotify_table(vector1) VALUES (?);",[vector1test])
  .then(function (result) {
    console.log("Inserted " + vector1test);
    return execSql("SELECT id, vector1 from spotify_table where vector1 = ?;", vector1test);
  })
  .then((result) => {
    let { id, vector1test } = result[0];
    console.log("Result: " + id + " " + vector1test);
    return execSql("INSERT INTO spotify_table (vector2,sel_pl2) VALUES (?,?);",
                      [vector2test, 'test3']);
  })
  .then((result) => {
    console.log("Inserted " + vector2test);
    // here call what should happen next (IDEE: nested calls maken dus ipv timeout na een .then hier een volgende functie callen!)
  })
  .catch((err) => { 
    console.log("Error: " + err);
  })
  // .finally(function (res) {
  //   conn.end();
  // });
}
//end test 

// app.get("/createdb",(req,res)=>{
//   let sql = "CREATE DATABASE nodemysql2";
//   db.query(sql,(err,result)=>{
//     if (err) throw err;
//     console.log("result");
//     res.send("Database Created.");
//   });
// });

// move this function quickly to server.js to make another table
// create table (e.g. {t1, "1-1.1-1.11", "2-2.2-2.22"})
// app.get("/createvectorstable", (req,res)=>{
//   let sql = "CREATE TABLE spotify_table3(id int AUTO_INCREMENT, code VARCHAR(225),vector1 VARCHAR(225),vector2 VARCHAR(225),PRIMARY KEY(id), sel_pl1 VARCHAR(1000), sel_pl2 VARCHAR(1000), recTracksA LONGTEXT, recTracksB LONGTEXT, tracksA LONGTEXT, tracksB LONGTEXT, artistsA LONGTEXT, artistsB LONGTEXT)";
//   db.query(sql,(err,result)=>{
//     if (err) throw err;
//   console.log(result);
//   res.send("vectors table created")
//   })
// });

export function modifyCurrentCode(value) {
    currentCode = value
}

export function modifyCurrentVector(value) {
    currentVector = value
}

export function modifyCurrentVector2State(value) {
  globalVector2state = value
}

// todo in this function: add not only playlists, but also all songs and artists and genres
export async function addPlaylistSelectionToDB(code,selectedPlaylists) {
    console.log('selectedPlaylists:',selectedPlaylists)
    let selectedPlaylistsReformat = selectedPlaylists.toString()
    console.log('selPlReformat: '+selectedPlaylistsReformat)
    let post = undefined;
    let sql = undefined;

    // here: loop over playlists and retrieve all songs
    // for 
    //

    if (currentUser==1) {
        post = {code:code, sel_pl1:selectedPlaylists}
        sql = `UPDATE spotify_table4 SET sel_pl1='${selectedPlaylistsReformat}' WHERE code='${code}'`;
    }
    else {
        post = {code:code, sel_pl2:selectedPlaylists}
        sql = `UPDATE spotify_table4 SET sel_pl2='${selectedPlaylistsReformat}' WHERE code='${code}'`;
    }
    let query = db.query(sql,post,(err,result)=>{
        if (err) throw err;
    });
}


export async function updateGlobalVectorAndUserVariables(index, value) {
  if (index == 1) {
    currentUser = 1
    globalVector1 = value
  }
  else if (index == 2) {
    currentUser = 2
    globalVector2 = value
  }
  else {
    console.log('error: given index is not 1 or 2')
  }
}

export async function isCodeInDB(codeToCheck, updateDBPlaylistInfo=false) {

  console.log('isCodeInDB: codeToCheck: ', codeToCheck)
  let sql2 = "SELECT id, vector1, vector2 FROM spotify_table4 WHERE code = "+db.escape(codeToCheck);
  let query = db.query(sql2,(err,retreivedVectorData)=>{
    // console.log('retreivedVectorData:',JSON.stringify(retreivedVectorData));
    if (retreivedVectorData == undefined || retreivedVectorData[0] == undefined || retreivedVectorData[0].vector2 == undefined) {
      console.log('isCodeInDB: retreivedVectorData is undefined. Code is not in DB yet.', codeToCheck)
      // console.log('in insertTest')
      // insertTest('test1','test2');
      // console.log('out of insertTest')
      globalVector2state = 'empty'
      return
    }
    // console.log('retreivedVectorData:',retreivedVectorData)
    if (retreivedVectorData[0].vector2 == 'empty') {
      globalVector2state = 'halffull'+retreivedVectorData[0].id
    }
    else {
      globalVector2state = 'full'+retreivedVectorData[0].id
    }
  })
  console.log('wait 1sec to go to afterDBcheck...')
  setTimeout(afterDBcheck,1000)
}

export async function insertVector1andRecSongDataA(codeToInsert, vectorToInsert, recommended_tracks,recommended_tracks_urls,recommended_tracks_names,recommended_tracks_artists) {
  console.log('inserting Vector1... vectorToInsert:',vectorToInsert)
  let post = {code:codeToInsert, vector1: JSON.stringify(vectorToInsert), vector2:"empty"};
  let sql = `INSERT INTO spotify_table4 SET ?`
  let query = db.query(sql,post,(err,result)=>{
    if (err) throw err;
  });
  console.log('added code,vector1,vector2 to DB')
  updateGlobalVectorAndUserVariables(1, vectorToInsert)
  insertRecSongDataToDB('a',codeToInsert,recommended_tracks,recommended_tracks_urls, recommended_tracks_names,recommended_tracks_artists)
  setTimeout(renderuser1ready,1000)
}

export async function insertVector2andRecSongDataB(codeToInsert, vectorToInsert, id, recommended_tracks,recommended_tracks_urls,recommended_tracks_names,recommended_tracks_artists, selected_track_ids, selected_artist_ids) {
  let sql = `UPDATE spotify_table4 SET vector2='${vectorToInsert}' WHERE id='${id}'`;
  let query = db.query(sql,(err,result)=>{
    if (err) throw err;
  });
  updateGlobalVectorAndUserVariables(2, vectorToInsert)
  console.log('inserting vector2 and RecSongDataB...')
  addSelectedTrackIdsToDB('b',codeToInsert, selected_track_ids)
  addSelectedArtistIdsToDB('b',codeToInsert, selected_artist_ids)
  insertRecSongDataToDB('b',codeToInsert,recommended_tracks,recommended_tracks_urls, recommended_tracks_names, recommended_tracks_artists)
  if (codeToInsert[1] == 'y') {
    setTimeout(algo1,2000)
  }
  else if (codeToInsert[1] == 'z') {
    setTimeout(algo2,2000)
  }
  else {
    console.log('code should never get here: code doesnt have y or z as 2nd symbol')
  }
}

export async function addSelectedTrackIdsToDB(user, code, selected_track_ids) {
  let sqlTr = ''
  if (user == 'a') {
    sqlTr = `UPDATE spotify_table4 SET tracksA='${JSON.stringify(selected_track_ids.toString())}' WHERE code='${code}'`
  }
  else {
    sqlTr = `UPDATE spotify_table4 SET tracksB='${JSON.stringify(selected_track_ids.toString())}' WHERE code='${code}'`
  }
  let query = db.query(sqlTr,(err,result)=>{
    if (err) throw err;
  });
  console.log('inserted selected tracks in DB')
}

export async function addSelectedArtistIdsToDB(user, code, selected_artist_ids) {
  let sqlAr = ''
  if (user == 'a') {
    sqlAr = `UPDATE spotify_table4 SET artistsA='${JSON.stringify(selected_artist_ids.toString())}' WHERE code='${code}'`
  }
  else {
    sqlAr = `UPDATE spotify_table4 SET artistsB='${JSON.stringify(selected_artist_ids.toString())}' WHERE code='${code}'`
  }
  let query = db.query(sqlAr,(err,result)=>{
    if (err) throw err;
  });
  console.log('inserted selected artists in DB')
}


export async function insertRecSongDataToDB(user,code,recommended_tracks, recommended_tracks_urls, recommended_tracks_names, recommended_tracks_artists) {
  
  console.log('insertRecSongDataToDB... (recTracksA and recTracksB')
  recommended_tracks_names = recommended_tracks_names.toString().replaceAll("'",'&quot;');
  let recTracksObj = new Object()
  let currentObj = {'test': 'true'}
  for (let i=0; i<recommended_tracks.length; i++) {
    //currentObj = Object(i.toString(), JSON.stringify(recommended_tracks[i]))
    //console.log('rec_tracks[i]: ',recommended_tracks[i])
    let j = JSON.stringify(i);
    recTracksObj[j] = JSON.stringify(recommended_tracks[i]).replaceAll("'",'&quot;');

  }

  let recSongData = JSON.stringify([
    JSON.stringify(recommended_tracks_urls),
    recommended_tracks_names,
    JSON.stringify(recommended_tracks_artists)
    ])
  // console.log('recSongData: ',recSongData)
  
  let testObject = {'0': "tr\\ue"}
  // console.log('testObject: ',testObject)
  // console.log('JSON.stringify(testObject): ',JSON.stringify(testObject))
  // console.log('JSON.stringify(testObject).replace(): '),JSON.stringify(testObject).replace(/\\/g,'\\')
  // console.log('recTracksObj: ', recTracksObj)
  // console.log('JSON.stringify(recTracksObj): ', JSON.stringify(recTracksObj))
  let sql = '';

  if (user == 'a') {
    console.log('inserting recTracksA in DB...')
    // console.log('code: ',code)
    // console.log('JSON.stringify(recTracksObj): ', JSON.stringify(recTracksObj))
    //sql = `UPDATE spotify_table4 SET recTracksA= {"test":"true"} WHERE code='${code}'`;
    sql = `UPDATE spotify_table4 SET recTracksA='${JSON.stringify(recTracksObj).replaceAll(/\\/g, "\\\\")}' WHERE code='${code}'`
    // sql = `UPDATE spotify_table4 SET recTracksA='${JSON.stringify(recommended_tracks)}' WHERE code='${code}'`;

    let sql_no_single_quotes = sql.slice(38,sql.length-27)
    if (sql_no_single_quotes.includes("'")) {
      sql = sql.slice(0,38)+sql_no_single_quotes.replaceAll("'","&quot;") + sql.slice(sql.length-27,sql.length)
    }
    let query = db.query(sql,(err,result)=>{
      if (err) throw err;
    });
    console.log('inserted RecSongData in DB')
  }
  else {
    console.log('inserting recTracksB in DB...')
    sql = `UPDATE spotify_table4 SET recTracksB='${JSON.stringify(recTracksObj).replace(/\\/g, "\\\\")}' WHERE code='${code}'`
    let sql_no_single_quotes = sql.slice(38,sql.length-27)
    if (sql_no_single_quotes.includes("'")) {
      sql = sql.slice(0,38)+sql_no_single_quotes.replaceAll("'",'&quot;') + sql.slice(sql.length-27,sql.length)
    }
    let query = db.query(sql,(err,result)=>{
      if (err) throw err;
    });
  console.log('inserted RecSongData in DB')
  }
}


export async function getPlaylistNamesFromDB(currentCode) {
  console.log('getting playlist names from DB...')
  let sql_plnames = "SELECT sel_pl1, sel_pl2 FROM spotify_table4 WHERE code = "+db.escape(currentCode);
  let query = db.query(sql_plnames,(err,retreivedData)=>{
    curr_result = retreivedData;
  });
  curr_code = currentCode;
  setTimeout(getPlaylistNamesFromDB2,1000)
}

export async function getPlaylistNamesFromDB2() {
  curr_pl1 = []
  curr_pl2 = []
  let curr_result_1 = curr_result[0].sel_pl1
  let curr_result_2 = curr_result[0].sel_pl2
  curr_result_1 = curr_result_1.toString()
  curr_result_2 = curr_result_2.toString()
  curr_result_1 = curr_result_1.split(',')
  curr_result_2 = curr_result_2.split(',')
  console.log(curr_result_1)
  console.log(curr_result_2)

  for (var sel_pl1_itemid of curr_result_1) {
    let curr_pl_item = await getData("/playlists/"+sel_pl1_itemid)
    curr_pl1.push(curr_pl_item)
  }
  for (var sel_pl2_itemid of curr_result_2) {
    let curr_pl_item = await getData("/playlists/"+sel_pl2_itemid)
    curr_pl2.push(curr_pl_item)
  }
  setTimeout(getPlaylistNamesFromDB3,3000)
}

export async function getPlaylistNamesFromDB3() {
    pl1names = []
    pl2names = []
    for (var curr_pl1_item of curr_pl1) {
      pl1names.push(curr_pl1_item.name)
    }
    for (var curr_pl2_item of curr_pl2) {
      pl2names.push(curr_pl2_item.name)
    }
    renderVis2()
}

export async function addPlButtonClickToDB(currentCode) {
  // if currentCode is part of codeClicked, then code+clicked is already in DB
  if (clickedCode.includes(currentCode)) {
    // not the first time that addPlaylist button is clicked
    // in that case, replace vector2 currentCode+'clicked' in DB
    let sqlButtonClick1 = `UPDATE spotify_table4 SET vector2='clicked' WHERE code='${currentCode}'`;
    try {
      let queryButtonClick1 = db.query(sqlButtonClick1,(err,result)=>{
      });
    }
    catch (err) {
      console.log('error after addPlButtonClickToDB first time: ',err)
    }

  }
  else {
    // first time addPlaylist button is clicked
    // replace vector1 with currentCode+'clicked' in DB
    let sqlButtonClick2 = `UPDATE spotify_table4 SET vector1='clicked' WHERE code='${currentCode}'`;
    try {
      let queryButtonClick2 = db.query(sqlButtonClick2,(err,result)=>{
      });
    }
    catch (err) {
      console.log('error after addPlButtonClickToDB second time: ',err)
    }
  }
  clickedCode = currentCode
}
