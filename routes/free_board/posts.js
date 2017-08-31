/**
 * Created by Hak on 2017-08-24.
 */
var express = require('express')
var router = express.Router()
var connection = require('../../connect')


router.post('/', function(req,res,next){
    var data = JSON.parse(JSON.stringify(req.body))
    connection.query('select _id from user where email = ?',data['email'], function(err, result) {
        var u_id = result[0]._id
        connection.query('insert into post (title,content,user_id) values (?,?,?)', [data['title'],data['content'],u_id], function(err) {
            if(err) {
                res.send({
                    "result" : false
                })
                console.log(err)
            }
            else {
                res.send({
                    "result" : true
                })
            }
        })
    })
})



module.exports = router