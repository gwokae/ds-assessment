import { ACTIONS } from './constants';

const toggleElement = (arr = [], val) => {
	if (arr.indexOf(val) === -1) {
		return [...arr, val];
	}
	return arr.filter(item => item !== val);
};

export default (state = { events: [], readedEventId: false, sort: 'desc' }, action) => {
	const { type, eventId } = action;
	switch (type) {
	case ACTIONS.TOGGLE_DETAILS:
		return {
			...state,
			openEventIds: toggleElement(state.openEventIds, eventId),
		};
	case ACTIONS.SORT_CHANGE:
		return {
			...state,
			sort: action.sort,
		};
	case ACTIONS.EVENTS_FETCHED:
		return {
			...state,
			events: action.events,
		};
	case ACTIONS.EVENT_READED:
		return {
			...state,
			readedEventId: eventId,
		};
	default:
		return state;
	}
};
