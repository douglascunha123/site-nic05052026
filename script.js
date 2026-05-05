// ================================
// 🎧 ELEMENTOS DOM
// ================================
const player = document.getElementById("player");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalText = document.getElementById("modalText");

// ================================
// 🎬 ESTADO GLOBAL
// ================================
let currentAudio = null;
let currentEpisode = null;

// ================================
// 📺 DADOS DOS EPISÓDIOS
// ================================
const data = {
    1:{img:"img/ep1.jpg",audio:"audio/ep1.mp3",text:"Foi aqui que tudo começou..."},
    2:{img:"img/ep2.jpg",audio:"audio/ep2.mp3",text:"O mar, o sol e você."},
    3:{img:"img/ep3.jpg",audio:"audio/ep3.mp3",text:"Com você tudo vira outro mundo."},
    4:{img:"img/ep4.jpg",audio:"audio/ep4.mp3",text:"Entre flores e sentimentos."},
    5:{img:"img/ep5.jpg",audio:"audio/ep5.mp3",text:"Cada detalhe com você é especial."},
    6:{img:"img/ep6.jpg",audio:"audio/ep6.mp3",text:"Nosso amor no ritmo do rock."},
    7:{img:"img/ep7.jpg",audio:"audio/ep7.mp3",text:"Momentos que fortalecem tudo."},
    8:{img:"img/ep8.jpg",audio:"audio/ep8.mp3",text:"Hoje celebramos você ❤️"},
    9:{
        img:"img/ep9.jpg",
        audio:"audio/ep9.mp3",
        text:`Se eu pudesse escolher mil vezes…

eu ainda escolheria você.

Porque o meu futuro…

tem o seu nome. ❤️`
    }
};

// ================================
// 🔊 ÁUDIO (FADE SUAVE)
// ================================
function fadeInAudio(audio){
    if(!audio) return;

    audio.volume = 0;
    audio.play().catch(()=>{});

    let v = 0;
    const fade = setInterval(()=>{
        if(v < 1){
            v += 0.05;
            audio.volume = v;
        } else {
            clearInterval(fade);
        }
    },100);
}

function fadeOutAudio(audio, callback){
    if(!audio){
        callback && callback();
        return;
    }

    let v = audio.volume;

    const fade = setInterval(()=>{
        if(v > 0){
            v -= 0.05;
            audio.volume = Math.max(0, v);
        } else {
            clearInterval(fade);
            audio.pause();
            callback && callback();
        }
    },100);
}

// ================================
// 🎬 ABRIR EPISÓDIO
// ================================
function openEpisode(id){
    currentEpisode = id;

    modal.style.display = "flex";
    modalImg.src = data[id].img;

    // ✍️ efeito especial no episódio 9
    if(id === 9){
        typeWriter(data[id].text, modalText);
    } else {
        modalText.innerText = data[id].text;
    }

    // 🎵 troca de áudio com fade
    if(currentAudio){
        fadeOutAudio(currentAudio, ()=> playNew(id));
    } else {
        playNew(id);
    }
}

// ================================
// ▶️ PLAY NOVO ÁUDIO
// ================================
function playNew(id){
    player.src = data[id].audio;
    currentAudio = player;
    fadeInAudio(player);
}

// ================================
// ⏭ PRÓXIMO EPISÓDIO
// ================================
function nextEpisode(){
    if(currentEpisode === null) return;

    // 👉 episódio secreto após o 8
    if(currentEpisode === 8){
        openSecretEpisode();
        return;
    }

    let next = currentEpisode + 1;
    if(next > 9) next = 1;

    fadeOutAudio(currentAudio, ()=> openEpisode(next));
}

// ================================
// 🔐 EPISÓDIO SECRETO
// ================================
function openSecretEpisode(){
    currentEpisode = "secret";

    modal.style.display = "flex";
    modalImg.src = "img/ep_secret.jpg";

    typeWriter(`Nic...

eu não quero só momentos com você...

eu quero a vida inteira.

❤️`, modalText);

    fadeOutAudio(currentAudio, ()=>{
        player.src = "audio/secret.mp3";
        currentAudio = player;
        fadeInAudio(player);
    });

    // 🎬 chamar final depois de alguns segundos
    setTimeout(showFinalScreen, 8000);
}

// ================================
// ⌨️ EFEITO MÁQUINA DE ESCREVER
// ================================
function typeWriter(text, element){
    let i = 0;
    element.innerHTML = "";

    function typing(){
        if(i < text.length){
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 30);
        }
    }

    typing();
}

// ================================
// ❌ FECHAR EPISÓDIO
// ================================
function closeEpisode(){
    modal.style.display = "none";

    if(currentAudio){
        fadeOutAudio(currentAudio, ()=>{
            currentAudio = null;
        });
    }
}

// ================================
// 🏠 VOLTAR AO INÍCIO
// ================================
function goHome(){
    document.body.classList.add("fade-out");

    setTimeout(()=>{
        window.location.href = "index.html";
    },600);
}

// ================================
// 🎬 FINAL INTERATIVO
// ================================
function showFinalScreen(){
    modal.style.display = "none";

    const final = document.getElementById("finalScreen");
    if(final){
        final.style.display = "flex";
    }
}

function acceptAnswer(){
    const final = document.getElementById("finalScreen");

    final.innerHTML = `
        <div class="final-content">
            <h1>❤️</h1>
            <p>
                Então pode se preparar…
                <br><br>
                porque essa história ainda vai ter
                muitos capítulos incríveis.
                <br><br>
                E todos eles… com você.
            </p>
        </div>
    `;
}

// ================================
// 🎧 MINI PLAYER
// ================================
const playlist = [
    "audio/ep1.mp3",
    "audio/ep2.mp3",
    "audio/ep3.mp3",
    "audio/ep4.mp3",
    "audio/ep5.mp3",
    "audio/ep6.mp3",
    "audio/ep7.mp3",
    "audio/ep8.mp3",
    "audio/ep9.mp3",
    "audio/secret.mp3"
];

let trackIndex = 0;
let isPlaying = false;

function loadTrack(index){
    trackIndex = index;

    player.src = playlist[index];

    const name = playlist[index]
        .split("/")
        .pop()
        .replace(".mp3", "")
        .replace("ep", "Episódio ");

    const label = document.getElementById("trackName");
    if(label){
        label.innerText = name;
    }
}

function togglePlay(){
    if(!isPlaying){
        player.play();
        isPlaying = true;
    } else {
        player.pause();
        isPlaying = false;
    }
}

function nextTrack(){
    loadTrack((trackIndex + 1) % playlist.length);
    player.play();
}

function prevTrack(){
    loadTrack((trackIndex - 1 + playlist.length) % playlist.length);
    player.play();
}

// ================================
// 🚀 INICIALIZAÇÃO
// ================================
document.addEventListener("DOMContentLoaded", ()=>{
    
    // clicar nos episódios
    document.querySelectorAll(".episode-card").forEach((card, index)=>{
        card.addEventListener("click", ()=> openEpisode(index + 1));
    });

    // botão fechar
    const closeBtn = document.querySelector(".close");
    if(closeBtn){
        closeBtn.addEventListener("click", closeEpisode);
    }

    // botão próximo
    const nextBtn = document.getElementById("nextBtn");
    if(nextBtn){
        nextBtn.addEventListener("click", nextEpisode);
    }

    // iniciar player
    loadTrack(0);
});