//import io from "./socket.js";
var socket=io.connect("http://localhost:4000/")

initChannel()

function initChannel(){
    var id=localStorage.getItem("id")
    socket.emit("online",{"id":id})
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