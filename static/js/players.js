//import io from "./socket.js";
const baseURL="https://antonytictac.herokuapp.com";


var socket=io.connect(baseURL)
var challanger_id=""

window.onload=function(){
    var id=localStorage.getItem("id")
    socket.emit("updateplayers",{"id":id})
    initChannel()
}


function initChannel(){
    var id=localStorage.getItem("id")
    socket.emit("online",{"id":id})
    setInterval(()=>{
        socket.emit("updateplayers",{"id":id})
        console.log("updating players")
    },10000)
}


function sendRequest(playerID,playername){
    console.log(playername)
    localStorage.setItem("oponentname",playername)
    localStorage.setItem("oponentid",playerID)
    var username=localStorage.getItem('username')
    socket.emit('playaganist',{"username":username,"playerID":localStorage.getItem("id"),"roomID":playerID})
}
function acceptRequest(){
    
    socket.emit("acceptchallange",{"id":localStorage.getItem("id"),"username":localStorage.getItem("name"),"c_id":challanger_id})

}



socket.on("challange",(data)=>{
    localStorage.setItem("oponentname",data.username)
    localStorage.setItem("oponentid",data.c_id)

    notification()
    var message=document.getElementById("message")
    message.innerHTML=data.message
    challanger_id=data.c_id
})

socket.on("startmatch",(data)=>{
    if(data.matchid==localStorage.getItem("id")){
        localStorage.setItem("pawn","x")
    }else{
        localStorage.setItem("pawn","o")
    }
    localStorage.setItem("matchid",data.matchid)
    setTimeout(()=>{
        window.location.replace(baseURL+"/arena")
    },3000)
})

socket.on("currentplayers",(data)=>{
    //console.log(data)
    var p=document.getElementById("players")
    p.innerHTML=""
    data.players.forEach(player => {
        var playerTemplate=document.createElement("div")
        playerTemplate.addEventListener('click',(e)=>{
            sendRequest(player.id,player.name)
        })
        playerTemplate.classList.add("player")
        var avatar=document.createElement("div")
        avatar.classList.add("avatar")
        avatar.style.background=generateColors();
        avatar.innerHTML="<div class='let'>"+player.name[0]+"</div>"
        var playersname=document.createElement("div")
        playersname.classList.add("playername")
        playersname.innerHTML=player.name
        playerTemplate.appendChild(avatar)
        playerTemplate.appendChild(playersname)
        p.appendChild(playerTemplate)
    });
})

function generateColors(){
    var colors=['lightseagreen','orange','crimson','#2f3542','#212121','#2979ff','#01579b','#00c853','orange','#78909c'];
    var index=Math.floor(Math.random(10)*10);
    return colors[index];
}


function rejectRequest(){
    ignoreNotif()
}

function notification(){
    var notif=document.getElementById("notification")
    notif.style.display="block"
}
function ignoreNotif(){
    var notif=document.getElementById("notification")
    notif.style.display="none"
}