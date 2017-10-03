import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ACTIONS } from '../constants';

class Communication extends React.Component {
	render() {
		return this.props.children;
	}

	componentDidUpdate({ readedEventId: oldId }) {
		let { readedEventId: newId } = this.props;
		if (oldId !== newId) {
			this.markEventReaded();
		}
	}

	componentDidMount() {
		// this.fetchNewEvents();
		this.socket = io('http://localhost:5612/');
		this.socket.on('connect', () => console.log('ws connected'));
		this.socket.on('disconnect', () => console.log('ws disconnected'));
		this.socket.on('event', e => console.log('ws event', e));
		this.socket.on('unread_events', this.onEventsUpdate.bind(this));
		this.socket.connect();
	}

	onEventsUpdate(unreadEvents) {
		this.props.actions.renderEvents(unreadEvents);
	}

	fetchNewEvents() {
		return fetch('/new-alarm-events')
			.then(res => res.json())
			.then((events) => {
				this.props.actions.renderEvents(events);
			});
	}

	markEventReaded() {
		let { readedEventId: id } = this.props;

		if (id !== null || id !== undefined) {
			return fetch(`/event-viewed/${id}`)
				.then(res => (res.json()));
		}
		return null;
	}
}

Communication.propTypes = {
	actions: PropTypes.object.isRequired,
	children: PropTypes.object.isRequired,
	readedEventId: PropTypes.any,
};

const mapStateToProps = state => ({ readedEventId: state.readedEventId });

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		renderEvents: events => ({ type: ACTIONS.EVENTS_FETCHED, events }),
	}, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Communication);
