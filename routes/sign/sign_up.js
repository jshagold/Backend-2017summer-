/**
 * Created by Hak on 2017-08-22.
 */
var express = require('express')
var router = express.Router()
var connection = require('../../connect')




router.post('/sign', function (req, res, next) {
    var data = JSON.parse(JSON.stringify(req.body))
    connection.query('insert into user (name,email,phone_number,password) values (?,?,?,?)', [data['name'],data['email'],data['phone_number'], data['password']], function(err) {
        if(err) {
            res.send({
                "result": false
            })
        }
        else {
            res.send({
                "result": true
            })
        }
    })
})


module.exports = router;