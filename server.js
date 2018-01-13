var express=require('express');
var bodyParser = require('body-parser');
var app =express();
var PORT=process.env.PORT || 3000;
app.use(bodyParser.json());
// var todos = [{
// 	id: 1,
// 	description:'Meet Mom for lunch',
// 	completed:false
// },{
// 	id: 2,
// 	description:'Go to Market',
// 	completed:false
// },{
// 	id: 3,
// 	description:'Feed the cat in the evening',
// 	completed:true
// }];

var todos=[];
var todoNextId=1;
app.get('/',function(req,res){
	res.send('Todo API Root');
});

app.get('/todos',function(req,res){
	res.json(todos);
});
app.get('/todos/:id',function(req,res){
	
	var todoId=req.params.id;
	
	var found;
	todos.forEach(function(item){
		if(item.id == todoId){
			found = item;
			return ;
		}
		
	});
	if(typeof found === 'undefined'){

			res.status(404).send();
	}else{
			//res.send('Asking for todo with id of '+req.params.id+ '\n'+found);
			//res.send(found);
			res.json(found);
	}
});
app.post('/todos',function(req,res){
	var body = req.body;
	body.id=todoNextId++;
	//console.log('description '+body.description);
	todos.push(body);
	res.json(body);
});
app.listen(PORT,function(){
	console.log('Express Listening on PORT '+PORT +'!');
});