var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const url = require('url');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const studentRouter = require('./routes/student');
const errorRouter = require('./routes/error');
const mongoRouter = require('./routes/mongo');
// 引入自定义的中间件
const cusMiddle = require('./middleware/test_middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set("title","Express demo");

// 定义一个中间件
const myLogger = (req,res,next) => {
  let path = url.parse(req.url).pathname;
  console.log("DEBUG",path)
  console.log(app.get("title"))
  next(); // 执行下一个中间件
}
// 使用定义的中间件
app.use(myLogger)

// 使用一个可以配置的中间件
app.use(cusMiddle({name: "Juddy",password: "123456"}));

// 对路径/users使用中间件(可以使用一系列的中间件函数)
app.use("/users",(req,res,next) => {
  console.log("请求用户信息");
  next();
},(req,res,next) => {
  console.log(req.method);
  next();
})

app.use(logger('dev'));
app.use(express.json());// 内置中间件
app.use(express.urlencoded({ extended: false }));// 内置中间件
app.use(cookieParser());// 第三方中间件
app.use(express.static(path.join(__dirname, 'public')));// 内置中间件

app.param("id",(req,res,next,id) => {
  console.log("ID : " + id);
  // req.cookies.name = "garyhu"
  next();
});

app.get("/goods/:id",(req,res,next) => {
  console.log("BASEURL : "+req.baseUrl);
  console.log("cookies : " + req.cookies.val);
  console.log("hostname : " + req.hostname);
  console.log("route : " + req.route);
  console.log("req.is('text/html') : " + req.is('text/html'));
  res.cookie("val","CK");
  res.links({
    next: 'http://api.example.com/users?page=2',
    last: 'http://api.example.com/users?page=5'
  });
  res.send("GOODS ID : " + req.params.id);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student',studentRouter);
app.use('/err',errorRouter);
app.use('/mongo',mongoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("404");
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 定义一个子应用admin，然后挂载在app应用上
const admin = express();

admin.on("mount",(parent) => {
  console.log(parent);
  console.log("Admin mounted")
})

admin.get("/",function(req,res,next) {
  res.send("Admin application")
});

console.log(app.path());

module.exports = app;
