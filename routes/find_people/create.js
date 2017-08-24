/**
 * Created by Hak on 2017-08-24.
 */
var express = require('express')
var router = express.Router()
var connection = require('../../connect')


router.post('/find_post', function (req, res, next) {
    connection.connect(function(err) {
        if (err) throw err
    })
    var data = JSON.parse(JSON.stringify(req.body))
    connection.query('insert into user (category_id,title,content,start_time,end_time,latitude,longtitude) values (?,?,?,?)', [data['category_id'],data['title'],data['content'], data['start_time'],data['end_time'],data['latitude'],data['longtitude']], function(err) {
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


module.exports = router;