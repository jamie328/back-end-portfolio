var createError = require('http-errors');
var express = require('express');
var path = require('path'); // 抓取目錄路徑
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser'); //分析前端cookie 
var session = require('express-session') // session 會給予ID 網頁暫存資料庫
// 11/28 寄信新增
var flash = require('connect-flash'); // 錯誤訊息顯示暫存
var logger = require('morgan'); //日誌
var bodyParser = require('body-parser');      // 取得前端表單資料 11/21
// 載入firebase admin 11/22
var admin = require('firebase-admin');
// 11/28 載入 dotenv
require('dotenv').config();
// 11/28 載入cool & port
const cool = require('cool-ascii-faces');
const PORT = process.env.PORT || 5000

// 引入firebase金鑰
// var serviceAccount = require('./project-jamie-firebase-adminsdk-um01u-af1f1067ca.json');
// 連結 firebase 11/28 以env去開啟firebase
admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDE_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
  }),
  databaseURL: process.env.FIREBASE_URL
});

// 載入url.js
var indexRouter = require('./routes/index'); //載入index 模組.js
var usersRouter = require('./routes/users'); //載入user 模組.js
var formRouter = require('./routes/form'); //載入form 模組

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // 設定icon的路徑
app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.json());  // 解析表單資料-json 11/21
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));  // 解析表單資料-URL-encoded格式 11/21 11/28改為true
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 設定 靜態檔案的目錄起點位置

// 11/29 測試按鈕
app.use('/src',express.static('src'));

// 測試是否有載入firebase成功
var fireData = admin.database()
console.log(fireData)
// 給予session id 設定session屬性
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); 
app.use(flash());//啟用 message的暫存器(session設定完才use)

// 路由 網址區塊
app.use('/', indexRouter); //localhost/
app.use('/users', usersRouter); // localhost/users
app.use('/form', formRouter);

// 11/28 載入
app.get('/cool', (req, res) => res.send(cool()))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
/* to-do */
// 從firebase抓取資料顯示於test.ejs
app.get('/to_do', function(req, res){
  fireData.ref('todos').once('value', function(snapshot){
    let data = snapshot.val();
    res.render('to_do',{
      'todo': data
    })
  })
})
// 新增資料 
app.post('/to_do_add', function(req,res){
  let content = req.body.content // req 傳送的值
  let todo_push = fireData.ref('todos').push() // 包裝成功能
  todo_push.set({'content': content }).then( function(){
    fireData.ref('todos').once('value', function(snapshot){
      res.send({
        'success': true,
        'result': snapshot.val(),
        'message': '資料新增成功'
      })
    })
  })      
})
// 刪除資料 
app.post('/to_do_delete', function(req,res){
  let id = req.body.id; // 抓取id
  fireData.ref('todos').child(id).remove()  //刪除
  .then(function(){
    fireData.ref('todos').once('value', function(snapshot){
      res.send({
        'success': true,
        'result': snapshot.val(),
        'message': '資料刪除成功'
      })
    })
  }) 
})

/* roll-money */
app.get('/roll-money', function(req,res){
  res.render('money')
})
// app money post
app.post('/roll-money-add',function(req,res){
  let income = req.body.income;
  let save = req.body.save;
  let expense = req.body.expense;
  let expec_expense = req.body.expec_expense;
  let percent = req.body.percent;
  let text = req.body.text;
  let time = req.body.time;
  let color = req.body.color;
  let money_push = fireData.ref('roll-money').push();
  money_push.set(
    {'time':time,'income':income , 'save': save, 
    'expense':expense, 'expec_expense':expec_expense,
    'percent': percent,'text':text,'color':color
  })
  .then(function(){
    fireData.ref('roll-money').once('value', function(snapshot){
      res.send({
        'success': true,
        'result':snapshot.val(),
        'message': 'roll-money 資料新增成功'
      })
    })
  })
})
// app money delete
app.post('/roll-money-delete',function(req,res){
  let id = req.body.id
  fireData.ref('roll-money').child(id).remove()
  .then(function(){
    fireData.ref('roll-money').once('value', function(snapshot){
      res.send({
        'success': true,
        'result':snapshot.val(),
        'message': 'roll-money 資料刪除成功'
      })
    })
  })
})
// 拿取fireData內的record
app.get('/roll-money-record',function(req,res){
  fireData.ref('roll-money').once('value', function(snapshot){
    res.send({
      'success': true,
      'result': snapshot.val(),
      'message': '資料拿取成功'
    })
  })
})
// 拿取特定id其recorde資訊
app.post('/roll-money-specific',function(req,res){
  const choose_id = req.body.choose_id;
  fireData.ref('roll-money').child(choose_id).once('value',function(snapshot){
    res.send({
      'success': true,
      'result': snapshot.val(),
      'message': '資料拿取特定id成功'
    })
  })
})

// app.get('/roll-money',function(req,res){
//   res.render('money')
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

module.exports = app;
