const targetDate = new Date("2026-01-08 00:00:00"); // 🔥 ĐỔI NGÀY Ở ĐÂY

const timeEl = document.getElementById("time");
const notice = document.getElementById("notice");
const btn = document.getElementById("startBtn");

function update(){
    const now = new Date();
    const diff = targetDate - now;

    if(diff <= 0){
        notice.style.display = "none";
        btn.style.display = "block";
        return;
    }

    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor(diff / (1000*60*60)) % 24;
    const m = Math.floor(diff / (1000*60)) % 60;
    const s = Math.floor(diff / 1000) % 60;

    timeEl.innerHTML = `
        ⏳ Còn lại<br>
        <b>${d}</b> ngày
        <b>${h}</b> giờ
        <b>${m}</b> phút
        <b>${s}</b> giây
    `;
}

setInterval(update,1000);
update();

btn.onclick = () => {
    sessionStorage.setItem("allowed","yes");
    window.location.href = "main.html";
};
