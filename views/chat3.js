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
    fs.readFile('index.html',function(err,data){
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
        socket.join(data.roomname);
        io.sockets.in(roomnm).emit('join',data.userid);
        /*socket.set('room',data.roomname);

        socket.get('room',function(err,room){

        });*/
    });
    socket.on('message',function(msg){
        io.sockets.in(roomnm).emit('message',msg);
        /*socket.get('room',function(err,room){
            io.sockets.in(roomnm).emit('message',msg);
        });*/
    });

});