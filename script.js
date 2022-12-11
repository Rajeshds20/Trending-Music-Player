console.log("Hello World!");

const basepath = "/songs/"

const audio = document.getElementById("audio");
const thumbnail = document.getElementById("thumbnail");
const sname = document.getElementById("songname");


const shuffle = document.getElementById("options1");
const previous = document.getElementById("options2");
const play = document.getElementById("options3");
const pause = document.getElementById("options4");
const next = document.getElementById("options5");
const listsongs = document.getElementById("options6");


const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const currentProgress = document.getElementById("current-progress");

// document.getElementById("player").style.display = "none";





var currsong = audio.src;
// console.log(currsong);
currsong = currsong.split('/');
currsong = currsong[currsong.length - 1];

const songlist = ['Inthandam.mp3', 'Samajavaragamana.mp3', 'Khairiyat.mp3', 'Kesariya.mp3', 'Heat_Waves.mp3', 'Night_Changes.mp3', 'Inthandam.mp3'];

const songdetails = {
    'Inthandam.mp3': {
        name: 'Inthandam',
        movie: 'Sita Ramam',
        image: 'https://i.ytimg.com/vi/dOKQeqGNJwY/maxresdefault.jpg'

    },

    'Samajavaragamana.mp3': {
        name: 'Samajavaragamana',
        movie: 'Ala Vaikuntapuramu lo',
        image: 'https://www.lyricbazar.com/wp-content/uploads/2020/08/samajawaragamana-song.jpg'
    },

    'Khairiyat.mp3': {
        name: 'Khairiyat',
        movie: 'Chhichhore',
        image: 'https://www.lyricszaade.com/wp-content/uploads/2020/07/khairiyat-chhichhore.jpg'
    },
    
    'Heat_Waves.mp3': {
        name: 'Heat Waves',
        movie: 'Glass Animals',
        image: 'https://i.ytimg.com/vi/48hULfubFBc/maxresdefault.jpg'
    },
    
    'Kesariya.mp3': {
        name: 'Kesariya',
        movie: 'Brahmastra',
        image: 'https://s.enavabharat.com/wp-content/uploads/2022/07/Kesariya-Brahmastra.jpg'
    },
    
    'Aashiqui_aa_gayi.mp3': {
        name: 'Aashiqui Aa Gayi',
        movie: 'Radhe Shyam',
        image: 'https://bollywoodproduct.in/wp-content/uploads/2021/11/maxresdefault-129-1068x601.jpg'
    },

    'Night_Changes.mp3': {
        name: 'Night Changes',
        movie: 'One Direction',
        image: 'https://i.ytimg.com/vi/7KPyunRIjr0/maxresdefault.jpg'
    },
}








play.addEventListener("click", () => {
    audio.play();
    play.style.display = "none";
    pause.style.display = "inline";
    console.log(currsong);
    maxDuration.innerText = timeFormatter(audio.duration);
});

pause.addEventListener("click", () => {
    audio.pause();
    pause.style.display = "none";
    play.style.display = "inline";
});

next.addEventListener("click", () => {
    var index = songlist.indexOf(currsong);
    index++;
    audio.src = basepath + songlist[index = index % songlist.length];
    console.log(index, songlist.length);
    currsong = songlist[index];
    thumbnail.src = songdetails[currsong].image;
    sname.innerText = songdetails[currsong].name;
    audio.play();
    play.style.display = "none";
    pause.style.display = "inline";
    console.log(currsong);
    // console.log(songdetails[currsong]);
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    };
});

previous.addEventListener("click", () => {
    var index = songlist.indexOf(currsong);
    index--;
    if (index == -1) {
        index = songlist.length - 1;
    }
    audio.src = basepath + songlist[index = index % songlist.length];
    audio.play();
    play.style.display = "none";
    pause.style.display = "inline";
    currsong = songlist[index];
    console.log(currsong);
    // console.log(songdetails[currsong]);
    thumbnail.src = songdetails[currsong].image;
    sname.innerText = songdetails[currsong].name;
});

shuffle.addEventListener("click", () => {
    var i1 = songlist.indexOf(currsong);
    currsong = songlist[Math.floor(Math.random() * songlist.length)];
    var i2 = songlist.indexOf(currsong);
    if (i1 === i2) {
        currsong = songlist[i2 + 1];
    }
    console.log(currsong);
    next.click();
});

listsongs.addEventListener("click", () => {
    if (document.getElementById("songslist").style.display == "inline") {
        document.getElementById("songslist").style.display = "none";
        document.getElementById("player").style.justifyContent = "center";
    }
    else {
        document.getElementById("player").style.justifyContent = "space-evenly";
        document.getElementById("songslist").style.display = "inline";
        var listOfSongs = 'PlayList : <br/><br/>';
        var i1 = songlist.indexOf(currsong);
        for (var i = i1; i <= songlist.length - 2; i++) {
            listOfSongs += songdetails[songlist[i]].name + '<br/>';
        }
        document.getElementById("songslist").innerHTML = listOfSongs;
        // document.getElementById("songslist").innerText = 'sample';
    }
});

audio.onended = () => {
    next.click();
};












let events = {
    mouse: {
        click: "click",
    },
    touch: {
        click: "touchstart",
    },
};

let deviceType = "";



const isTouchDevice = () => {
    try {
        //We try to create TouchEvent(it would fail for desktops and throw error)
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = Math.floor(timeInput % 60);
    second = second < 10 ? "0" + second : second;
    return `${minute}:${second}`;
};

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
    currentProgress.style.width =
        (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
});

isTouchDevice();
progressBar.addEventListener(events[deviceType].click, (event) => {
    //start of progressBar
    let coordStart = progressBar.getBoundingClientRect().left;
    //mouse click position
    let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
    currentProgress.style.width = progress * 100 + "%";
    //set time
    audio.currentTime = progress * audio.duration;
    //play
    audio.play();
    play.style.display = "none";
    pause.style.display = "inline";
});

audio.addEventListener("timeupdate", () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime);
});





