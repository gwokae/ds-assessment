const apiRe = /^\/(events|new-alarm-events|event-viewed|event)(\/([a-zA-Z0-9]+))?(\/toggleTag\/(\S+))?$/;
const db = [];
const possiblePredictions = ['people', 'car', 'animal', 'ufo'];
const PREDICTION_DEIM = ', ';
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

let addEvent = (event = generateNewEvent()) => {
	db.push(event);
};
addEvent();

const getUnreadEvents = () => db.filter(item => !item.read);
const getEvents = () => db;

const eventListenerDb = {};
const on = (event, func) => {
	if (!eventListenerDb[event]) eventListenerDb[event] = [];
	eventListenerDb[event].push(func);
};

const triggerEventsUpdated = (data) => {
	if (eventListenerDb['events-updated']) {
		eventListenerDb['events-updated'].forEach(func => func(data));
	}
};

const getNotFoundMessage = (id) => ({ errorCode: 404, message: `Event not found ${id}` });
const toggleElement = (arr = [], val) => {
	if (arr.indexOf(val) === -1) {
		return [...arr, val];
	}
	return arr.filter(item => item !== val);
};
let simpleApiMiddleware = (req, res, next) => {
	let match = req.url.match(apiRe);
	let event;
	if (match) {
		// process req
		let resObject;
		const action = match[1];
		const id = match[3];
		switch (action) {
		case 'events':
			resObject = db;
			break;
		case 'event':
			event = db[id];
			if (event) {
				if (!match[5]) {
					resObject = { errorCode: 400, message: 'We only support \'/event/{id}/toggleTag/{tag}\'' };
				} else {
					event.prediction = toggleElement(event.prediction.split(PREDICTION_DEIM), match[5]).filter(s => s !== '').join(PREDICTION_DEIM);
					triggerEventsUpdated();
					resObject = { result: 'ok', event };
				}
			} else {
				resObject = getNotFoundMessage(id);
			}
			break;
		case 'new-alarm-events':
			resObject = getUnreadEvents();
			break;
		case 'event-viewed':
			event = db[id];
			if (event) {
				event.read = true;
				resObject = { result: 'ok', event };
				triggerEventsUpdated();
			} else {
				resObject = getNotFoundMessage(id);
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
