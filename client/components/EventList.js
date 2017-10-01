import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EventItem from './EventItem';

class EventList extends React.Component {
	render() {
		let { events } = this.props;
		return <ul>{ events.map((event, i) => (<EventItem event={event} key={i} />)) }</ul>;
	}
}

EventList.propTypes = {
	events: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ events: state.events });

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({}, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EventList);
