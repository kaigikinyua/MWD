const express=require('express')
//const bodyParser=require('bodyParser')
const app=express()
const http=require("http").Server(app)
const socket=require("socket.io");

app.use('/static',express.static('./static'))
//for html app.use(express.urlencoded())
app.use(express.json())
app.set('view engine','ejs')
var server=app.listen(4000,()=>{
	console.log("M.W.D listening on port 4000")
})
//soket.io server
var io=socket(server)

//var players=["one","two","three"]
var players=[{"name":"Player one","id":10,"state":"free"}]

var rooms=[]
var socketRooms=[]

app.get('/',(req,res)=>{
	res.render('index',{'players':players.length})
})
app.post('/',(req,res)=>{
	var new_player=req.body.playername
	var player_id=generateUniqPlayerID()
	players.push({"name":new_player,"id":player_id,"state":"free"})
	rooms.push(player_id)
	var response={"state":"success","id":player_id,players}
	res.end(JSON.stringify(response))
	//res.redirect('/players')
})
app.get('/players',(req,res)=>{
	var freePlayers=[];
	players.forEach(player=>{
		if(player.state=="free"){
			freePlayers.push(player)
		}
	})
	res.render("players",{"players":freePlayers})
});
app.get('/arena',(req,res)=>{
	//add security measure to prevent hacking
	res.render("arena")
})

app.get('/controll',(req,res)=>{
	res.render("control")
})
//sockets

//utilities
function generateUniqPlayerID(){
	var id=Math.floor(Math.random(100)*100)
	players.forEach(player=>{
		if(player.id==id){
			id=generateUniqPlayerID()
			console.log("not uniq ")
		}
	})
	return id;
}



io.on('connection',(socket)=>{
	//update the number on the index page
	socket.on("disconnet",()=>{
		socket.emit("newnumbers",players.length-1)
	})

	socket.on('updatenumber',(data)=>{
		socket.emit("newnumbers",players.length)
	})
	socket.on("updateplayers",(data)=>{
		var freePlayers=[];
		players.forEach(player=>{
			if(player.state=="free" && player.id != data.id){
				freePlayers.push(player)
			}
		})
		socket.emit("currentplayers",{"players":freePlayers})
	})

	socket.on("online",(data)=>{
		console.log(data+" is now free")
		players.forEach(player=>{
			if(player.id==data.id){
				player.state="free"
			}else{
				console.log("server"+player.id+" client "+data.id)
			}
		})
		socket.join(data.id)
	})
	socket.on("joinarena",(data)=>{
		socket.join(data.id)
		//io.in(data.id).emit("arenadata",{"matchid":data.id,"match_host":data.username})
		socket.broadcast.to(data.id).emit("arenadata",{"oponentname":data.username,"oponentid":data.id})
		console.log("oponent data")
		console.log(data)
	})

	socket.on("playaganist",(data)=>{
		//check if player is in arena if so send a notification else broadcast challange
		
		var c_name=data.username
		var room_id=data.roomID
		socket.join(room_id)
		console.log(data)
		//take challangers name
		//send the room a notification
		var message=c_name+" is challanging you"
		socket.broadcast.to(room_id).emit("challange",{"message":message,"c_id":data.playerID})
	})
	socket.on("acceptchallange",(data)=>{
		io.in(data.id).emit("startmatch",{"matchid":data.id,"match_host":data.username})
		players.forEach((player)=>{
			if(player.id==data.id || player.id==data.c_id){
				player.state="in arena"
			}
		})
		console.log(players)
	})

	socket.on("play",data=>{
		console.log("player "+data.id+" played "+data.boxnum)
		socket.broadcast.to(data.id).emit("oponent",{"played":data.boxnum})
	})


	//chat

	socket.on("typing",data=>{
		//console.log(data)
		console.log(" is typing")
		socket.broadcast.to(data.id).emit("typing",{"username":data.username})
	})


	socket.on("sendmessage",data=>{
		console.log("new sent message"+data)
		socket.broadcast.to(data.id).emit("message",{"message":data.message})
	})

})