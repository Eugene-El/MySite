
var express = require('express');

var app = express();

var handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var randomError = require('./lib/randomError.js');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// Tests
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
})


// References
app.get('/', function(req, res){
	res.render('home');
});
app.get('/about', function(req, res){
	res.render('about', {
		pageTestScript: '/qa/tests-about.js'
	});
})


// 404 error page
app.use(function(req, res, next){
	res.status(404);
	res.render('404', { 
		errorMessage: randomError.getRandomError() 
	});
});

// 500 error page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Server started on http://localhost:' + app.get('port'));
});


