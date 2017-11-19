var connectionManager = require('../lib/connectionManager');
var q = require('q');
var uuid = require("uuid");

function getProducts(){
    var deferred = q.defer();
    var sql = "select * from products;";

    connectionManager.getConnection()
        .then(function (connection) {
            connection.query(sql, function (err, results) {
                if (err) {
                    console.error(err);
                    deferred.reject(error);
                }
                deferred.resolve(results);
            })
        })
        .fail(function (err) {
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });

    return deferred.promise;
}

function saveProduct(product){
    var deferred = q.defer();
    var sql = "insert into products (product_id, product_name, product_type, product_price, product_flavor, product_description, USERS_user_id) " +
    "values ('" + product.product_id + "', '" + product.product_name + "', '" + product.type + "', '" + product.price + "', '" + product.flavour + "', '" + product.desc + "', '1');";

    connectionManager.getConnection()
        .then(function (connection) {
            connection.query(sql, function (err, results) {
                if (err) {
                    console.error(err);
                    deferred.reject(error);
                }
                deferred.resolve(results);
            })
        })
        .fail(function (err) {
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });

    return deferred.promise;
}

module.exports = {
    getProducts: getProducts
    , saveProduct: saveProduct
}