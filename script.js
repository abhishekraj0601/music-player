let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");



let track_index = 0;
let isPlaying = false;
let updateTimer;


let curr_track = document.createElement("audio");


let track_list = [
    {
        name:"Turn Down",
        artist:"DJ Snake Lil Jon",
        image:"music.jpg",
        path:"../playlist/DJ Snake Lil Jon - Turn Down for What.mp3"
    },
    {
        name:"Taki Taki",
        artist:"DJ Snake Lil Jon",
        image:"music.jpg",
        path:"../playlist/DJ Snake - Taki Taki ft. Selena Gomez_ Ozuna_ Card(MP3_160K).mp3"
    },
    {
        name:"HEERO_vs_NAGIN_vs_HORN",
        artist:"BEND_PARTY_MIX",
        image:"music.jpg",
        path:"../playlist/HEERO_vs_NAGIN_vs_HORN_(BEND_PARTY_MIX_)_DJ_ANANT_CHITALI.mp3"
    }
    ,{
        name:"Otilia",
        artist:"Otilia Bruma",
        image:"music.jpg",
        path:"../playlist/Otilia - Bilionera (official video) ( 128kbps ).mp3"
    }
    ,{
        name:"Lonely",
        artist:"Emiway-Bantai",
        image:"music.jpg",
        path:"../playlist/Lonely-Emiway-Bantai.mp3"
    },
];


function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
   
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
     // Update details of the track
  track_art.style.backgroundImage =
  "url(" + track_list[track_index].image + ")";
track_name.textContent = track_list[track_index].name;
track_artist.textContent = track_list[track_index].artist;
now_playing.textContent =
  (track_index + 1) + "/" + track_list.length;

// Set an interval of 1000 milliseconds
// for updating the seek slider
updateTimer = setInterval(seekUpdate, 1000);

// Move to the next track if the current finishes playing
// using the 'ended' event
curr_track.addEventListener("ended", nextTrack);


}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }



  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
   
  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
   track_art.style.animation=" rotate 3s linear infinite";

    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-4x"></i>';
  }
   
  function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    track_art.style.animation=" none";
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-4x"></i>';
  }
   
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
   
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
   
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length - 1;
     
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }





  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
   
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
  }
   
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
  }
   
  function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  // Load the first track in the tracklist
loadTrack(track_index);



//  search---------
var srch_icon = document.querySelector(".fa-magnifying-glass");

// function openPage(){
//   var search1 = document.getElementById("search1").value;


//     if(search1 === "dog"){
//       alert("if")
//     }else{
//       alert("else")
//     }
// }

srch_icon.onclick = function(){
    var search1 = document.getElementById("search1").value;
     
 
    switch (search1) {
      case 'turn down':
        loadTrack(track_index =0);
        playTrack()    
        break;

        case 'lonely':
          loadTrack(track_index =4);
          playTrack() 
        break;

          case 'taki taki':
            loadTrack(track_index =1);
            playTrack() 
        break;

        case 'hero':
          loadTrack(track_index =2);
          playTrack() 
        break;

        case 'otilia':
          loadTrack(track_index =3);
          playTrack() 
        break;
    }

  }