/**
 * Created by Hak on 2017-08-29.
 */
var express = require('express')
var session = require('express-session')
var router = express.Router()
var connection = require('../../connect')

router.post('/', (req, res) => {
    var sess = req.session
    var data = JSON.parse(JSON.stringify(req.body))

    connection.query('select password, name from user where email = ?', data['email'], function(err, result) {
        if(err) {
            return res.send({
                "result" : false
            })
        }
        else {
            if(result[0].password == data['password']) {
                sess.username = data['email']
                sess.name = result[0].name
                res.send({
                    "result" : true
                })
            }
            else {
                return res.send({
                    "result" : false
                })
            }
        }
    })
})


module.exports = router

