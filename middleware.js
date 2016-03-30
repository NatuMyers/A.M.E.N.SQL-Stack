// middleware.js
module.exports = {
  create: {

    // on fetch
    fetch: function(req, res, context) {
    // manipulate the fetch call

        console.log('Request URL:', req.originalUrl);
        console.log('Request Type:', req.method);


      return context.continue;
    }
  },

  // on list
  list: {
    write: {
      before: function(req, res, context) {
        // modify data before writing list data


        return context.continue;
      },
      action: function(req, res, context) {
        // change behavior of actually writing the data

        console.log('test');
        console.log('Request URL:', req.originalUrl);
        console.log('Request Type:', req.method);

        return context.continue;
      },
      after: function(req, res, context) {
        console.log('after');
        // set some sort of flag after writing list data
        return context.continue;
      }
    }
  }
};
