const express=require('express')
//const bodyParser=require('bodyParser')
const app=express()
const http=require("http").Server(app)
const io=require("socket.io")(http)

app.use('/static',express.static('./static'))
//for html app.use(express.urlencoded())
app.use(express.json())
app.set('view engine','ejs')

//var players=["one","two","three"]
var players=[{"name":"Player one","id":10}]
var rooms=[]

app.get('/',(req,res)=>{
	res.render('index',{'players':players.length})
})
app.post('/',(req,res)=>{
	var new_player=req.body.playername
	var player_id=generateUniqPlayerID()
	players.push({"name":new_player,"id":player_id})
	rooms.push(player_id)
	var response={"state":"success",players}
	res.end(JSON.stringify(response))
	//res.redirect('/players')
})
app.get('/players',(req,res)=>{
	res.render("players",{"players":players})
});
app.get('/match/:userid',(req,res)=>{
	//add security measure to prevent hacking
	res.render("arena")
})
//sockets
app.listen(4000,()=>{
	console.log("M.W.D listening on port 4000")
})

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

io.sockets.on('connection',(socket)=>{
	//update the number on the index page
	console.log("Users connected"+sockets.length)
	socket.on("playaganist",(data)=>{
		var c_name=data.username
		var room_id=data.roomID
		//take challangers name
		//send the room a notification
		socket.broadcast.to(room_id).emit("challange",c_name+" is challanging you")
	})
})