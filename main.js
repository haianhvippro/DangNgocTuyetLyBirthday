const envelope=document.getElementById("envelope");
const letter=document.getElementById("letter");
const typing=document.getElementById("typing");
const sound=document.getElementById("openSound");
const bgMusic=document.getElementById("bgMusic");

const text=`Chúc mừng sinh nhật em 🎂
Cảm ơn em vì đã đến bên anh
và mang theo yêu thương 💖

Mong rằng chúng ta sẽ còn
rất nhiều sinh nhật bên nhau nữa ✨
Yêu em nhiều lắm luôn áaa💕💕`;

let opened=false;

envelope.onclick=()=>{
    if(opened) return;
    opened=true;

    envelope.classList.remove("shake");
    sound.play();
    envelope.classList.add("open");

    setTimeout(()=>{
        letter.classList.remove("hidden");
        letter.style.animation="letterUp 1.6s ease forwards";
    },900);

    setTimeout(()=>envelope.classList.add("drop"),2200);
    setTimeout(startTyping,2600);
};

/* TYPING + MUSIC */
function startTyping(){
    let i=0;
    typing.innerHTML="";

    bgMusic.volume=0;
    bgMusic.play();
    let v=0;
    const fade=setInterval(()=>{
        if(v<0.4){v+=0.02;bgMusic.volume=v}
        else clearInterval(fade);
    },100);

    (function type(){
        if(i<text.length){
            if(text[i]==="\n"){
                spawnHeart();
                shakeLetter();
                typing.innerHTML+="<br>";
                i++;setTimeout(type,300);return;
            }
            typing.innerHTML+=text[i];
            i++;setTimeout(type,35);
        }
    })();
}

/* HEART ON LINE */
function spawnHeart(){
    const h=document.createElement("div");
    h.innerText="💗";
    h.style.position="absolute";
    h.style.left="50%";
    h.style.top="50%";
    h.style.transform="translate(-50%,-50%)";
    h.style.fontSize="400px";
    h.style.animation="heartPop 1.2s ease forwards";
    h.style.zIndex=25;
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1200);
}
function shakeLetter(){
    letter.animate([
        {transform:"translate(-50%,-50%) rotate(0)"},
        {transform:"translate(-50%,-50%) rotate(0.8deg)"},
        {transform:"translate(-50%,-50%) rotate(-0.8deg)"},
        {transform:"translate(-50%,-50%) rotate(0)"}
    ],{duration:500});
}

/* SNOW */
const snow=document.getElementById("snow");
const sctx=snow.getContext("2d");
resize(snow);
let flakes=[...Array(160)].map(()=>({
    x:Math.random()*innerWidth,
    y:Math.random()*innerHeight,
    r:Math.random()*3+1,
    s:Math.random()+0.6
}));
(function drawSnow(){
    sctx.clearRect(0,0,snow.width,snow.height);
    sctx.fillStyle="white";
    flakes.forEach(f=>{
        sctx.beginPath();
        sctx.arc(f.x,f.y,f.r,0,Math.PI*2);
        sctx.fill();
        f.y+=f.s;
        if(f.y>snow.height){f.y=-5;f.x=Math.random()*snow.width}
    });
    requestAnimationFrame(drawSnow);
})();

/* METEOR */
const meteor=document.getElementById("meteor");
const mctx=meteor.getContext("2d");
resize(meteor);
let meteors=[];
setInterval(()=>meteors.push({
    x:Math.random()*meteor.width,
    y:-50,vx:8+Math.random()*5,vy:8+Math.random()*5,l:0
}),300);
(function drawMeteor(){
    mctx.clearRect(0,0,meteor.width,meteor.height);
    mctx.strokeStyle="rgba(255,255,255,.9)";
    mctx.lineWidth=2;
    meteors.forEach((m,i)=>{
        mctx.beginPath();
        mctx.moveTo(m.x,m.y);
        mctx.lineTo(m.x-m.vx*6,m.y-m.vy*6);
        mctx.stroke();
        m.x+=m.vx;m.y+=m.vy;m.l++;
        if(m.l>70)meteors.splice(i,1);
    });
    requestAnimationFrame(drawMeteor);
})();

/* HEART FLY */
setInterval(()=>{
    const h=document.createElement("div");
    h.innerText=Math.random()>0.5?"💖":"💕";
    h.style.position="absolute";
    h.style.left=Math.random()*95+"vw";
    h.style.bottom="-30px";
    h.style.fontSize=18+Math.random()*18+"px";
    h.style.animation="heartFly "+(4+Math.random()*3)+"s linear";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),7000);
},350);

/* VIEWER */
const viewer=document.getElementById("viewer");
const viewerImg=document.getElementById("viewerImg");
document.querySelectorAll(".photo").forEach(img=>{
    img.onclick=()=>{
        viewerImg.src=img.src;
        viewer.style.display="flex";
    };
});
viewer.onclick=()=>viewer.style.display="none";

/* RESIZE */
function resize(c){c.width=innerWidth;c.height=innerHeight}
window.onresize=()=>[snow,meteor].forEach(resize);
