
// VARS -----------------------------
var express        = require('express')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http')
  , path           = require('path')
  , db             = require('./models')
  , epilogue       = require('epilogue')
  , http           = require('http')
  , Sequelize      = require('sequelize')
  , router         = require('express').Router(); // new


var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(morgan('dev'))
app.use(bodyParser())
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

// IMPORT MODELS
 var userVar     = require('./models/User');



// development only
if ('development' === app.get('env')) {
  app.use(errorHandler())
}



// create db and listen
db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })




// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: db
});

// Create REST resource
var userResource = epilogue.resource({
  model: userVar,
  endpoints: ['/users', '/users/:id']
});







// ADDED ROUTES FOR OUR API
// =============================================================================

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res, next) {
    res.json({ message: 'hooray! welcome to our api!' });
});


// custom MIDDLEWARE

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening Middle Ware is doing its thing - auth later.');
    next(); // make sure we go to the next routes and don't stop here
});




