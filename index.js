
var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({ 
	defaultLayout: 'main',
	helpers: {
		section: function(name, options) {
               if(!this._sections) this._sections = {};
               this._sections[name] = options.fn(this);
               return null;
		}
	}
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.disable('x-powered-by');

var randomError = require('./lib/randomError.js');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// Tests
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.use(function(req, res, next) {
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weatherContext = getWeatherData();
	next();
});

// References
app.get('/', function(req, res) {
	res.render('home');
});
app.get('/headers', function(req, res) {
	res.set('Content-Type', 'text/plain');
	var s = '';
	for(var name in req.headers)
		s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});
app.get('/about', function(req, res) {
	res.render('about', {
		pageTestScript: '/qa/tests-about.js'
	});
});
app.get('/projects/infinity-adventures', function(req, res) {
	res.render('projects/infinity-adventures');
});
app.get('/projects/request-group', function(req, res) {
	res.render('projects/request-group');
});





// 404 error page
app.use(function(req, res, next) {
	res.status(404);
	res.render('404', { 
		errorMessage: randomError.getRandomError() 
	});
});

// 500 error page
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Server started on http://localhost:' + app.get('port'));
});


function getWeatherData() {
	return {
		locations: [
			{
				name: 'Portland',
				forecastUrl: 'http://wunderground.com/US/OR/Portland.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
				temp: '54.1 F (12.3 C)'
			},
			{
				name: 'Bend',
				forecastUrl: 'http://wunderground.com/US/OR/Bend.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
				temp: '55.0 F (12.8 C)'
			}
		]
	};
}