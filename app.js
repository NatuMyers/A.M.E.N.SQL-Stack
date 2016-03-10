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
// var passportLocalSequelize = require('passport-local-sequelize');
// var EncryptedField = require('sequelize-encrypted');

var passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios
var passportLocal =require('passport-local').Strategy;



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


var User = database.define('User', {

	//string

	// the important

	username: {
	    unique: true,
	    isAlphanumeric: true, // only alphanumeric
		type: Sequelize.STRING,
		//allowNull: false,
		validate: {
			notEmpty: true,
			len: [1,15]
		}
	},
	email: {
	    unique: true,
		type: Sequelize.STRING,
		//allowNull: false,
		validate: {
			isEmail: true,
			notEmpty: true,
			len: [1,15]
		}
	},
	hashword: Sequelize.STRING,

	//other strings
    userType: Sequelize.STRING,
	fname: Sequelize.STRING,
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
	rating: Sequelize.INTEGER,
	hashcardno: Sequelize.INTEGER,
	longitude: Sequelize.INTEGER,
	latitude: Sequelize.INTEGER,

	//bools
	isShowingSoc: Sequelize.BOOLEAN,
	isShowingLoc: Sequelize.BOOLEAN,
	isShowingSO: Sequelize.BOOLEAN,
	isSuspended: Sequelize.BOOLEAN,
	isBanned: Sequelize.BOOLEAN,
	isAuth: Sequelize.BOOLEAN,

	//date
	dob: Sequelize.DATE

},   {
	hooks: {
		beforeValidate: function() {

		},
		afterValidate: function(User) {
			// hashed pwd goes to db
			//var hw = User.hashword;
			//var salt = bcrypt.genSaltSync(10);
			User.hashword = bcrypt.hashSync(User.hashword, 10);


		},
		beforeCreate: function() {

		},
		afterCreate: function() {

		}
	}
});








// Add Account model with foreign key constraint to User
var Collab = database.define('Collab', {
	payAmount: Sequelize.INTEGER,
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

// MODEL END POINTS ---- ---- ---- ----
// Create REST resource
var userResource = epilogue.resource({
  model: User,
  endpoints: ['/api/users', '/api/users/:id']
});

var collabResource = epilogue.resource({
  model: Collab,
  endpoints: ['/api/collabs', '/api/collabs/:id']
});

var messageThreadResource = epilogue.resource({
  model: messageThread,
  endpoints: ['/api/messageThreads', '/api/messageThreads/:id']
});



// Create database and listen
database
    .sync({ force: false })
    .then(function() {
    app.listen(port, function() {
        console.log('listening at %s', port);
    });
});
