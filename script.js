let player=document.getElementById("player");
let currentAudio=null;
let currentEpisode=null;

const data={
1:{img:"img/ep1.jpg",audio:"audio/ep1.mp3",text:"Foi aqui que tudo começou..."},
2:{img:"img/ep2.jpg",audio:"audio/ep2.mp3",text:"O mar, o sol e você."},
3:{img:"img/ep3.jpg",audio:"audio/ep3.mp3",text:"Com você tudo vira outro mundo."},
4:{img:"img/ep4.jpg",audio:"audio/ep4.mp3",text:"Entre flores e sentimentos."},
5:{img:"img/ep5.jpg",audio:"audio/ep5.mp3",text:"Cada detalhe com você é especial."},
6:{img:"img/ep6.jpg",audio:"audio/ep6.mp3",text:"Nosso amor no ritmo do rock."},
7:{img:"img/ep7.jpg",audio:"audio/ep7.mp3",text:"Momentos que fortalecem tudo."},
8:{img:"img/ep8.jpg",audio:"audio/ep8.mp3",text:"Hoje celebramos você ❤️"},
9:{img:"img/ep9.jpg",audio:"audio/ep9.mp3",text:"O melhor ainda está por vir..."},
secret:{img:"img/ep_secret.jpg",audio:"audio/secret.mp3",text:"Nic... Eu quero a história inteira com você. ❤️"}
};

function fadeInAudio(a){a.volume=0;a.play();let v=0;let f=setInterval(()=>{if(v<1){v+=0.05;a.volume=v;}else clearInterval(f);},100);}
function fadeOutAudio(a,cb){let v=a.volume;let f=setInterval(()=>{if(v>0){v-=0.05;a.volume=v;}else{clearInterval(f);a.pause();cb&&cb();}},100);}

function openEpisode(id){
currentEpisode=id;
document.getElementById("modal").style.display="flex";
document.getElementById("modalImg").src=data[id].img;
document.getElementById("modalText").innerText=data[id].text;

if(currentAudio){fadeOutAudio(currentAudio,()=>playNew(id));}
else playNew(id);
}

function playNew(id){
player.src=data[id].audio;
currentAudio=player;
fadeInAudio(player);
}

function nextEpisode(){
if(currentEpisode===8){openSecretEpisode();return;}
let next=currentEpisode+1;
if(next>9) next=1;
fadeOutAudio(currentAudio,()=>openEpisode(next));
}

function openSecretEpisode(){
currentEpisode="secret";
document.getElementById("modal").style.display="flex";
document.getElementById("modalImg").src=data.secret.img;
typeWriter(data.secret.text,document.getElementById("modalText"));
fadeOutAudio(currentAudio,()=>{player.src=data.secret.audio;fadeInAudio(player);});
}

function typeWriter(text,el){
el.innerHTML="";
let i=0;
function t(){if(i<text.length){el.innerHTML+=text[i];i++;setTimeout(t,30);}}
t();
}

function closeEpisode(){
document.getElementById("modal").style.display="none";
if(currentAudio){fadeOutAudio(currentAudio,()=>currentAudio=null);}
}
