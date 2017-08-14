function route(app)
{
    // setup the variables for the other routers we are using
    // of course we could have combined them all here, but this is for legibility
    app.get('/AuthenticationTest', function(req, res) { res.send('Authentication Test Passed!'); });
    app.get('/RouteTest', function(req, res) { res.send('We are Routing! :)'); });
    
    //Using this format it means we can separate router classes
    var chatController = require("./chat.js");
    chatController.route(app);
    
    var memberController = require("./member.js");
    memberController.route(app);

    //var accountController = require("./account.js");
    //accountController.route(app);
}


module.exports.route = route;
