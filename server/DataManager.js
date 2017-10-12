const apiRe = /^\/(events|new-alarm-events|event-viewed)(\/([a-zA-Z0-9]+))?$/;
const db = [];
const possiblePredictions = ['people', 'car', 'animal', 'ufo'];
let generateNewEvent = () => {
	let { length: id } = db;
	return {
		event_id: id,
		camera_id: Math.round(Math.random() * 10),
		starting_timestamp: Date.now(),
		prediction: possiblePredictions[Math.floor(Math.random() * possiblePredictions.length)],
		thumbnail: `https://dummyimage.com/150x150/333333/f0f0f0.jpg&text=event${id}`,
		read: false,
	};
};

let lastInsert;
let addEvent = (event = generateNewEvent()) => {
	db.push(event);
	lastInsert = Date.now();
};
addEvent();

const getUnreadEvents = () => db.filter(item => !item.read);
const getEvents = () => db;

const eventListenerDb = {};
const on = (event, func) => {
	if (!eventListenerDb[event]) eventListenerDb[event] = [];
	eventListenerDb[event].push(func);
};

let simpleApiMiddleware = (req, res, next) => {
	let match = req.url.match(apiRe);
	let event;
	if (match) {
		// randomly insert new event
		if (Date.now() - lastInsert > 5000 && Math.random() < 0.03) {
			addEvent();
		}

		// process req
		let resObject;
		const action = match[1];
		const id = match[3];
		switch (action) {
		case 'events':
			resObject = db;
			break;
		case 'new-alarm-events':
			resObject = getUnreadEvents();
			break;
		case 'event-viewed':
			event = db[id];
			if (event) {
				event.read = true;
				resObject = { result: 'ok', event };
			} else {
				resObject = { errorCode: 404, message: `Event not found ${id}` };
			}
			if (eventListenerDb['event-viewed']) {
				eventListenerDb['event-viewed'].forEach(func => func(resObject));
			}
			break;
		default:
		}
		if (resObject && !resObject.errorCode) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
		} else {
			let error = (resObject || {});
			let { errorCode = 500, message = `unable to process: ${req.url}` } = error;
			res.writeHead(errorCode, { 'Content-Type': 'application/json' });
			resObject = { message, error };
		}
		res.end(JSON.stringify(resObject));
	} else {
		next();
	}
};

module.exports = {
	simpleApiMiddleware,
	addEvent,
	getEvents,
	getUnreadEvents,
	on,
};
