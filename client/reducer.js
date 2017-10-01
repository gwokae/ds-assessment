import { ACTIONS } from './constants';

export default (state = { events: [], readedEventId: false }, action) => {
	switch (action.type) {
	case ACTIONS.EVENTS_FETCHED:
		return {
			...state,
			events: action.events,
		};
	case ACTIONS.EVENT_READED:
		return {
			...state,
			readedEventId: action.eventId,
		};
	default:
		return state;
	}
};
