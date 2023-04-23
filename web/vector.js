import {selected_tracks, recommendationDoneTwoPart2, recommendationDoneOnePart2, getData, rendercodepage } from "./index.js";
import { currentVector, modifyCurrentVector } from "./database_functionality.js";
import * as db_func from "./database_functionality.js"
export {matchPercentagesPerPlaylist, top3ValuesTwo, top3characteristicsIndicesTwo, top3characteristicsNamesTwo,globalAverageVector, globalAllSongsVector, double_vector_final_tracks}

let globalAverageVector = []
let globalAllSongsVector = []
let double_vector_final_tracks = []
let top3ValuesTwo = []
let top3characteristicsIndicesTwo = []
let top3characteristicsNamesTwo = []
let matchPercentagesPerPlaylist = []
let all_playlist_vectors = []

export function cosinesim(A,B){
    var dotproduct=0;
    var mA=0;
    var mB=0;
    for(var i = 0; i < A.length; i++){
        dotproduct += (A[i] * B[i]);
        mA += (A[i]*A[i]);
        mB += (B[i]*B[i]);
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = (dotproduct)/((mA)*(mB))
    return similarity;
}

export async function generate_globalAverageVector_from_tracks(variance) {
    // only take first 20 tracks to generate the average songs characteristics vector
    let tracks = selected_tracks.slice(0,20)

    // mode variance: use Variance = average squared deviation of feature values
    // (variance = ROOT of SUM of the SQUARED DIFFERENCE of the feature value and the AVERAGE feature value / AMOUNT of songs)
    // variance is now set to false, such that the relative normalization is used
    const varianceBool = variance // there was a bug that the mode suddenly switched value... make constant for it.

    var longest_duration = 0
    var shortest_duration = 99999999999999999
    var loudest = 0
    var quietest = -99999
    var fastest_tempo = 0
    var slowest_tempo = 99999999999
    var highest_time_signature = 0
    var lowest_time_signature = 999999

    var sum_acousticness = 0
    var sum_danceability = 0
    var sum_energy = 0
    var sum_key = 0
    var sum_loudness = 0
    var sum_mode = 0
    var sum_speechiness = 0
    var sum_instrumentalness = 0
    var sum_liveness = 0
    var sum_tempo = 0
    var sum_duration_ms = 0
    var sum_time_signature = 0

    // case of empty tracks
    if (tracks == undefined || tracks.length == 0) {
        console.log('selected empty playlist -> vector will be all 0.5s')
        globalAverageVector = [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]
        setTimeout(rendercodepage,1000)
        return
    }
    for (var track of tracks) {
        track = track.track
        // GET request to get audio features from track
        if (track.id == undefined) {
            console.log('track id is undefined -> continue')
            continue;
        }
	var audioFeaturesData = await getData("/audio-features/" + track.id);
        var acousticness = audioFeaturesData.acousticness
	var danceability = audioFeaturesData.danceability
        var energy = audioFeaturesData.energy
        var key = audioFeaturesData.key
        var loudness = audioFeaturesData.loudness
        var mode = audioFeaturesData.mode
        var speechiness = audioFeaturesData.speechiness
        var instrumentalness = audioFeaturesData.instrumentalness
        var liveness = audioFeaturesData.liveness
        var tempo = audioFeaturesData.tempo
        var type = audioFeaturesData.type //not
        var id = audioFeaturesData.id //not
        var uri = audioFeaturesData.uri //not
        var track_href = audioFeaturesData.href //not
        var analysis_url = audioFeaturesData.analysis_url //not
        var duration_ms = audioFeaturesData.duration_ms
        var time_signature = audioFeaturesData.time_signature
        globalAllSongsVector.push([acousticness, danceability, energy, key, loudness, mode, speechiness, instrumentalness, liveness, tempo, duration_ms, time_signature])
        if (duration_ms<shortest_duration) {
            shortest_duration = duration_ms
        }
        if (duration_ms>longest_duration) {
            longest_duration = duration_ms
        }
        if (loudness<loudest) {
            loudest = loudness
        }
        if (loudness>quietest) {
            quietest = loudness
        }
        if (tempo>fastest_tempo) {
            fastest_tempo = tempo
        }
        if (tempo<slowest_tempo) {
            slowest_tempo = tempo
        }
        if (time_signature>highest_time_signature) {
            highest_time_signature = time_signature
        }
        if (time_signature<lowest_time_signature) {
            lowest_time_signature = time_signature
        }
        // average of feature values (avg = SUM of the feature values / AMOUNT of songs)
        sum_acousticness += acousticness
        sum_danceability += danceability
        sum_energy += energy
        sum_key += key
        sum_loudness += loudness
        sum_mode += mode
        sum_speechiness += speechiness
        sum_instrumentalness += instrumentalness
        sum_liveness += liveness
        sum_tempo += tempo
        sum_duration_ms += duration_ms
        sum_time_signature += time_signature
    }


    // average of feature values (avg = SUM of the feature values / AMOUNT of songs)
    var average_acousticness = sum_acousticness/tracks.length
    var average_danceability = sum_danceability/tracks.length
    var average_energy = sum_energy/tracks.length
    var average_key = sum_key/tracks.length
    var average_loudness = sum_loudness/tracks.length
    var average_mode = sum_mode/tracks.length
    var average_speechiness = sum_speechiness/tracks.length
    var average_instrumentalness = sum_instrumentalness/tracks.length
    var average_liveness = sum_liveness/tracks.length
    var average_tempo = sum_tempo/tracks.length
    var average_duration_ms = sum_duration_ms/tracks.length
    var average_time_signature = sum_time_signature/tracks.length

    // if mode variance: iterate again over the feature values to calculate the variance_sum
    // mode variance: use Variance = average squared deviation of feature values (variance = ROOT of SUM of the SQUARED DIFFERENCE of the feature value and the AVERAGE feature value / AMOUNT of songs)
    if (varianceBool == true) {
        var variance_sum_acousticness = 0
        var variance_sum_danceability = 0
        var variance_sum_energy = 0
        var variance_sum_key = 0
        var variance_sum_loudness = 0
        var variance_sum_mode = 0
        var variance_sum_speechiness = 0
        var variance_sum_instrumentalness = 0
        var variance_sum_liveness = 0
        var variance_sum_tempo = 0
        var variance_sum_duration_ms = 0
        var variance_sum_time_signature = 0
        for (var track of tracks) {
            // GET request to get audio features from track
            var audioFeaturesData = await getData("/audio-features/" + track.id);
            var acousticness = audioFeaturesData.acousticness
            var danceability = audioFeaturesData.danceability
            var energy = audioFeaturesData.energy
            var key = audioFeaturesData.key
            var loudness = audioFeaturesData.loudness
            var mode = audioFeaturesData.mode
            var speechiness = audioFeaturesData.speechiness
            var instrumentalness = audioFeaturesData.instrumentalness
            var liveness = audioFeaturesData.liveness
            var tempo = audioFeaturesData.tempo
            var type = audioFeaturesData.type //not
            var id = audioFeaturesData.id //not
            var uri = audioFeaturesData.uri //not
            var track_href = audioFeaturesData.href //not
            var analysis_url = audioFeaturesData.analysis_url //not
            var duration_ms = audioFeaturesData.duration_ms
            var time_signature = audioFeaturesData.time_signature

            variance_sum_acousticness += (acousticness-average_acousticness)**2
            variance_sum_danceability += (danceability-average_danceability)**2
            variance_sum_energy += (energy-average_energy)**2
            variance_sum_key += (key-average_key)**2
            variance_sum_loudness += (loudness-average_loudness)**2
            variance_sum_mode += (mode-average_mode)**2
            variance_sum_speechiness += (speechiness-average_speechiness)**2
            variance_sum_instrumentalness += (instrumentalness-average_instrumentalness)**2
            variance_sum_liveness += (liveness-average_liveness)**2
            variance_sum_tempo += (tempo-average_tempo)**2
            variance_sum_duration_ms += (duration_ms-average_duration_ms)**2
            variance_sum_time_signature += (time_signature-average_time_signature)**2
        }

        var variance_acousticness = Math.sqrt(variance_sum_acousticness)/tracks.length
        var variance_danceability = Math.sqrt(variance_sum_danceability)/tracks.length
        var variance_energy = Math.sqrt(variance_sum_energy)/tracks.length
        var variance_key = Math.sqrt(variance_sum_key)/tracks.length
        var variance_loudness = Math.sqrt(variance_sum_loudness)/tracks.length
        var variance_mode = Math.sqrt(variance_sum_mode)/tracks.length
        var variance_speechiness = Math.sqrt(variance_sum_speechiness)/tracks.length
        var variance_instrumentalness = Math.sqrt(variance_sum_instrumentalness)/tracks.length
        var variance_liveness = Math.sqrt(variance_sum_liveness)/tracks.length
        var variance_tempo = Math.sqrt(variance_sum_tempo)/tracks.length
        var variance_duration_ms = Math.sqrt(variance_sum_duration_ms)/tracks.length
        var variance_time_signature = Math.sqrt(variance_sum_time_signature)/tracks.length
    }

    // return (set currentVector) the overall vector ( left out "key" because average has no meaning here )
    // overall vector contains: acousticness, danceability, energy, loudness, mode, speechiness, instrumentalness, liveness, tempo, duration_ms, time_signature
    if (varianceBool == false) {
        globalAverageVector = [average_acousticness, average_danceability, average_energy,
            ((-average_loudness)-(-quietest))/(-loudest+quietest), average_mode, average_speechiness,
            average_instrumentalness, average_liveness,
            (average_tempo-slowest_tempo)/(fastest_tempo-slowest_tempo),
            (average_duration_ms-shortest_duration)/(longest_duration-shortest_duration),
            (average_time_signature-lowest_time_signature)/(highest_time_signature-lowest_time_signature)]
        if (globalAverageVector[10] == NaN || isNaN(globalAverageVector[10]) || globalAverageVector[10] == Infinity || globalAverageVector[10] == -Infinity) {
            globalAverageVector[10] = 0
        }
        console.log('globalAverageVector: ', globalAverageVector)
        console.log('wait 3sec to rendercodepage...')
        setTimeout(rendercodepage,3000)
        return
    }
    else if (varianceBool == true) {
        console.log('varianceBool == true!')
        globalGeneratedVector = [variance_acousticness, variance_danceability, variance_energy, variance_key, 
            variance_loudness, variance_mode, variance_speechiness, variance_instrumentalness, variance_liveness, 
            variance_tempo, variance_duration_ms, variance_time_signature]
        // console.log("\nvariance_vector: \n")
        // console.log(variance_vector)
        // db_func.modifyCurrentVector(currentVector)
        console.log('wait 3sec to rendercodepage...')
        setTimeout(rendercodepage,3000)
        return
    }
}


export async function generate_doubleVectorForFinalTracks(algo, finalTrackIdList) {
    double_vector_final_tracks = []
    for (var track_id of finalTrackIdList) {
        // GET request to get audio features from track
        var audioFeaturesData = await getData("/audio-features/" + track_id);
        var acousticness = audioFeaturesData.acousticness
        var danceability = audioFeaturesData.danceability
        var energy = audioFeaturesData.energy
        var key = audioFeaturesData.key
        var loudness = audioFeaturesData.loudness
        var mode = audioFeaturesData.mode
        var speechiness = audioFeaturesData.speechiness
        var instrumentalness = audioFeaturesData.instrumentalness
        var liveness = audioFeaturesData.liveness
        var tempo = audioFeaturesData.tempo
        var type = audioFeaturesData.type //not
        var id = audioFeaturesData.id //not
        var uri = audioFeaturesData.uri //not
        var track_href = audioFeaturesData.href //not
        var analysis_url = audioFeaturesData.analysis_url //not
        var duration_ms = audioFeaturesData.duration_ms
        var time_signature = audioFeaturesData.time_signature

        var curr_track_vector = [acousticness, danceability, energy, loudness, mode, speechiness, instrumentalness, liveness, tempo, duration_ms, time_signature]
        double_vector_final_tracks.push(curr_track_vector);
    }
// relativate everything in the double_vector between 0 and 1
    // find the highest and lowest values for each feature
    var highest_acousticness = 0
    var highest_danceability = 0
    var highest_energy = 0
    var highest_loudness = 0
    var highest_mode = 0
    var highest_speechiness = 0
    var highest_instrumentalness = 0
    var highest_liveness = 0
    var highest_tempo = 0
    var highest_duration_ms = 0
    var highest_time_signature = 0
    var lowest_acousticness = 99999999
    var lowest_danceability = 99999999
    var lowest_energy = 99999999
    var lowest_loudness = 99999999
    var lowest_mode = 99999999
    var lowest_speechiness = 99999999
    var lowest_instrumentalness = 99999999
    var lowest_liveness = 99999999
    var lowest_tempo = 99999999
    var lowest_duration_ms = 99999999
    var lowest_time_signature = 99999999
    for (var track_vector of double_vector_final_tracks) {
        if (track_vector[0] > highest_acousticness) {
            highest_acousticness = track_vector[0]
        }
        if (track_vector[1] > highest_danceability) {
            highest_danceability = track_vector[1]
        }
        if (track_vector[2] > highest_energy) {
            highest_energy = track_vector[2]
        }
        if (track_vector[3] > highest_loudness) {
            highest_loudness = track_vector[3]
        }
        if (track_vector[4] > highest_mode) {
            highest_mode = track_vector[4]
        }
        if (track_vector[5] > highest_speechiness) {
            highest_speechiness = track_vector[5]
        }
        if (track_vector[6] > highest_instrumentalness) {
            highest_instrumentalness = track_vector[6]
        }
        if (track_vector[7] > highest_liveness) {
            highest_liveness = track_vector[7]
        }
        if (track_vector[8] > highest_tempo) {
            highest_tempo = track_vector[8]
        }
        if (track_vector[9] > highest_duration_ms) {
            highest_duration_ms = track_vector[9]
        }
        if (track_vector[10] > highest_time_signature) {
            highest_time_signature = track_vector[10]
        }
        if (track_vector[0] < lowest_acousticness) {
            lowest_acousticness = track_vector[0]
        }
        if (track_vector[1] < lowest_danceability) {
            lowest_danceability = track_vector[1]
        }
        if (track_vector[2] < lowest_energy) {
            lowest_energy = track_vector[2]
        }
        if (track_vector[3] < lowest_loudness) {
            lowest_loudness = track_vector[3]
        }
        if (track_vector[4] < lowest_mode) {
            lowest_mode = track_vector[4]
        }
        if (track_vector[5] < lowest_speechiness) {
            lowest_speechiness = track_vector[5]
        }
        if (track_vector[6] < lowest_instrumentalness) {
            lowest_instrumentalness = track_vector[6]
        }
        if (track_vector[7] < lowest_liveness) {
            lowest_liveness = track_vector[7]
        }
        if (track_vector[8] < lowest_tempo) {
            lowest_tempo = track_vector[8]
        }
        if (track_vector[9] < lowest_duration_ms) {
            lowest_duration_ms = track_vector[9]
        }
        if (track_vector[10] < lowest_time_signature) {
            lowest_time_signature = track_vector[10]
        }
    }
    // now that we have the highest and lowest values for each feature, we can relativate
    for (var track_vector of double_vector_final_tracks) {
        track_vector[0] = (track_vector[0] - lowest_acousticness) / (highest_acousticness - lowest_acousticness)
        track_vector[1] = (track_vector[1] - lowest_danceability) / (highest_danceability - lowest_danceability)
        track_vector[2] = (track_vector[2] - lowest_energy) / (highest_energy - lowest_energy)
        track_vector[3] = (track_vector[3] - lowest_loudness) / (highest_loudness - lowest_loudness)
        track_vector[4] = (track_vector[4] - lowest_mode) / (highest_mode - lowest_mode)
        track_vector[5] = (track_vector[5] - lowest_speechiness) / (highest_speechiness - lowest_speechiness)
        track_vector[6] = (track_vector[6] - lowest_instrumentalness) / (highest_instrumentalness - lowest_instrumentalness)
        track_vector[7] = (track_vector[7] - lowest_liveness) / (highest_liveness - lowest_liveness)
        track_vector[8] = (track_vector[8] - lowest_tempo) / (highest_tempo - lowest_tempo)
        track_vector[9] = (track_vector[9] - lowest_duration_ms) / (highest_duration_ms - lowest_duration_ms)
        track_vector[10] = (track_vector[10] - lowest_time_signature) / (highest_time_signature - lowest_time_signature)
    }
    // if NaN values are present, replace them with 0.5
    console.log('double_vector_final_tracks before NaN check: ', double_vector_final_tracks)
    for (var track_vector of double_vector_final_tracks) {
        for (var i = 0; i < track_vector.length; i++) {
            if (Number.isNaN(track_vector[i]) || track_vector[i] == NaN || track_vector[i] == Infinity || track_vector[i] == -Infinity) {
                console.log('NaN')
		track_vector[i] = 0.5
            }
        }
    }
    console.log('after NaN check: ', double_vector_final_tracks)
    if (algo == 'One') {
        setTimeout(recommendationDoneOnePart2,1000)
    }
    else if (algo == 'Two') {
        setTimeout(recommendationDoneTwoPart2,1000)
    }
}

export function getMatchPercentagesForAllFinalTracks(user_vector) {
    console.log('user_vector: ', user_vector)
    let matchPercentagesForAllFinalTracks = []
    let low = 100000
    let high = 0
    console.log('double_vector_final_tracks: ', double_vector_final_tracks)
    for (var track_vector of double_vector_final_tracks) {
        var matchPercentage = cosinesim(track_vector, user_vector)
        if (matchPercentage < low) {
            low = matchPercentage
        }
        if (matchPercentage > high) {
            high = matchPercentage
        }
        // is always between 0.318 and 0.329
        matchPercentagesForAllFinalTracks.push(matchPercentage)
    }
    console.log('matchPercentagesForAllFinalTracks after cosinesim: ',matchPercentagesForAllFinalTracks)
    for (var i = 0; i < matchPercentagesForAllFinalTracks.length; i++) {
        matchPercentagesForAllFinalTracks[i] = (matchPercentagesForAllFinalTracks[i]-low)/(high-low)
    }
    console.log('matchpercentages relativated: ',matchPercentagesForAllFinalTracks)

    // now everything between 0 and 1. -> make smallest percentage is always 50%, largest 100%
    for (var i = 0; i < matchPercentagesForAllFinalTracks.length; i++) {
        matchPercentagesForAllFinalTracks[i] = Math.round((matchPercentagesForAllFinalTracks[i]*50)+50)
        if (matchPercentagesForAllFinalTracks[i] == NaN || matchPercentagesForAllFinalTracks[i] == undefined) {
            let min = Math.ceil(70)
            let max = Math.floor(80)
            matchPercentagesForAllFinalTracks[i] = Math.floor(Math.random() * (max - min) + min)
        }
    }
    let matchPercentagesForAllFinalTracksObject = toObject(matchPercentagesForAllFinalTracks)
    console.log('generated matchpercentages: ', matchPercentagesForAllFinalTracksObject)
    return matchPercentagesForAllFinalTracksObject
}

function toObject(list) {
    let current = {};
    for (var i = 0; i < list.length; ++i)
      current[i] = list[i];
    return current;
  }

export function getTop3CharacteristicsTwo(v1, v2) {
    // reinitialize some variables
    top3ValuesTwo = []
    top3characteristicsIndicesTwo = []
    top3characteristicsNamesTwo = []

    if (v1.length != v2.length) {
        console.log('user vectors are not the same length')
        return
    }
    console.log('getting the top 3 characteristics of both user vectors...')
    // put indices of the most similar 3 characteristics in top3characteristicsIndicesTwo
    let vectorDifferences = []
    //console.log('v1: ', v1)
    //console.log('v1.length: ', v1.length)
    for (var i = 0; i < v1.length; i++) {
        let diff = Math.abs(v1[i] - v2[i])
        vectorDifferences.push(diff)
    }
    //console.log('vectorDifferences: ', vectorDifferences)
    for (var i = 0; i < 3; i++) {
        let min = Math.min(...vectorDifferences)
        let index = vectorDifferences.indexOf(min)
        top3characteristicsIndicesTwo.push(index)
        vectorDifferences[index] = 9999999
    }
    for (var i = 0; i < top3characteristicsIndicesTwo.length; i++) {
        let average = (v1[top3characteristicsIndicesTwo[i]] + v2[top3characteristicsIndicesTwo[i]])/2
        top3ValuesTwo.push(average)
    }
    //console.log('top3Values: ', top3ValuesTwo)
    //console.log('top3characteristicsIndicesTwo: ', top3characteristicsIndicesTwo)
    for (var j = 0; j < top3characteristicsIndicesTwo.length; j++) {
        if (top3characteristicsIndicesTwo[j] == 0) {
            top3characteristicsNamesTwo.push('acousticness')
        }
        else if (top3characteristicsIndicesTwo[j] == 1) {
            top3characteristicsNamesTwo.push('danceability')
        }
        else if (top3characteristicsIndicesTwo[j] == 2) {
            top3characteristicsNamesTwo.push('energy')
        }
        else if (top3characteristicsIndicesTwo[j] == 3) {
            top3characteristicsNamesTwo.push('loudness')
        }
        else if (top3characteristicsIndicesTwo[j] == 4) {
            top3characteristicsNamesTwo.push('mode')
        }
        else if (top3characteristicsIndicesTwo[j] == 5) {
            top3characteristicsNamesTwo.push('speechiness')
        }
        else if (top3characteristicsIndicesTwo[j] == 6) {
            top3characteristicsNamesTwo.push('instrumentalness')
        }
        else if (top3characteristicsIndicesTwo[j] == 7) {
            top3characteristicsNamesTwo.push('liveness')
        }
        else if (top3characteristicsIndicesTwo[j] == 8) {
            top3characteristicsNamesTwo.push('tempo')
        }
        else if (top3characteristicsIndicesTwo[j] == 9) {
            top3characteristicsNamesTwo.push('duration_ms')
        }
        else if (top3characteristicsIndicesTwo[j] == 10) {
            top3characteristicsNamesTwo.push('time_signature')
        }
    }
    console.log('top3characteristicsNamesTwo: ', top3characteristicsNamesTwo)
}


// this function generates the variable: "matchPercentagesPerPlaylist"
export async function make_percentages_per_playlist(tracksPerSelectedPlaylist) {
    console.log('amount of selected playlists: ',tracksPerSelectedPlaylist.length)
    // first generate vectors per playlist and put in variable "all_playlist_vectors"
    all_playlist_vectors = []
    for (var curr_pl_tracks of tracksPerSelectedPlaylist) {
        // shorten to 10 tracks to save time
        curr_pl_tracks = curr_pl_tracks.slice(0,10)
        generate_vector_from_tracks_and_add_it(curr_pl_tracks)
    }
    // the more playlists selected, the longer it takes -> 1 seconds per playlist
    console.log('waiting ', 1000* tracksPerSelectedPlaylist.length,'sec to go to make_percentages_per_playlist2...')
    setTimeout(make_percentages_per_playlist2, 1000*tracksPerSelectedPlaylist.length)
}

export async function make_percentages_per_playlist2() {
    matchPercentagesPerPlaylist = []
    console.log('seconds over! all_playlist_vectors: ', all_playlist_vectors)
    // uses function "getMatchPercentagesForAllFinalTracks(user_vector)"
    for (var playlist_vector of all_playlist_vectors) {
        let current_pl_matchPercentages =
            getMatchPercentagesForCurrentPlaylist(playlist_vector)
        matchPercentagesPerPlaylist.push(current_pl_matchPercentages)
    }
}

export function getMatchPercentagesForCurrentPlaylist(playlist_vector) {
    let matchPercentagesForCurrentPlaylist = []
    let low = 100000
    let high = 0
    for (var track_vector of double_vector_final_tracks) {
        var matchPercentage = cosinesim(track_vector, playlist_vector)
        if (matchPercentage < low) {
            low = matchPercentage
        }
        if (matchPercentage > high) {
            high = matchPercentage
        }
        // is always between 0.318 and 0.329
        matchPercentagesForCurrentPlaylist.push(matchPercentage)
    }
    for (var i = 0; i < matchPercentagesForCurrentPlaylist.length; i++) {
        matchPercentagesForCurrentPlaylist[i] = (matchPercentagesForCurrentPlaylist[i]-low)/(high-low)
    }

    // now everything between 0 and 1. -> make smallest percentage is always 50%, largest 100%
    for (var i = 0; i < matchPercentagesForCurrentPlaylist.length; i++) {
        matchPercentagesForCurrentPlaylist[i] = Math.round((matchPercentagesForCurrentPlaylist[i]*50)+50)
        if (i != matchPercentagesForCurrentPlaylist.length-1) {
            if (matchPercentagesForCurrentPlaylist[i] < 85) {
                matchPercentagesForCurrentPlaylist[i] += getRandomInt(10)
            }
            else {
                matchPercentagesForCurrentPlaylist[i] -= getRandomInt(10)
            }
        }
    }
    let matchPercentagesForCurrentPlaylistObject = toObject(matchPercentagesForCurrentPlaylist)

    return matchPercentagesForCurrentPlaylistObject
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
















// new version to use for percentages
// add resulting vector to variable "all_playlist_vectors"
export async function generate_vector_from_tracks_and_add_it(tracks) {

    var longest_duration = 0.5
    var shortest_duration = 99999999999999999
    var loudest = 0.5
    var quietest = -99999
    var fastest_tempo = 0.5
    var slowest_tempo = 99999999999
    var highest_time_signature = 0.5
    var lowest_time_signature = 999999
    var sum_acousticness = 0.5
    var sum_danceability = 0.5
    var sum_energy = 0.5
    var sum_key = 0.5
    var sum_loudness = 0.5
    var sum_mode = 0.5
    var sum_speechiness = 0.5
    var sum_instrumentalness = 0.5
    var sum_liveness = 0.5
    var sum_tempo = 0.5
    var sum_duration_ms = 0.5
    var sum_time_signature = 0.5

    // case of empty tracks
    if (tracks == undefined || tracks.length == 0) {
        console.log('selected empty playlist -> vector will be all 0.5s')
        all_playlist_vectors.push([0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5])
        return
    }
    for (var track of tracks) {
        track = track.track
        if (track.id == undefined) {
            continue;
        }
        // GET request to get audio features from track
        var audioFeaturesData = await getData("/audio-features/" + track.id);
        var acousticness = audioFeaturesData.acousticness
        var danceability = audioFeaturesData.danceability
        var energy = audioFeaturesData.energy
        var key = audioFeaturesData.key
        var loudness = audioFeaturesData.loudness
        var mode = audioFeaturesData.mode
        var speechiness = audioFeaturesData.speechiness
        var instrumentalness = audioFeaturesData.instrumentalness
        var liveness = audioFeaturesData.liveness
        var tempo = audioFeaturesData.tempo
        var type = audioFeaturesData.type //not
        var id = audioFeaturesData.id //not
        var uri = audioFeaturesData.uri //not
        var track_href = audioFeaturesData.href //not
        var analysis_url = audioFeaturesData.analysis_url //not
        var duration_ms = audioFeaturesData.duration_ms
        var time_signature = audioFeaturesData.time_signature
        globalAllSongsVector.push([acousticness, danceability, energy, key, loudness, mode, speechiness, instrumentalness, liveness, tempo, duration_ms, time_signature])
        if (duration_ms<shortest_duration) {
            shortest_duration = duration_ms
        }
        if (duration_ms>longest_duration) {
            longest_duration = duration_ms
        }
        if (loudness<loudest) {
            loudest = loudness
        }
        if (loudness>quietest) {
            quietest = loudness
        }
        if (tempo>fastest_tempo) {
            fastest_tempo = tempo
        }
        if (tempo<slowest_tempo) {
            slowest_tempo = tempo
        }
        if (time_signature>highest_time_signature) {
            highest_time_signature = time_signature
        }
        if (time_signature<lowest_time_signature) {
            lowest_time_signature = time_signature
        }
        // average of feature values (avg = SUM of the feature values / AMOUNT of songs)
        sum_acousticness += acousticness
        sum_danceability += danceability
        sum_energy += energy
        sum_key += key
        sum_loudness += loudness
        sum_mode += mode
        sum_speechiness += speechiness
        sum_instrumentalness += instrumentalness
        sum_liveness += liveness
        sum_tempo += tempo
        sum_duration_ms += duration_ms
        sum_time_signature += time_signature
    }
 
    // average of feature values (avg = SUM of the feature values / AMOUNT of songs)
    var average_acousticness = sum_acousticness/tracks.length
    var average_danceability = sum_danceability/tracks.length
    var average_energy = sum_energy/tracks.length
    var average_key = sum_key/tracks.length
    var average_loudness = sum_loudness/tracks.length
    var average_mode = sum_mode/tracks.length
    var average_speechiness = sum_speechiness/tracks.length
    var average_instrumentalness = sum_instrumentalness/tracks.length
    var average_liveness = sum_liveness/tracks.length
    var average_tempo = sum_tempo/tracks.length
    var average_duration_ms = sum_duration_ms/tracks.length
    var average_time_signature = sum_time_signature/tracks.length
    // return (set currentVector) the overall vector ( left out "key" because average has no meaning here )
    // overall vector contains: acousticness, danceability, energy, loudness, mode, speechiness, instrumentalness, liveness, tempo, duration_ms, time_signature
    let curr_pl_vector = [average_acousticness, average_danceability, average_energy, 
        ((-average_loudness)-(-quietest))/(-loudest+quietest), average_mode, average_speechiness, 
        average_instrumentalness, average_liveness, 
        (average_tempo-slowest_tempo)/(fastest_tempo-slowest_tempo), 
        (average_duration_ms-shortest_duration)/(longest_duration-shortest_duration), 
        (average_time_signature-lowest_time_signature)/(highest_time_signature-lowest_time_signature)]
    for (var i=0; i<curr_pl_vector.length; i++) {
        if (curr_pl_vector[i] == NaN || isNaN(curr_pl_vector[i]) || curr_pl_vector[i] == Infinity || curr_pl_vector[i] == -Infinity) {
            console.log('NaN or Infinity found in curr_pl_vector at index ' + i + ' -> set to 0.5 (default value)')
            curr_pl_vector[i] = 0.5
        }
    }
    if (curr_pl_vector[10] == NaN || isNaN(curr_pl_vector[10]) || curr_pl_vector[10] == Infinity || curr_pl_vector[10] == -Infinity) {
        curr_pl_vector[10] = 0
    }
    all_playlist_vectors.push(curr_pl_vector)
    return
}
