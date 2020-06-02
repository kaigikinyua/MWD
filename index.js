const express=require('express')
//const bodyParser=require('bodyParser')

const app=express()

app.use('/static',express.static('./static'))
app.use(express.urlencoded())
app.set('view engine','ejs')

var players=["one","two","three"]

app.get('/',(req,res)=>{
	res.render('index',{'players':players.length})
})

app.post('/',(req,res)=>{
	var new_player=req.body.playername
	players.push(new_player)
	//console.log(req.body)
	res.redirect('/players')
})

app.get('/players',(req,res)=>{
	res.render("players",{"players":players})
});

app.listen(4000,()=>{
	console.log("M.W.D listening on port 4000")
})