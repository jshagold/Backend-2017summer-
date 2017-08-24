/**
 * Created by Hak on 2017-08-24.
 */
var express = require('express')
var router = express.Router()
var connection = require('../../connect')


router.post('/', function (req, res, next) {
    var data = JSON.parse(JSON.stringify(req.body))

    connection.query('select _id from category where name = ?', [data['category_name']], function(err, result) {
        var c_id = result[0]._id
        connection.query('select _id from user where email = ?', [data['author']], function(err, result) {
            var u_id = result[0]._id
            connection.query('insert into find_job (category_id,title,content,start_time,end_time,latitude,longitude,user_id) values (?,?,?,?,?,?,?,?)', [c_id,data['title'],data['content'], data['start_time'],data['end_time'],data['latitude'],data['longitude'],u_id], function(err) {
                if(err) {
                    console.log(err)
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
    })
})

router.post('/', function(req, res, next) {
    var data = JSON.parse(JSON.stringify(req.body))

})


router.get('/:id', function (req, res, next) {

})






module.exports = router;