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
var players=[{"name":"Player one","id":10}]
var rooms=[]
var socketRooms=[]

app.get('/',(req,res)=>{
	res.render('index',{'players':players.length})
})
app.post('/',(req,res)=>{
	var new_player=req.body.playername
	var player_id=generateUniqPlayerID()
	players.push({"name":new_player,"id":player_id})
	rooms.push(player_id)
	var response={"state":"success","id":player_id,players}
	res.end(JSON.stringify(response))
	//res.redirect('/players')
})
app.get('/players',(req,res)=>{
	res.render("players",{"players":players})
});
app.get('/arena',(req,res)=>{
	//add security measure to prevent hacking
	res.render("arena")
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
	socket.on('updatenumber',(data)=>{
		socket.emit("newnumbers",players.length)
	})
	socket.on("updateplayers",(data)=>{
		socket.emit("currentplayers",{"players":players})
	})

	socket.on("online",(data)=>{
		socket.join(data.id)
	})


	socket.on("playaganist",(data)=>{
		var c_name=data.username
		var room_id=data.roomID
		socket.join(room_id)
		console.log(data)
		//take challangers name
		//send the room a notification
		var message=c_name+" is challanging you"
		socket.broadcast.to(room_id).emit("challange",{"message":message})
	})
	socket.on("acceptchallange",(data)=>{
		io.in(data.id).emit("startmatch",{"matchid":data.id,"match_host":data.username})
	})
})