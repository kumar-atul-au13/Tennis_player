const express=require('express')
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
players_data=[{'name':'Kumar Atul','country':'Mongolia','id':0},{'name':'Anu','country':'Bangladesh',id:1},{'name':'KMK','country':'SriLanka',id:2}]
id=3
// app.use('/', express.static(__dirname+'/views/index.html'))
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
    res.redirect('/')
})
app.post('/updateTennisPlayer',(req,res)=>{
    for(let player of players_data){
        // console.log(player.id,req.body.id)
        if (parseInt( player.id)==parseInt(req.body.id)){
            player.name=req.body.name
            player.country=req.body.country
            break
        }
    };
    res.redirect('/')
});
app.get('/',(req,res)=>{
    res.render('index',{players_data})
})
// app.get('/',(req,res)=>res.send("sent right"));
app.get('/player_del/:id',(req,res)=>{
    let this_player_indx;
    for (this_player_indx in players_data){
        // console.log(players_data[this_player_indx],req.params.id)
        if (parseInt( players_data[this_player_indx].id)==parseInt( req.params.id)){
            break
        }
    }
    players_data.splice(this_player_indx,1);
    res.redirect('/')
})
app.get('/player_edit/:id',(req,res)=>{
    let this_player_indx;
    for (this_player_indx in players_data){
        // console.log(players_data[this_player_indx],req.params.id)
        if (parseInt( players_data[this_player_indx].id)==parseInt( req.params.id)){
            break
        }
    }
    let player=players_data[this_player_indx]
    res.render('form_update',{player})
});
app.listen(process.env.PORT || 5000,console.log("started"));