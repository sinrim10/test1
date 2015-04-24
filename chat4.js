/**
 * Created by Lee on 2015-04-24.
 */
var io = require('socket.io').listen(8080);

io.sockets.on('connection',function(socket){
    var timeout = 10000 //idle timeout
        ,sockets = io.sockets.sockets //sockets store
        ,clients = {}//clients store
        ,timer = null; //timeout store


    function idle(){
        clear();
        timer = setTimeout(function(){
            if(clients[socket.id]){
                clients[socket.id].idle = true;
                socket.broadcast.emit('idle',socket.id,true);
            }//if
            timer = null;
        }, timeout);
    }

    function clear(){
        clients[socket.id].idle = false;
        timer && clearTimeout(timer);
    }
});

