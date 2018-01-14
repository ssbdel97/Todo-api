var express=require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app =express();
var PORT=process.env.PORT || 3000;
app.use(bodyParser.json());

var todos=[];
var todoNextId=1;
app.get('/',function(req,res){
	res.send('Todo API Root');
});

app.get('/todos',function(req,res){
	res.json(todos);
});
app.get('/todos/:id',function(req,res){
	
	var todoId=parseInt(req.params.id);
	
	var found=_.findWhere(todos, {id: todoId});;

	if(typeof found === 'undefined'){

			res.status(404).send();
	}else{
			res.json(found);
	}
});
app.post('/todos',function(req,res){
	var body = _.pick(req.body,'description','completed');
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0 ) {
		return res.status(400).send();
	}
	body.description=body.description.trim();
	//add id field
	body.id=todoNextId++;
	//console.log('description '+body.description);
	todos.push(body);
	res.json(body);
});
app.listen(PORT,function(){
	console.log('Express Listening on PORT '+PORT +'!');
});