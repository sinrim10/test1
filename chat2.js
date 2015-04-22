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

io.sockets.on('connection',function(socket){
            socket.on('roommake',function(data){
               socket.join(data.roomname);
               //방만들기
               socket.set('roomname',data.roomname);
               socket.set('nickname',data.nickname);
                //set 함수를 사용하여 클라이언트의 값을 저장할 수 있다. get함수를 이용하여 값을 호출할 수 있다.

            });
            socket.on('login',function(data){
                //로그인정보알리기
                socket.join(data.id);
                //방만들기
                socket.set('roomname',data.id);
                socket.set('nickname',data.text);
                socket.broadcast.emit('loginmsg',data.id +" Enter.");
                console.log('ddd' + socket.get('roomname',function(){}));
            });
            socket.on('clientmsg',function(data){
                console.log(' ' + data['msg']);

            });
        }
);
