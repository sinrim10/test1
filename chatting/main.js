/**
 * Created by Administrator on 2015-04-14.
 */
var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
   //res.sendfile(__dirname+'/main.html');
   res.sendfile('views/roommain.html');
 /*  fs.readFile("views/main.html",function(err,data){
      if(!err){
         res.writeHead(200,{'content-type':'text/html'});
         res.end(data);
      }
   });*/
});

router.get('/enter', function(req, res, next) {
   //res.sendfile(__dirname+'/main.html');
   res.sendfile('views/main.html');
   /*  fs.readFile("views/main.html",function(err,data){
    if(!err){
    res.writeHead(200,{'content-type':'text/html'});
    res.end(data);
    }
    });*/
});


module.exports = router;