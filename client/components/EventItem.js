import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ACTIONS } from '../constants';

class EventItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = { open: false };

		this.itemOnClick = this.itemOnClick.bind(this);
	}

	render() {
		let { event } = this.props;
		let {
			event_id: eventId,
			camera_id: cameraId,
			starting_timestamp: ts,
			prediction, thumbnail,
			read,
		} = event;

		let checkboxProps = {};
		if (read) checkboxProps.checked = true;

		return (
			<li key='main' className={this.state.open ? 'open' : ''} title='click to mark as read'>
				<div onClick={ this.itemOnClick }>
					<input type='checkbox' readOnly {...checkboxProps} />
					<img src={thumbnail} title={`event on camera_id: ${cameraId}`}/>
					<span title={`Event Id: ${eventId} Camera Id: ${cameraId} @ ${ts}` }>
						Camera <span className='content'>{cameraId}</span>{' '}
						detected <span className='content'>{prediction}</span>{' '}
						at <span className='content'>{new Date(ts).toString()}</span>{' '}
					</span>
				</div>
				<div className='details'>Yoyo</div>
			</li>
		);
	}

	itemOnClick() {
		let { event, actions } = this.props;

		// mark as read
		if (event.read === false) actions.eventReaded(event);

		// toggle details
		this.setState({ open: !this.state.open });
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
