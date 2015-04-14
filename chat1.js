/**
 * Created by Administrator on 2015-04-14.
 */
var socketio = require("socket.io")
    ,express = require("express")
    ,http = require("http")
    ,fs = require("fs");
var path = require('path');

var route = require('./chatting/main');
//var route = require('./routes/index');

var app =  express();

app.set('views', path.join(__dirname,'views'));
console.log(__dirname);
app.set('view engine','jade');


//app.register('.html', require('jade'));
//view 폴더 지정


//view 엔진 지정
app.set('port',4000);
var httpserver = http.createServer(app).listen(app.get('port'),function(){
    console.log('express server listen on port' + app.get('port'));
});
//서버 올리기

//라우팅 설정하기.
app.use('/main', route);

//소켓 연결
var io = socketio.listen(httpserver);

io.sockets.on(
    'connection',function(socket){
            socket.emit('test','hello');
            socket.on('clientmsg',function(data){
                console.log('server : ' + data['msg']);
                socket.emit('servermsg',{'msg':data['msg']});
            });
        }
);
