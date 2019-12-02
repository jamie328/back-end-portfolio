var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer'); 
var csrf = require('csurf');
var smtpTransport = require('nodemailer-smtp-transport'); // 11/28 新增於heroku 傳送問題
require('dotenv').config();

// 建立一個cookie供CSURF驗證 - setup route middlewares
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false })

router.get('/', csrfProtection ,function(req, res, next){
    res.render('form',{
        csrfToken: req.csrfToken(), //傳入csrfToken驗證
        errors: req.flash('errors')
    });
});

router.get('/complete',function(req,res,next){
    res.render('form_complete');
});

router.post('/post', csrfProtection ,function(req,res){
    const chioce_list = ['教授的八卦','藝人的私生活','財團的黑幕','韓國瑜的頭髮根數'];
    // 設定SMTP
    if (req.body.username === '' || req.body.email=== '' || req.body.choice === ''){
        req.flash('errors', '使用者、email、title、content 不得空白哦!!')
        res.redirect('/form');
        return 
    }else if (req.body.email.indexOf('@')<0){ // 小於零代表找不到
        req.flash('errors', 'email沒 @ 哦!')
        res.redirect('/form');
        return 
    }
    const selected = chioce_list[req.body.choice] 
    var transporter = nodemailer.createTransport(smtpTransport({
        service : 'Gmail',
        host : 'smtp.gmail.com',
        secureConnection: false, // SSL方式,防止竊取訊息
        auth:{
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASS
        },tls:{
            //不檢查伺服器
            rejectUnauthorized: false
        }
    }))
    var mailOptions = {
        from : '"黃鳴藤" <pythonjs5566@gmail.com>',
        to: req.body.email,
        cc: 'pythonjs5566@gmail.com',
        subject : "(測試寄信)訂閱好康秘密報報報...馬仔",
        text: "感謝您訂閱本服務，原來您對『" + selected + "』這麼感興趣啊!!! 顆顆顆"
    };
    transporter.sendMail(mailOptions, function(err, info){
        if (err){
            return console.log(err)
        }
        res.redirect('/form/complete')
    })
})


module.exports = router;