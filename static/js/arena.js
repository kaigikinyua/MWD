
var socket=io.connect("http://localhost:4000/")

//board-data
const board=document.getElementById('board')
var char=localStorage.getItem("pawn")
var played=[]

//setting up board
for(var i=9;i>0;i--){
    var button=document.createElement("button")
    button.classList.add("box")
    button.dataset.btnum=i
    button.id=i
    button.addEventListener("click",(e)=>{
        //console.log(e.target.dataset.btnum)
        play(e.target.dataset.btnum)
    })
    board.appendChild(button)
}

function play(number){
    var button=document.getElementById(number)
    button.innerHTML=char
    button.disabled=true
    played.push(number)
}


function myTurn(){

}
function oponentTurn(){

}
