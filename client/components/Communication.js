import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ACTIONS, INTERVAL } from '../constants';

class EventList extends React.Component {
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
		this.fetchNewEvents();
	}

	fetchNewEvents() {
		return fetch('/new-alarm-events')
			.then(res => res.json())
			.then((events) => {
				this.props.actions.renderEvents(events);
				this.fetchNewEventsTimeoutId = setTimeout(() => this.fetchNewEvents(), INTERVAL);
			});
	}

	markEventReaded() {
		let { readedEventId: id } = this.props;

		if (this.fetchNewEventsTimeoutId) {
			clearTimeout(this.fetchNewEventsTimeoutId);
			this.fetchNewEventsTimeoutId = 0;
		}
		if (id !== null || id !== undefined) {
			return fetch(`/event-viewed/${id}`)
				.then((res) => {
					this.fetchNewEvents();
					return res.json();
				});
		}

		return this.fetchNewEvents();
	}
}

EventList.propTypes = {
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
)(EventList);
