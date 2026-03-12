var started=false;

setTimeout(function(){
started=true;
},2500);


var canvas = document.getElementById("matrix");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var letters = "0123456789";
letters = letters.split("");

var fontSize = 20;
var columns = Math.floor(canvas.width / fontSize);  // original columns

columns += Math.floor(columns * 1.3);  // add 30% more streams

var drops = [];

for(var x=0; x<columns; x++){
    drops[x] = 1;
}
function draw(){

if(!started){
ctx.fillStyle="black";
ctx.fillRect(0,0,canvas.width,canvas.height);
return;
}

ctx.fillStyle="rgba(0,0,0,0.08)";
ctx.fillRect(0,0,canvas.width,canvas.height);

var hue = 320 + Math.random()*30;
var light = 45 + Math.random()*25;

ctx.fillStyle = "hsl(" + hue + ",80%," + light + "%)";
ctx.font=fontSize+"px monospace";

for(var i=0;i<drops.length;i++){

var text=letters[Math.floor(Math.random()*letters.length)];

ctx.fillText(text,i*fontSize,drops[i]*fontSize);

if(drops[i]*fontSize>canvas.height && Math.random()>0.975)
drops[i]=0;

drops[i] += Math.random()*1.5;

}

}

setInterval(draw,33);

var messages=["HAPPY","BIRTHDAY","ELUU!!!"];
var index=0;

function showText(){

var el=document.getElementById("text");

el.innerText=messages[index];

el.style.opacity=1;

setTimeout(function(){

el.style.opacity=0;

setTimeout(function(){

index++;

if(index<messages.length){
showText();
}else{
startFireworks();
}

},2000);

},2000);

}

setTimeout(showText,3000);

function startFireworks(){

var canvas=document.getElementById("heartCanvas");
var ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var rockets=[];
var particles=[];
var transitioned=false;
function launchRocket(x){

rockets.push({
x:x,
y:canvas.height,
vx:(Math.random()-0.5)*2,
vy:-8-Math.random()*3
});

}

function explode(x,y,size){

for(var t=0;t<Math.PI*2;t+=0.15){

var hx=16*Math.pow(Math.sin(t),3);
var hy=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);

particles.push({
x:x,
y:y,
vx:hx*0.15,
vy:-hy*0.15,
life:120,
size:2+Math.random()*2,
color:"hsl("+(320+Math.random()*30)+",80%,70%)"
});

}

if(!transitioned){
transitioned=true;

setTimeout(function(){
window.location.href="DNAheart.html";
},450);  // <--- CHANGE THIS NUMBER
}

}

function draw(){

ctx.fillStyle="rgba(0,0,0,0.15)";
ctx.fillRect(0,0,canvas.width,canvas.height);

for(var i=rockets.length-1;i>=0;i--){

var r=rockets[i];

r.x+=r.vx;
r.y+=r.vy;

ctx.fillStyle="#f0349f";
ctx.beginPath();
ctx.arc(r.x,r.y,3,0,Math.PI*2);
ctx.fill();

if(r.y<canvas.height/2){

explode(r.x,r.y,3);
rockets.splice(i,1);

}

}

for(var i=particles.length-1;i>=0;i--){

var p=particles[i];

p.x+=p.vx;
p.y+=p.vy;
p.life--;

ctx.shadowBlur=10;
ctx.shadowColor=p.color;
ctx.fillStyle=p.color;

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fill();

if(p.life<=0){
particles.splice(i,1);
}

}

requestAnimationFrame(draw);

}

launchRocket(canvas.width/2);

draw();

}