/**
 * Created by Hak on 2017-08-22.
 */
var express = require('express')
var router = express.Router()
var connection = require('../connect')




router.post('/sign', function (req, res, next) {
    connection.connect(function(err) {
        if (err) throw err
    })
    var data = JSON.parse(JSON.stringify(req.body))
    connection.query('insert into user (name,email,phone_number,password) values (?,?,?,?)', [data['name'],data['email'],data['phone_number'], data['password']], function(err) {
        if(err) {
            connection.end()
            res.send({
                "result": false
            })
        }
        else {
            connection.end()
            res.send({
                "result": true
            })
        }
    })
})

function () {
    connection.query("asdf").then( user => {
        var userId = user._id
        connection.query()
    })
    connection.query("insert into find_job",[userId],function() {

    })
}




module.exports = router;