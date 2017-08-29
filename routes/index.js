/**
 * Created by Hak on 2017-08-24.
 */
var express = require('express')
var router = express.Router()
var postRouter = require('./find_people/posts')
var freePostRouter = require('./free_board/posts')

router.use("/findposts", postRouter)
router.use("/freeposts", freePostRouter)


module.exports = router