const tabs=document.querySelectorAll('.tab');
const nav=document.querySelectorAll('.nav button');
nav.forEach(btn=>{
 btn.onclick=()=>{
  nav.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  tabs.forEach(t=>t.classList.remove('active'));
  document.getElementById(btn.dataset.tab).classList.add('active');
 };
});
let phrases=[
 "Лучший курс на Robux",
 "Безопасная выдача",
 "Пиши в Telegram — отвечу быстро",
 "Большие пакеты — дешевле"
];
let idx=0;
setInterval(()=>{
 document.getElementById("bubble-text").innerText=phrases[idx];
 idx=(idx+1)%phrases.length;
},3000);
