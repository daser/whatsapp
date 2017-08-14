function route(app) {
    
     // get financial data
    app.get('/api/test', function (req, res, next) {
        res.send("Hello World from the APi Endpoint");
    });
    
    
    
}

module.exports.route = route;
