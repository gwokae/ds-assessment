let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let dataManager = require('./DataManager');

io.on('connection', (socket) => {
	console.log('a user connected');
	let emitUnreadEvents = () => {
		socket.emit('unread_events', dataManager.getUnreadEvents());
	};
	emitUnreadEvents();

	dataManager.on('event-viewed', emitUnreadEvents);
	dataManager.on('event-viewed', () => console.log('event mark as read'));

	// random add new event
	setInterval(() => {
		if (Math.random() < 0.1) {
			console.log('new event added');
			dataManager.addEvent();
			emitUnreadEvents();
		}
	}, 500);
});

http.listen(5612, () => {
	console.log('socket io listening on *:5612');
});
