/**
 * Created by Lee on 2015-04-22.
 */
var socketio = require('socket.io')
, express = require('express')
, https = require('http')
, fs = require('fs');

var app = express();
app.set('port',3033);
var server = https.createServer(app).listen(app.get('port'),function(){
    console.log('express server listening on port' + app.get('port'));
});
app.get('/',function(req,res){
    //req.sendFile('index.html');
    fs.readFile('views/index.html',function(err,data){
        res.writeHead(200,{'content-type':'text/html'});
        res.end(data);
    });
});
var roomnm ="";
var io = socketio.listen(server);
io.sockets.on('connection',function(socket){
    socket.on('join',function(data){
        console.log('data : ' + data)
        roomnm = data.roomname;

        socket.join(roomnm);
        //roomname 으로 방만들기
        io.sockets.in(roomnm).emit('join',data);
        var numClients = io.sockets.adapter.rooms
        console.log(numClients);
        //roomnm 의 방에게 메세지 뿌리기기
    });
    socket.on('message',function(msg){
        console.log('message event2');
        console.log('room info' + io.sockets.adapter.rooms);
       // console.log('io.sockets.clients(‘roon name’)' + io.sockets.clients(roomnm));
        io.sockets.in(roomnm).emit('message',msg);
        //클라이언트의 message 이벤트로 데이터전송
        /*socket.get('room',function(err,room){
            io.sockets.in(roomnm).emit('message',msg);
        });*/
    });

});

/*
var chat = io.of('/chat').on('connection',function(cltSocket){
   cltSocket.on('joinRoom',function(room_id){
       var cilents_in_room = chat.clients(room_id).length;
   })

});*/
