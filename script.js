const songList = [
    {
        id: 1,
        name: 'Song 1',
        artist: 'artist 1',
        coverimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfMfW6Gb7hyUlCXwAcaPEdBVhSUYkp7Inwc_0lHku_JJ1vdIPQ8bf4gyqXRT_ZVnkXo-I&usqp=CAU',
        songsource: 'songs/song1.mp3'
    },
    {
        id: 1,
        name: 'Song 2',
        artist: 'artist 2',
        coverimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCorAdcjgA2soZz9-Jr-ODAKPni470OSQES5NqRa1P1SJvCBDKUXQ-7XG-LNQl0IZpQBc&usqp=CAU',
        songsource: 'songs/song2.mp3'
    },
    {
        id: 1,
        name: 'Song 3',
        artist: 'artist 3',
        coverimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdMsF6SIWaprRHbqXc-hKDKYc6Lqiso8fsF82cYXXPXdijtgku4ZCsZJ31CPGTR5RidJA&usqp=CAU',
        songsource: 'songs/song3.mp3'
    },
    {
        id: 1,
        name: 'Song 4',
        artist: 'artist 5',
        coverimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjACp1duc-chlaun_oFKNjUhKoNc9SE8urtva8NLZgqtQp0B8ox2lv2fTtcKBq_hLhQE&usqp=CAU',
        songsource: 'songs/song4.mp3'
    },
    {
        id: 1,
        name: 'Song 5',
        artist: 'artist 5',
        coverimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5P4ky2ieWctWglyhVIZXWiU5-06om23psxG7WDW0u_lyWxgJ1N36nr62z1BdNlM5K_tc&usqp=CAU',
        songsource: 'songs/song5.mp3'
    }
]

const audio = document.querySelector('#audio_player');
const playpausebtn = document.getElementById('classchange');
const btnPlay = document.getElementById('play');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const songName = document.getElementById('name');
const artist = document.getElementById('artist');
const image = document.getElementById('coverImage');
const curDur = document.getElementById('cur_duration');
const fullDuration = document.getElementById('duration');
const progressBar = document.getElementById('prog');

var isplaying = false;

btnPlay.addEventListener('click', () => {
    if (!isplaying) {
        audio.play()
        playpausebtn.classList.replace("fa-play", "fa-pause");
        image.classList.add('anime');
        isplaying = true;
    } else {
        audio.pause();
        playpausebtn.classList.replace("fa-pause", "fa-play");
        image.classList.remove('anime');
        isplaying = false;
    }
});

var index = 0;

const loadSongs = (songs) => {
    songName.innerHTML = songs.name;
    artist.innerHTML = songs.artist;
    audio.src = songs.songsource;
    image.src = songs.coverimage;
    audio.play();
    playpausebtn.classList.replace("fa-play", "fa-pause");
    image.classList.add('anime');
    isplaying = true;
}

loadSongs(songList[index]);

const prevSong = () => {
    index  = (index + 1 % songList.length) % songList.length;
    loadSongs(songList[index]);
}
const nextSong = () => {
    index = (index + 1) % songList.length;
    loadSongs(songList[index]);
}

audio.addEventListener('timeupdate', (event) => {
    const {currentTime, duration} = event.srcElement;

    var min_duration = Math.floor(duration / 60);
    var sec_duration = Math.floor(duration % 60);

    var min_cur_duration = Math.floor(currentTime / 60);
    var sec_cur_duration = Math.floor(currentTime % 60);

    if(currentTime === duration){
        nextSong();
    }
    if(currentTime && duration){
        if(sec_duration < 10){
            sec_duration = "0" + sec_duration;
        }
        if(sec_cur_duration < 10){
            sec_cur_duration = "0" + sec_cur_duration;
        }

        curDur.innerHTML = `${min_cur_duration}:${sec_cur_duration}`;
        fullDuration.innerHTML = `${min_duration}:${sec_duration}`;
    }

    let currentProgressBar = ( currentTime / duration) * 100;
    prog.style.width = `${currentProgressBar}%`;
});

btnPrev.addEventListener('click', prevSong);
btnNext.addEventListener('click', nextSong);