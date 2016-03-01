
// VARS -----------------------------
var express        = require('express')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http')
  , path           = require('path')
  , db             = require('./models')

var router =require('express').Router(); // new
var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(morgan('dev'))
app.use(bodyParser())
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

// MODELS // new
var userVar     = require('./models/user');



// development only
if ('development' === app.get('env')) {
  app.use(errorHandler())
}



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



// ROUTES FROM SEQUELIZE
// =============================================================================


/* USER ROUTES ENDING IN /users!
router.route('/users')

    // get all todos
    .get( function(req, res) {
      userVar.User.findAll({}).then(function(users) {
        res.json(users);
      });
    })

    .post(function(req, res) {
        userVar.User.create({
            email: req.body.email
        }).then(function(user) {
            res.json(user);
            });
    });

*/

module.exports = function(app) {
  var apiRouter = express.Router();
  apiRouter.get('/users', function(req, res, next){

    res.json(

        User.findAll({attributes: ['foo', 'bar'] })

    );

  });

  return apiRouter;
};


// on routes that end in /users/:UserId
// ----------------------------------------------------
router.route('/users/:UserId')

    // GET - get the user with that id (accessed at GET http://localhost:3000/api/users/:UserId)
    .get(function(req, res) {
        userVar.findById(req.params.UserId, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    // PUT - update the user with this id (accessed at GET http://localhost:3000/api/users/:UserId)
    .put(function(req, res) {

        // use our user model to find the user we want
        userVar.findById(req.params.UserId, function(err, user) {

            if (err)
                res.send(err);

            User.name = req.body.username;  // update the users info

            // save the user
            User.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })

    // DELETE - delete the user with this id (accessed at DELETE http://localhost:3000/api/users/:user_id)
    .delete(function(req, res) {
        userVar.remove({
            _id: req.params.UserID
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'User Successfully deleted' });
        });
    });




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);





// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================

