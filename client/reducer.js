import { ACTIONS } from './constants';

export default (state = { events: [], readedEventId: false, sort: 'desc' }, action) => {
	switch (action.type) {
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
			readedEventId: action.eventId,
		};
	default:
		return state;
	}
};
