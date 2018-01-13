var express=require('express');
var app =express();
var PORT=process.env.PORT || 3000;
var todos = [{
	id: 1,
	description:'Meet Mom for lunch',
	completed:false
},{
	id: 2,
	description:'Go to Market',
	completed:false
},{
	id: 3,
	description:'Feed the cat',
	completed:true
}];

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
app.listen(PORT,function(){
	console.log('Express Listening on PORT '+PORT +'!');
});