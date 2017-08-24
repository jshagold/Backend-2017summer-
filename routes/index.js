/**
 * Created by Hak on 2017-08-24.
 */
var express = require('express')
var router = express.Router()
var postRouter = require('./find_people/create')

router.use("/find", postRouter);

module.exports = router