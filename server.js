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
	var queryParams=req.query;
	var filteredTodos=todos;
	if(queryParams.hasOwnProperty('completed')&&queryParams.completed === 'true'){
		filteredTodos = _.where(filteredTodos,{completed: true});
	}else if(queryParams.hasOwnProperty('completed')&&queryParams.completed==='false'){
		filteredTodos=_.where(filteredTodos,{completed:false});
	}
	res.json(filteredTodos);
});
app.get('/todos/:id',function(req,res){
	
	var todoId=parseInt(req.params.id,10);
	
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

app.delete('/todos/:id',function(req,res){
	var todoId=parseInt(req.params.id,10);
	
	var found=_.findWhere(todos, {id: todoId});;
	
	if(typeof found === 'undefined'){

			res.status(404).json({"error": "no todo found with that id"});
	}else{
			todos=_.without(todos,found);
			res.json(found);
	}	
});
app.put('/todos/:id',function(req,res){
	var todoId=parseInt(req.params.id);
	
	var body = _.pick(req.body,'description','completed');
	var found=_.findWhere(todos, {id: todoId});
	var body = _.pick(req.body,'description','completed');
	if(!found){
		return res.status(404).send();
	}
	var validAttributes={};
	if(body.hasOwnProperty('completed')&&_.isBoolean(body.completed)){
		validAttributes.completed=body.completed;
	} else if(body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if(body.hasOwnProperty('description')&&_.isString(body.description)&&body.description.trim().length>0){
		validAttributes.description=body.description;
	} else if(body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	_.extend(found,validAttributes);
	res.json(found);
});
app.listen(PORT,function(){
	console.log('Express Listening on PORT '+PORT +'!');
});