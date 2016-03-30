// LOAD ---- ---- ---- ----

var fs = require('fs');
var https = require('https');
var HTTPS_PORT = process.env.PORT || 3111;



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
// var passportLocalSequelize = require('passport-local-sequelize');
// var EncryptedField = require('sequelize-encrypted');


var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('XltYzt1JkBmad6zXbHjvY_UCAZOslrvgGIANs0iUwX8eTz_C1fKE3gATdkNBMj3v', 'base64'),
  audience: 'T3YAIRD8KHXstcZAuRiMeBidAwdllo5w'
});


var bcrypt = require("bcrypt");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// secret key should be 32 bytes hex encoded (64 characters)




// Add Employee model
var database = new Sequelize('raptroopdb', 'root', 'strongpassword');


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


var User = database.define('User',
{

	//string

	// the important

    //WHEN CURLING YOU MUST ENTER THIS IN FIRST!
    hashword: {
        type:Sequelize.STRING,
		validate: {
			notEmpty: true,
			len: [8,30]
		}
	},

	username: {
	    unique: true,
	    isAlphanumeric: true, // only alphanumeric
		type: Sequelize.STRING,
		//allowNull: false,
		validate: {
			notEmpty: true,
			len: [5,16]
		}
	},
	email: {
	    unique: true,
		type: Sequelize.STRING,
		//allowNull: false,
		validate: {
			isEmail: true,
			notEmpty: true,
			len: [5,25]
		}
	},


	//other strings
    userType: {
        type:  Sequelize.STRING,
		validate: {
			isIn: [['Graphic Designer', 'Vocalist', 'DJ', 'Producer', 'Camera Worker', 'Record Label', 'Journalist',  'Lurker',  'Gear Junkie',  'Admin', 'Mod' ]]
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
			len: [5,16]
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

},  {
	hooks: {


	        /* retrieveByNamePassword: function (username, onSuccess, onError) {
        User.find({where: {username: username}}, {raw: true})
        .then(onSuccess).catch(onError);
        },
        */



    		beforeValidate: function() {
    		},
    		afterValidate: function(User) {
			    User.hashword = bcrypt.hashSync(User.hashword, 10);
    		},
    		beforeCreate: function() {
    		},
    		afterCreate: function() {
    		}
	}

}
);


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
User.hasMany(Collab);
Collab.belongsTo(User);

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
User.hasMany(Follow);
Follow.belongsTo(User, { as: 'Current', foreignKey: 'id', constraints: false});

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
Collab.hasMany(messageThread);
messageThread.belongsTo(Collab);

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
// no stacktraces leaked to User
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});









// set up a route to redirect http to https
https.get('*',function(req,res){
    res.redirect('https://troop.tech'+req.url)
})




// PAGE END POINTS  ---- ---- ---- ----
// use res.render to load up an ejs view file


// index page
// Your app will only route page requests that
// are set up at the time of your app.use(app.router) call.
// http://stackoverflow.com/questions/19620239/cant-get-index-html-to-show-with-express-in-nodejs
// __dirname is the directory that the executing script resides in,
// so because that lives in the js directory that's a peer to public your code would need to be:
*/

app.use(express.static(__dirname + "/public"));
app.get('/', function(req, res){
  res.redirect('/public/index.html');
});

app.get('/exgmrm03.htm', function(req,res) {
   res.redirect('/public/kuv0sc9m.htm');
});

// MODEL END POINTS ---- ---- ---- ----
// Create REST resource
var userResource = epilogue.resource({
  model: User,
  endpoints: ['/api/users', '/api/users/:id']
});

app.use('/api/users', jwtCheck);

var collabResource = epilogue.resource({
  model: Collab,
  endpoints: ['/api/collabs', '/api/collabs/:id']
});

app.use('/api/collabs', jwtCheck);

var messageThreadResource = epilogue.resource({
  model: messageThread,
  endpoints: ['/api/messageThreads', '/api/messageThreads/:id']
});

app.use('/api/messageThreads', jwtCheck);


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




// Create database and listen
database
    .sync({ force: false })
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
