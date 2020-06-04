//import io from "./socket.js";
var socket=io.connect("http://localhost:4000/")

initChannel()

function initChannel(){
    var id=localStorage.getItem("id")
    socket.emit("online",{"id":id})
    setInterval(()=>{
        socket.emit("updateplayers",null)
    },10000)
}


function sendRequest(playerID){
    var username=localStorage.getItem('username')
    socket.emit('playaganist',{"username":username,"roomID":playerID})
}
socket.on("challange",(data)=>{
    notification()
    var message=document.getElementById("message")
    message.innerHTML=data
})
socket.on("currentplayers",(data)=>{
    console.log(data)
    var p=document.getElementById("players")
    p.innerHTML=""
    data.players.forEach(player => {
        var playerTemplate=document.createElement("div")
        playerTemplate.addEventListener('click',(e)=>{
            sendRequest(player.id)
        })
        playerTemplate.classList.add("player")
        var avatar=document.createElement("div")
        avatar.classList.add("avatar")
        avatar.innerHTML="<div class='let'>"+player.name[0]+"</div>"
        var playersname=document.createElement("div")
        playersname.classList.add("playername")
        playersname.innerHTML=player.name
        playerTemplate.appendChild(avatar)
        playerTemplate.appendChild(playersname)
        p.appendChild(playerTemplate)
    });
})


function receiveRequest(){
    
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