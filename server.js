const express=require('express')
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
players_data=[]
id=0
// app.use('/players', express.static(__dirname+'/views/index.html'))
app.use('/img', express.static(__dirname+'/views/img'))
app.use('/form_add',express.static(__dirname+'/views/form_add.html'))


app.set('view engine', 'hbs')
app.get('/form_update/:name/:country',(req,res)=>{
    let name=req.params.name;
    let country=req.params.country
    res.render('form_updates',{add:true,delete:false})
})
app.post('/addTennisPlayer',(req,res)=>{
    players_data.push({name:req.body.name,country:req.body.country,id})
    id+=1
    res.redirect('/players')
})
app.post('/updateTennisPlayer',(req,res)=>{
    for(let player of players_data){
        console.log(player.id,req.body.id)
        if (player.id==req.body.id){
            player.name=req.body.name
            player.country=req.body.country
            break
        }
    }
    res.redirect('/players')
});
app.get('/players',(req,res)=>{
    res.render('index',{players_data})
})
// app.get('/',(req,res)=>res.send("sent right"));
app.get('/player_del/:id',(req,res)=>{
    players_data.splice(req.params.id,1)
    res.redirect('/players')
})
app.get('/player_edit/:id',(req,res)=>{
    let player=players_data[req.params.id]
    res.render('form_update',{player})
})
app.listen(5000,console.log("started"))