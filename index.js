const express=require('express')
//const bodyParser=require('bodyParser')
const app=express()
const http=require("http").Server(app)
const io=require("socket.io")(http)

app.use('/static',express.static('./static'))
app.use(express.urlencoded())
app.set('view engine','ejs')

//var players=["one","two","three"]
var players=[{"name":"Player one","id":10}]
var rooms=[{"roomID":10,"oponent":100}]

app.get('/',(req,res)=>{
	res.render('index',{'players':players.length})
})
app.post('/',(req,res)=>{
	var new_player=req.body.playername
	var player_id=generateUniqPlayerID()
	players.push({"name":new_player,"id":player_id})
	//console.log(req.body)
	res.redirect('/players')
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