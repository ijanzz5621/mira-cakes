var credentials = require('../credentials');

var mysql = require('mysql')
    , async = require('async');

var PRODUCTION_DB = credentials.mysql.liveDatabase
    , TEST_DB = credentials.mysql.testDatabase;

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
    pool: null
    , mode: null
};

exports.connect = function(mode, done){

    state.pool = mysql.createPool({
        host: credentials.mysql.host
        , user: credentials.mysql.username
        , password: credentials.mysql.password
        , database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
    });

    state.mode = mode;
    done();

};

exports.connection = mysql.createConnection({
    
     host: credentials.mysql.host
     , user: credentials.mysql.username
     , password: credentials.mysql.password
     , database: credentials.mysql.liveDatabase
 
 });

exports.get = function(){
    return state.pool;
}

exports.fixtures = function(data, done){

    var pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    var names = Object.keys(data.tables);
    async.each(names, function(name, cb){
        async.each(data.tables[name], function(row, cb){
            var keys = Object.keys(row)
                , values = keys.map(function(key){ return "'" +  row[key] + "'" });

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb);
        }, cb);
    }, done);
};

exports.drop = function(tables, done){

    var pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    async.each(tables, function(name, cb){
        pool.query('DELETE * FROM ' + name, cb);
    });

};