import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ACTIONS, TAGS } from '../constants';

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
			<li key='main' className={this.state.open ? 'open' : ''} >
				<div onClick={ this.itemOnClick } title='click to mark as read & expand details'>
					<input type='checkbox' readOnly {...checkboxProps} />
					<img src={thumbnail} title={`event on camera_id: ${cameraId}`}/>
					<span title={`Event Id: ${eventId} Camera Id: ${cameraId} @ ${ts}` }>
						Camera <span className='content'>{cameraId}</span>{' '}
						detected <span className='content'>{prediction}</span>{' '}
						at <span className='content'>{new Date(ts).toString()}</span>{' '}
					</span>
				</div>
				<div className='details'>
					<img src={`http://lorempixel.com/150/150/?${performance.now()}`} />
					<h3>Title: {`Event Id: ${eventId} Camera Id: ${cameraId} @ ${ts}`}</h3>
					<button onClick={ this.itemOnClick }>X</button>
					{ TAGS.map((tag, i) => <Tag name={tag} key={i} marked={prediction === tag} event={event} />) }
				</div>
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

	tagOnClick(e) {
	}
}

EventItem.propTypes = {
	event: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
};

class Tag extends React.Component {
	render() {
		const { name, marked, event: { event_id: id } } = this.props;
		return (
			<span className={ `label ${marked ? 'marked' : ''}`} onClick={ () => fetch(`/event/${id}/toggleTag/${name}`) } >
				{name}
			</span>
		);
	}
}

Tag.propTypes = {
	name: PropTypes.string.isRequired,
	event: PropTypes.object.isRequired,
	marked: PropTypes.bool.isRequired,
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
