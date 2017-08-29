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

router.delete('/',function (req, res, next) {
    var data = JSON.parse(JSON.stringify(req.body))
    connection.query('delete from find_job where _id = ?',[data['post_id']] , function(err) {
        if(err) {
            res.send({
                "result" : false
            })
        }
        else {
            res.send({
                "result" : true
            })
        }
    })
})

router.get('/list/:id', function(req, res, next) {
    var var_id = req.params.id
    connection.query('select find_job._id, user.name as author, category.name as category, title, start_time, end_time, latitude, longitude from find_job join category on find_job.category_id = category._id join user on find_job.user_id = user._id', function(err, posts) {
        var list = []
        posts.forEach((value, index, ar) => {
            var listvalue = {_id: value._id, author: value.author, category: value.category, title: value.title, start_time: value.start_time, end_time: value.end_time, latitude: value.latitude, longitude: value.longitude}
            list.push(listvalue)
        })
        JSON.stringify(list)
        res.send(list)
    })
})

router.get('/:id', function (req, res, next) {
    var var_id = req.params.id
    connection.query('select find_job._id, user.name as author, category.name as category, title, content, latitude, longitude, start_time, end_time from find_job join category on find_job.category_id = category._id join user on find_job.user_id = user._id where find_job._id = ?', [var_id], function(err, result) {
        if(err) res.send({
            "result" : false
        })
        else {
            res.send({
                "_id" : result[0]._id,
                "author" : result[0].author,
                "category" : result[0].category,
                "name" : result[0].name,
                "title" : result[0].title,
                "content" : result[0].content,
                "latitude" : result[0].latitude,
                "longitude" : result[0].longitude,
                "start_time" : result[0].start_time,
                "end_time" : result[0].end_time,
            })
        }
    })
})


module.exports = router;