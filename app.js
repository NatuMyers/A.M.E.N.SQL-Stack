// LOAD ---- ---- ---- ----

var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var epilogue = require('epilogue');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// set the view engine to ejs
// app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// MODELS ---- ---- ---- ----

// Add Employee model
var database = new Sequelize('raptroopdb', 'root', 'strongpassword');

var Employee = database.define('Employee', {
  name: Sequelize.STRING,
  hireDate: Sequelize.DATE
});

// Add Account model with foreign key constraint to Employee
var Account = database.define('Account', {
  name: Sequelize.STRING,
  managerId: {
  	type: Sequelize.INTEGER,

		  references: {
		    // This is a reference to model Employee
		    model: Employee,

		    // This is the column name of the referenced model
		    key: 'id',

		  }
  }
});

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('In server.js');

    // make sure we go to the next routes and don't stop here
    next();
});

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
});

/*

// ERRORS ---- ---- ----

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

*/

// PAGE END POINTS  ---- ---- ---- ----
// use res.render to load up an ejs view file


// index page
// Your app will only route page requests that
// are set up at the time of your app.use(app.router) call.
// http://stackoverflow.com/questions/19620239/cant-get-index-html-to-show-with-express-in-nodejs
// __dirname is the directory that the executing script resides in,
// so because that lives in the js directory that's a peer to public your code would need to be:
app.use(express.static(__dirname + "/public"));
app.get('/', function(req, res){
  res.redirect('/public/index.html');
});






// MODEL END POINTS ---- ---- ---- ----
// Create REST resource
var employeeResource = epilogue.resource({
  model: Employee,
  endpoints: ['/api/employees', '/api/employees/:id']
});

var acctResource = epilogue.resource({
  model: Account,
  endpoints: ['/api/accounts', '/api/accounts/:id']
});

// Create database and listen
database
  .sync({ force: false })
  .then(function() {
    app.listen(port, function() {
      console.log('listening at %s', port);
    });
  });
