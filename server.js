import http from 'http';
import { Server as socketIO } from 'socket.io';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));
const PORT = 5010;

const server = http.createServer((req, res) => {
	fs.readFile(__dirname + '/index.html', (err, data) => {
		res.writeHead(200);
		res.end(data);
	});
});

server.listen(PORT, (req, res) => {
	console.log(`listening on http://localhost:${PORT}`);
});

const io = new socketIO(server);

io.on('connection', (socket) => {
	socket.emit('greeting-from-server', {
		greeting: 'you loaded the page '
	});
	socket.broadcast.emit('server-broadcast-message', {
		greeting: 'NEW CLIENT CONNNECTED '
	});
	// setInterval(() => {
	// 	var d = new Date();
	// 	var currentTime = d.toLocaleTimeString();
	// 	socket.broadcast.emit('server-reminder', {
	// 		greeting: 'a 10-second reminder: ' + currentTime
	// 	});
	// 	console.log('10-second reminder: ' + currentTime);
	// }, 10000);
});

// io.on('greeting-from-client', (message) => {
// 	console.log('client connected: ' + message.greeting);
// });
