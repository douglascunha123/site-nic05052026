let player = document.getElementById("player");
let currentAudio = null;
let currentEpisode = null;

const data = {
1:{img:"img/ep1.jpg",audio:"audio/ep1.mp3",text:"Foi aqui que tudo começou..."},
2:{img:"img/ep2.jpg",audio:"audio/ep2.mp3",text:"O mar, o sol e você."},
3:{img:"img/ep3.jpg",audio:"audio/ep3.mp3",text:"Com você tudo vira outro mundo."},
4:{img:"img/ep4.jpg",audio:"audio/ep4.mp3",text:"Entre flores e sentimentos."},
5:{img:"img/ep5.jpg",audio:"audio/ep5.mp3",text:"Cada detalhe com você é especial."},
6:{img:"img/ep6.jpg",audio:"audio/ep6.mp3",text:"Nosso amor no ritmo do rock."},
7:{img:"img/ep7.jpg",audio:"audio/ep7.mp3",text:"Momentos que fortalecem tudo."},
8:{img:"img/ep8.jpg",audio:"audio/ep8.mp3",text:"Hoje celebramos você ❤️"},
9: {
    img: "img/ep9.jpg",
    audio: "audio/ep9.mp3",
    text: `Se eu pudesse escolher mil vezes…

eu ainda escolheria você.

Hoje, amanhã e em todos os capítulos
que ainda vamos viver.

Porque o meu futuro…

tem o seu nome. ❤️`
Parce que je t’aime. ❤️`
};

function fadeInAudio(a){
a.volume=0;
a.play();
let v=0;
let f=setInterval(()=>{
if(v<1){v+=0.05;a.volume=v;}
else clearInterval(f);
},100);
}

function fadeOutAudio(a,cb){
let v=a.volume;
let f=setInterval(()=>{
if(v>0){v-=0.05;a.volume=v;}
else{clearInterval(f);a.pause();cb&&cb();}
},100);
}

function openEpisode(id){
currentEpisode=id;
modal.style.display="flex";
modalImg.src=data[id].img;
modalText.innerText=data[id].text;

if(currentAudio){
fadeOutAudio(currentAudio,()=>playNew(id));
}else playNew(id);
}

function playNew(id){
player.src=data[id].audio;
currentAudio=player;
fadeInAudio(player);
}

function nextEpisode(){
let next=currentEpisode+1;
if(next>9) next=1;
fadeOutAudio(currentAudio,()=>openEpisode(next));
}

function closeEpisode(){
modal.style.display="none";
if(currentAudio){
fadeOutAudio(currentAudio,()=>currentAudio=null);
}
}

/* EVENTOS */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalText = document.getElementById("modalText");

document.querySelectorAll(".episode-card").forEach((card, index)=>{
card.addEventListener("click", ()=>openEpisode(index+1));
});

document.querySelector(".close").addEventListener("click", closeEpisode);
document.getElementById("nextBtn").addEventListener("click", nextEpisode);
