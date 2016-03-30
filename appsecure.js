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

//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var secret = 'this is the secret secret secret 12356';
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken





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
if(!req.body.username) {
    res.status(401).send('No username specified');
    return;
}

if(!req.body.password) {
    res.status(401).send('No password specified');
    return;
}

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



        app.get('/api/restricted', function(req, res) {
            console.log('user ' + req.body.username + ' is calling /api/restricted');
            res.json({
                name: 'foo'
            });
        });


        // Create database and listen -------------------------
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
