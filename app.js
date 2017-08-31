var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var app = express()
var userRouter = require('./routes/sign/sign_up')
var loginRouter = require('./routes/sign/sign_in')
var infoRouter = require('./routes/index')
var session = require('express-session')

// session
app.use(session({
    secret: '!@#!!!asqq!@#!##',
    resave: false,
    saveUninitialized: true
}))



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use("/user", userRouter)
app.use("/login", loginRouter)


//session test
app.get("/check/login", (req,res,next) => {
    var session = req.session
    console.log(session.username)
    if (session.username) {
        res.send(session.username)
    } else {
        res.send("not logined")
    }
})
app.get("/test", (req,res,next) => {
    res.send("<html><head></head><body><form action='/login', method='post'>" +
        "<input type='text' name='email'/>" +
        "<input type='text' name='password'/> " +
            "<input type='submit'/> "+
        "</form></body></html>")
})
app.use("/", infoRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});






module.exports = app;


