/**
 * Created by Hak on 2017-08-24.
 */
var express = require('express')
var router = express.Router()
var connection = require('../../connect')


router.post('/', function(req,res,next){
    var data = JSON.parse(JSON.stringify(req.body))
    connection.query('insert into post (title,content,user_id) values (?,?,?)', [data['title'],data['content'],data['user_id']], function(err) {
        if(err) {
            res.send(req.body)
        }
    })
})