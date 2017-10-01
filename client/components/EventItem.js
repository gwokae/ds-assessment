import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ACTIONS } from '../constants';

class EventItem extends React.Component {
	render() {
		let { event, actions } = this.props;
		let {
			event_id: eventId,
			camera_id: cameraId,
			starting_timestamp: ts,
			prediction, thumbnail,
		} = event;
		return (
			<li onClick={() => actions.eventReaded(this.props.event)} title='click to mark as read'>
				<img src={thumbnail} title={`event on camera_id: ${cameraId}`}/>
				<span title={`Event Id: ${eventId} Camera Id: ${cameraId} @ ${ts}` }>
					Camera <span class='content'>{cameraId}</span>{' '}
					detected <span class='content'>{prediction}</span>{' '}
					at <span class='content'>{new Date(ts).toString()}</span>{' '}
				</span>
			</li>
		);
	}
}

EventItem.propTypes = {
	event: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => (state);

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		eventReaded: ({ event_id: eventId }) => ({ type: ACTIONS.EVENT_READED, eventId }),
	}, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EventItem);
