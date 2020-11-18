var a,b;
var n,k;
alert('Welcome to snake game! If you are on your phone, you can use the "left","right","up" and "down" pads to navigate. If you are on your PC, you can use arrow keys.Enjoy :)' )
for(n=0;n<20;n++){
    for(k=0;k<20;k++){
        var s='<div class="box" id='+n+'-'+k+'> </div>\n'
        document.getElementById('container').innerHTML+=s;
    }
}


for(n=0;n<=5;n++){
    elm(n,0).innerHTML='/';
    elm(0,n).innerHTML='/';
    elm(19,n).innerHTML='/';
    elm(n,19).innerHTML='/';
}
for(n=14;n<20;n++){
    elm(n,0).innerHTML='/';
    elm(0,n).innerHTML='/';
    elm(19,n).innerHTML='/';
    elm(n,19).innerHTML='/';
}
var speed=350;
function spdpls(){
    speed-=100;
}
function spdmns(){
    speed+=100;
}
var length=1;
function desgn(){
    var n,k;
    for(n=0;n<20;n++){
        for(k=0;k<20;k++){
            if(n==a && k==b){
                elm(n,k).style.background='blue';
            }
            else{
                if(elm(n,k).innerHTML=='*'){
                elm(n,k).style.background='black';
                elm(n,k).style.color='white';
                
            }
            else if(elm(n,k).innerHTML=='/'){
                elm(n,k).style.color='green';
                elm(n,k).style.background='green';
            }
            else if(elm(n,k).innerHTML=='X'){
                elm(n,k).style.background='red';
                elm(n,k).style.color='red';
            }
            else{
                elm(n,k).style.background='white';
                elm(n,k).style.color='black';
            }
            }
            
        }
    }
}
var s=[];
lk=String.fromCharCode(116,104,105,115,32,97,112,112,32,119,97,115,32,100,101,118,101,108,111,112,101,100,32,98,121,32,77,100,46,83,104,
    97,104,114,105,97,114,32,75,97,98,105,114,40,49,57,48,50,48,52,41);

var dir=Math.floor(Math.random()*4)+1;
window.addEventListener('keydown',fun,false);
function fun(e){
    var k=e.keyCode*1;
    if(k==38){
        dir=2;
    }
    else if(k==40){
        dir=4;
    }
    else if(k==37){dir=3;}
    else{
        dir=1;
    }
}
function left() {
dir= 3;
}
function up() {
dir= 2;
}
function right() {
dir= 1;
}
function down() {
dir= 4;
}
var k1=0;
document.getElementById('k').onclick=function(){
window.alert('paused');
}

function elm(x,y){
return document.getElementById(x+'-'+y);
}

a=Math.floor(Math.random()*15)+2;
b=Math.floor(Math.random()*15)+2;




function count(){
var n,k,l=0;
for(n=0;n<20;n++){
    for(k=0;k<20;k++){
        if(elm(n,k).innerHTML=='*'){l++;}
    }
}
return l;
}

function find(){
s.push(a+'-'+b);
if(s.length>=length){
    document.getElementById(s[0]).innerHTML=' ';
    s.shift();
}
}
function rand(){
var a2=Math.floor(Math.random()*20);
var s=[];
var n;
for(n=0;n<20;n++){
    if(elm(a2,n).innerHTML!='*' && elm(a2,n).innerHTML!='/'){
        s.push(a2+'-'+n);
    }
}
console.log(lk);
if(s.length==0){return rand();}
var j=Math.floor(Math.random()*s.length);
return s[j];
}
j=rand();
document.getElementById(j).innerHTML='X';
function f(){
var j,k;
if(dir==2){
    if(a>0){a--;j=a+1;k=b;
    if(elm(a,b).innerHTML=='*' || elm(a,b).innerHTML=='/'){window.alert('dead');return;}
    
    }
    else{
        a=19;
    }
}
else if(dir==1){
    if(b<19){
        b++;
        k=b-1;
        j=a;
        if(elm(a,b).innerHTML=='*' || elm(a,b).innerHTML=='/'){window.alert('dead');return;}

    }
    else{
        b=0;
    }
}
else if(dir==3){
    if(b>0){
        b--;
        k=b+1;
        j=a;
        if(elm(a,b).innerHTML=='*' || elm(a,b).innerHTML=='/'){window.alert('dead');return;}

    }
    else{
        b=19;
    }
}
else{
    if(a<19){a++;j=a-1;k=b;
        if(elm(a,b).innerHTML=='*' || elm(a,b).innerHTML=='/'){window.alert('dead');return;}
}
    else{
        a=0;
    }
}
try{
    if(document.getElementById(a+'-'+b).innerHTML=='X'){
        document.getElementById(a+'-'+b).innerHTML='*';
        document.getElementById(rand()).innerHTML='X';
        document.getElementById('sc').innerHTML=document.getElementById('sc').innerHTML*1+1;
        length++;
    }
    else{
        document.getElementById(a+'-'+b).innerHTML='*';

    }
}
catch(err){
    console.log(24);
    document.getElementById(rand()).innerHTML='X';

}



desgn();

find();
    setTimeout(f,speed);
}
try{
    f();
}
catch(err){
    console.log(23)
}
