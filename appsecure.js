// LOAD ---- ---- ---- ----
var fs = require('fs');
var https = require('https');

var HTTPS_PORT = process.env.PORT || 3111;
var port = process.env.PORT || 3000;


var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var epilogue = require('epilogue');
var app = express();

var router = express.Router();
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var secret = 'this is the secret secret secret 12356';
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken


/*
User.find({ where: { username: 'john-doe' } }).then(
  function(user) { ... },
  function(err) { ... }
);
*/


// We are going to protect /api routes with JWT
app.use('/api', expressJwt({
    secret: secret
}));



app.use('/', express.static(__dirname + '/'));


// if there's ever an unauth error, we redirect them
app.use(function(err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized :(');
    }
});




app.post('/authenticate', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
    res.status(401).send('Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

  res.json({ token: token });
});






/*****
app.post('/authenticate', function(req, res) {

            //if is invalid, return 401
            var rehash = bcrypt.hashSync(req.body.password, 10);


            User.find({
                where: {
                    username: req.body.username,
                    password: rehash
                }
            })

            .then(

                // We are sending the profile inside the token
                var token = jwt.sign(profile, secret, {
                    expiresInMinutes: 60 * 5
                });

                res.json({
                    token: token
                });

            });


        .catch(function(error) {
            res.status(401).send('User does not exist.');
            // Ooops, do some error-handling
        })

});
*****/




        restMiddleware = require('./middleware.js');

        var jwt = require('express-jwt');

        var jwtCheck = jwt({
            secret: new Buffer('XltYzt1JkBmad6zXbHjvY_UCAZOslrvgGIANs0iUwX8eTz_C1fKE3gATdkNBMj3v', 'base64'),
            audience: 'T3YAIRD8KHXstcZAuRiMeBidAwdllo5w'
        });


        var bcrypt = require("bcrypt");


        app.use(bodyParser.urlencoded({
            extended: true
        })); app.use(bodyParser.json());

        // secret key should be 32 bytes hex encoded (64 characters)




        // Add Employee model
        var database = new Sequelize('raptroopdb', 'root', 'strongpassword');

        // API ROUTES -------------------

        // get an instance of the router for api routes
        var apiRoutes = express.Router();

        // MODELS ---- ---- ---- ----


        // "id", "createdAt", and "updatedAt" are autmatic keys
        // Sequelize automatically pluralizes model names
        // i.e. User becomes a table "Users" in the database

        /*
        Some times you may want to reference another table,
        without adding any constraints, or associations.
        In that case you can manually add the reference
        attributes to your schema definition, and mark
        the relations between them.
        */


        var User = database.define('User', {

            //string

            // the important

            //WHEN CURLING YOU MUST ENTER THIS IN FIRST!
            hashword: {
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true,
                    len: [8, 30]
                }
            },

            username: {
                unique: true,
                isAlphanumeric: true, // only alphanumeric
                type: Sequelize.STRING,
                //allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [5, 16]
                }
            },
            email: {
                unique: true,
                type: Sequelize.STRING,
                //allowNull: false,
                validate: {
                    isEmail: true,
                    notEmpty: true,
                    len: [5, 25]
                }
            },


            //other strings
            userType: {
                type: Sequelize.STRING,
                validate: {
                    isIn: [
                        ['Artist', 'Supplier']
                    ]
                }
            },

            //other strings
            userDetailType: {
                type: Sequelize.STRING,
                validate: {
                    isIn: [
                        ['Graphic Designer', 'Vocalist', 'DJ', 'Producer', 'Camera Worker', 'Record Label', 'Journalist', 'Fan', 'Lurker', 'Gear Junkie', 'Admin', 'Mod']
                    ]
                }
            },




            views: Sequelize.INTEGER,
            fname: {
                unique: true,
                isAlpha: true, // only alphabetical
                type: Sequelize.STRING,
                //allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [5, 16]
                }
            },

            lname: Sequelize.STRING,
            username: Sequelize.STRING,
            summary: Sequelize.STRING,

            //links
            soundcloud: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true // // checks for url format (http://foo.com)
                }
            },
            noisetrade: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true // // checks for url format (http://foo.com)
                }
            },
            itunes: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true // // checks for url format (http://foo.com)
                }
            },
            bandcamp: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true // // checks for url format (http://foo.com)
                }
            },
            twitter: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true // // checks for url format (http://foo.com)
                }
            },
            facebook: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true // // checks for url format (http://foo.com)
                }
            },
            behance: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true // // checks for url format (http://foo.com)
                }
            },
            linkedin: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true // // checks for url format (http://foo.com)
                }
            },
            personal: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true // // checks for url format (http://foo.com)
                }
            },
            dribbble: {
                type: Sequelize.STRING,
                validate: {
                    isUrl: true // // checks for url format (http://foo.com)
                }
            },
            //ints
            messagesSent: Sequelize.INTEGER,
            numCollabs: Sequelize.INTEGER,
            numPayments: Sequelize.INTEGER,
            successfulCollabs: Sequelize.INTEGER,
            followers: Sequelize.INTEGER,
            following: Sequelize.INTEGER,
            hashcardno: Sequelize.INTEGER,

            rating: Sequelize.FLOAT,
            longitude: Sequelize.FLOAT,
            latitude: Sequelize.FLOAT,

            //bools
            isShowingSoc: Sequelize.BOOLEAN,
            isShowingLoc: Sequelize.BOOLEAN,
            isShowingSO: Sequelize.BOOLEAN,
            isSuspended: Sequelize.BOOLEAN,
            isBanned: Sequelize.BOOLEAN,
            isAuth: Sequelize.BOOLEAN,

            //date
            dob: Sequelize.DATE

        }, {
            hooks: {


                /* retrieveByNamePassword: function (username, onSuccess, onError) {
                User.find({where: {username: username}}, {raw: true})
                .then(onSuccess).catch(onError);
                },
                */



                beforeValidate: function() {},
                afterValidate: function(User) {
                    User.hashword = bcrypt.hashSync(User.hashword, 10);
                },
                beforeCreate: function() {},
                afterCreate: function() {}
            }

        });

        // Add Account model with foreign key constraint to User
        var Collab = database.define('Collab', {
            payAmount: Sequelize.INTEGER,
            views: Sequelize.INTEGER,
            longitude: Sequelize.INTEGER,
            latitude: Sequelize.INTEGER,

            isPaid: Sequelize.BOOLEAN,
            isIRL: Sequelize.BOOLEAN,

            collabName: Sequelize.STRING,
            state: Sequelize.STRING,
            imageDirectory: Sequelize.STRING,

            creatorId: {
                type: Sequelize.INTEGER,

                references: {
                    // This is a reference to model User
                    model: User,

                    // This is the column name of the referenced model
                    key: 'id',
                }
            },
            joinerId: {
                type: Sequelize.INTEGER,

                references: {
                    // This is a reference to model User
                    model: User,

                    // This is the column name of the referenced model
                    key: 'id',
                }
            }

        });

        // associations/relationships
        User.hasMany(Collab); Collab.belongsTo(User);

        // Follower relation
        var Follow = database.define('Follow', {
            followeeID: {
                type: Sequelize.INTEGER,

                references: {
                    // This is a reference to model User
                    model: User,

                    // This is the column name of threferenced model
                    key: 'id',
                }
            },
            followerID: {
                type: Sequelize.INTEGER,

                references: {
                    // This is a reference to model User
                    model: User,

                    // This is the column name of the referenced model
                    key: 'id',
                }
            }
        });

        // associations/relationships
        User.hasMany(Follow); Follow.belongsTo(User, {
            as: 'Current',
            foreignKey: 'id',
            constraints: false
        });

        // Message thread
        var messageThread = database.define('Follow', {
            text: Sequelize.INTEGER,
            fileDirectory: Sequelize.INTEGER,
            fromCollab: {
                type: Sequelize.INTEGER,

                references: {
                    // This is a reference to model User
                    model: Collab,

                    // This is the column name of threferenced model
                    key: 'id',
                }
            },
            senderID: {
                type: Sequelize.INTEGER,

                references: {
                    // This is a reference to model User
                    model: User,

                    // This is the column name of threferenced model
                    key: 'id',
                }
            },
            recieverID: {
                type: Sequelize.INTEGER,

                references: {
                    // This is a reference to model User
                    model: User,

                    // This is the column name of the referenced model
                    key: 'id',
                }
            }
        });


        // associations/relationships
        Collab.hasMany(messageThread); messageThread.belongsTo(Collab);




        // Initialize epilogue
        epilogue.initialize({
            app: app,
            sequelize: database
        });




        app.use(express.static(__dirname + "/public")); app.get('/', function(req, res) {
            res.redirect('/public/index.html');
        });

        app.get('/exgmrm03.htm', function(req, res) {
            res.redirect('/public/kuv0sc9m.htm');
        });


        /*

        passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
            User.findOne({
                id: jwt_payload.sub
            }, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                    // or you could create a new account
                }
            });
        }));
        */


        // MODEL END POINTS with EPILOGUE ---- ---- ---- ----
        // Create REST resource
        var userResource = epilogue.resource({


            model: User,
            endpoints: ['/api/users', '/api/users/:id']


        });
        var ItemMiddleware = {
            list: { // you'll have to replicate this for each controller
                auth: {
                    action: function(req, res, context) {
                        if (User.findById(req.id) == null) { // some logic to check that your session is valid
                            throw new ForbiddenError('This user cannot access this resource');
                        }
                        return context.continue();
                    }
                }
            }
        }; userResource.use(ItemMiddleware);



        var collabResource = epilogue.resource({
            model: Collab,
            endpoints: ['/api/collabs', '/api/collabs/:id']
        });



        var messageThreadResource = epilogue.resource({
            model: messageThread,
            endpoints: ['/api/messageThreads', '/api/messageThreads/:id']
        });















        /*

        userResource.create.auth(function (req, res) {

                    var newUser = User.build();
                    var newHashword = req.body.hashword || '';
                    var newUsername = req.body.username || '';
                    // empty
                    if (newUsername == '' || newHashword == '') {
                        res.status(401);
                        res.json({
                            "status": 401,
                            "message": "Invalid credentials"
                        });
                        return;
                    }

                    newUser.retrieveByNamePassword(newUsername, function (userChecked) {
                        if (userChecked) {
                            // If authentication is success, we will generate a token
                            // and dispatch it to the client
                            res.json(genToken(users));
                            return;
                        } else {
                            // If authentication fails, we send a 401 back
                            res.status(401);
                            res.json({
                                "status": 401,
                                "message": "Invalid credentials"
                            });
                            return;
                        }
                    }, function (error) {
                        res.status(401);
                        res.json({
                            "status": 401,
                            "message": "Invalid credentials"
                        });
                        return;
                    });
                });


            var genToken = function(user) {
                var expires = expiresIn(7); // 7 days
                var token = jwt.encode({
                    exp: expires,
                    user_id: user.id,
                    organization_id: user.organization_id,
                    type_id: user.type_id,
                    division_id: user.division_id

                }, require('./sec')());

                return {
                    token: token,
                    expires: expires,
                    user: user
                };
            };

            var expiresIn = function(numDays) {
                var dateObj = new Date();
                return dateObj.setDate(dateObj.getDate() + numDays);
            };

        */



        /*

        password: {
            type: DataTypes.VIRTUAL,
            set function (val) {
               this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
               this.setDataValue('hashword', this.salt + val);
             },
             validate: {
                isLongEnough: function (val) {
                  if (val.length < 8) {
                    throw new Error("Please choose a longer password")
                 }
              }
            }
        }

        */


        /*


        // Route all Traffic to Secure Server
        // Order is important (this should be the first route)
        app.all('*', function(req, res, next){
          if (req.secure) {
            return next();
          };
          res.redirect('https://troop.tech/:'+HTTPS_PORT+req.url);
          // res.redirect('https://'+req.hostname+':'+HTTPS_PORT+req.url);
        });
        */






















        app.get('/api/restricted', function(req, res) {
            console.log('user ' + req.body.username + ' is calling /api/restricted');
            res.json({
                name: 'foo'
            });
        });





        // Create database and listen
        database
        .sync({
            force: false
        })
        .then(function() {
            // HTTPS
            // https.createServer({
            //  key: fs.readFileSync('private.key'),
            //cert: fs.readFileSync('public.crt')
            //  }, app)
            app.listen(HTTPS_PORT, function() {
                console.log('listening at %s', HTTPS_PORT);
            });
        });
