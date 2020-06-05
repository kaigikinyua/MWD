
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
    if(true==checkBoard()){

    }else{
        oponentTurn()
        socket.emit("play",{"id":localStorage.getItem("matchid"),"boxnum":number})
    }
}
socket.on("oponent",(data)=>{
    played.push(data.played);
    myTurn();
})

function myTurn(){
    var buttons=document.querySelectorAll(".box")
    buttons.forEach(button=>{
        played.forEach(p=>{
            if(p==button){
                button.disabled=true
            }else{
                button.disabled=false
            }
        })
    })
}
function oponentTurn(){
    var buttons=document.querySelectorAll(".box")
    buttons.forEach(button=>{
        button.disabled=true
    })
}

function checkBoard(){
    if(true==verticalCheck() || true==horizontalCheck() || true==diagonal()){
        return true;
    }else{
        //check if tied:if so return tied
        return false;
    }
}

function verticalCheck(){
    var buttons=document.querySelectorAll(".box")
    var col1=tick_tack_toe(buttons[8],buttons[5],buttons[2])
    var col2=tick_tack_toe(buttons[7],buttons[4],buttons[1])
    var col3=tick_tack_toe(buttons[6],buttons[3],buttons[0])
    var colums=[col1,col2,col3]
    colums.forEach(col=>{
        if(col!=false){
            console.log(col+" vertical")
            return true;
        }
    })
    return false;
}

function horizontalCheck(){
    var buttons=document.querySelectorAll(".box")
    var col1=tick_tack_toe(buttons[8],buttons[7],buttons[6])
    var col2=tick_tack_toe(buttons[5],buttons[4],buttons[3])
    var col3=tick_tack_toe(buttons[2],buttons[1],buttons[0])
    var colums=[col1,col2,col3]
    colums.forEach(col=>{
        if(col!=false){
            console.log(col+"horizontal")
            return true;
        }
    })
    return false;
}

function diagonal(){
    var buttons=document.querySelectorAll(".box")
    var col1=tick_tack_toe(buttons[8],buttons[4],buttons[0])
    var col2=tick_tack_toe(buttons[6],buttons[4],buttons[2])
    var colums=[col1,col2]
    colums.forEach(col=>{
        if(col!=false){
            console.log(col+"diagnal")
            return true;
        }
    })
    return false;
}





function tick_tack_toe(one,two,three){
    var arr=[one,two,three]
    arr.forEach(elem=>{
        if(elem.innerHTML.length==0 && elem.innerHTML==undefined){
            return false;
        }
    })
    var antiChar="";
    if(char=="x"){
        antiChar="o"
    }else{
        antiChar="x"
    }


    if(one.innerHTML==char && two.innerHTML==char && three.innerHTML==char){
        return "You are the winner!!!";
    }else if(one.innerHTML==antiChar && two.innerHTML==antiChar && three.innerHTML==antiChar){
        return "You lost :/";
    }else{
        return false;
    }
}