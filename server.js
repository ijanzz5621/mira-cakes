let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');
let db = require('./lib/db');

const url = require('url');
const path = require('path');

//set port
app.set('port', process.env.PORT || 3000);

// credentials
let credentials = require('./credentials');

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//enable cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// routes
app.get('/api/products', (req, res, next) => {
    var products = require('./models/products');
    products.getProducts()
        .then(result => {
            res.json(result);
        });
});
app.post('/api/product', (req, res, next) => {
    //console.log(req.body);
    var products = require('./models/products');
    products.saveProduct(req.body)
        .then(result => {
            res.json(result);
        });
});

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve('./public/404.html'));
});

// app.listen(3000, function(){
//     console.log("Mira Cakes E-Commerce server started at port 3000...");
// });

//******************* */
//INIT and START server
//******************* */

function startServer() {
    // Connect to MySQL on start
    db.connect(db.MODE_PRODUCTION, function (err) {
        if (err) {
            console.log('Unable to connect to MySQL.')
            process.exit(1)
        } else {
            //start the server
            /*app.listen(app.get('port'), function () {
                console.log("ePDCA running at port " + app.get('port') + "....");
            });*/
            var io = require("socket.io").listen(app.listen(app.get('port'), function () {
                console.log("Mira Cakes server running at port " + app.get('port') + "....");
            }));

            //Socket IO
            require('./lib/socket')(io);
        }
    })
}

if (require.main === module) {
    startServer();
} else {
    module.exports = startServer;
}