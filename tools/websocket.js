var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();

client.on('connect', function(connection) {
	console.log('connected');
	var data = {};

    function sendNumber() {
        if (connection.connected) {
        	console.log('+');
            var number = Math.round(Math.random() * 100);
            data = {
            	temperature: number
            };
            connection.sendUTF(JSON.stringify(data));
            setTimeout(sendNumber, 800);
        }
    }

    sendNumber();
});

client.connect('wss://wot.city/object/12345/send', '');