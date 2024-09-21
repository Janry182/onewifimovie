
const YTPlayerOverlay = document.querySelector(".youtube-player-overlay");
const YTLinks = document.querySelectorAll(".youtube-link");
const YTPlayerPopup = document.querySelector(".youtube-player-popup iframe");
const closeButton2 = document.getElementById('close-btn2');
const watchNow = document.querySelectorAll('.watch-now-btn2');
const fullscreenButton2 = document.getElementById('fullscreen-btn2');


var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
//var $ = document.querySelector.bind(document);

/*YTLinks.forEach(link => {
  link.addEventListener("click",() => {

    YTPlayerOverlay.classList.add("active");
  });
});*/


/*fullscreenButton2.addEventListener("click", function() {

//YTPlayerOverlay.classList.remove("active");
YTPlayerOverlay.style.display = 'none';
});*/


  function onYouTubeIframeAPIReady() {
    player = new YT.Player('video2', {
        
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
    });
  }


watchNow.forEach(link => {
link.addEventListener("click", function() {
  
    YTPlayerOverlay.classList.add("active");
    let videoLink =`https://www.youtube.com/embed/${link.dataset.link}`;
    YTPlayerPopup.src = videoLink;


  });
});

  /*function onYouTubeIframeAPIReady() {
  var player;
  player = new YT.Player('video2', {
    videoId: 'M7lc1UVf-VE',
    playerVars: { 'autoplay': 1, 'controls': 0 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}*/

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      //player is playing


    } 
    else
     {
      //player is paused
    }
}
  function onPlayerReady(event) {
   // document.getElementById('video2').style.borderColor = '#FF6D00';
    
    //iframe = $('#video2');
  //  setupListener(); 
   event.target.setVolume(100);

  
  }
  /*function changeBorderColor(playerStatus) {
    var color;
    if (playerStatus == -1) {
      color = "#37474F"; // unstarted = gray
    } else if (playerStatus == 0) {
      color = "#FFFF00"; // ended = yellow
    } else if (playerStatus == 1) {
      color = "#33691E"; // playing = green
    } else if (playerStatus == 2) {
      color = "#DD2C00"; // paused = red
    } else if (playerStatus == 3) {
      color = "#AA00FF"; // buffering = purple
    } else if (playerStatus == 5) {
      color = "#FF6DOO"; // video cued = orange
    }
    if (color) {
      document.getElementById('video2').style.borderColor = color;
    }
  }
  function onPlayerStateChange(event) {
    changeBorderColor(event.data);
  }*/

  


    closeButton2.addEventListener("click", function() {
      //YTPlayerOverlay.style.display = 'none';
      YTPlayerOverlay.classList.remove("active");
        player.stopVideo();
    });

 YTPlayerOverlay.addEventListener("click", function() {
      //YTPlayerOverlay.style.display = 'none';
      YTPlayerOverlay.classList.remove("active");
        player.stopVideo();
    });

/*function setupListener (){
$('fullscreenButton2').addEventListener('click', playFullscreen);
}

function playFullscreen (){
  //player.playVideo();//won't work on mobile
  
  var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
  if (requestFullScreen) {
    requestFullScreen.bind(iframe)();
  }
}*/

function fullScreen() {

    var e = document.getElementById("video2");
    if (e.requestFullscreen) {
        e.requestFullscreen();
    } else if (e.webkitRequestFullscreen) {
        e.webkitRequestFullscreen();
    } else if (e.mozRequestFullScreen) {
        e.mozRequestFullScreen();
    } else if (e.msRequestFullscreen) {
        e.msRequestFullscreen();
    }
    
}


fullscreenButton2.addEventListener('click', function() {
        fullScreen();
    });