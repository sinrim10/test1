/**
 * Created by Administrator on 2015-04-14.
 */
var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/main', function(req, res, next) {
   res.render('main');
});

module.exports = router;