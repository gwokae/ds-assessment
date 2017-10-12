import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EventItem from './EventItem';
import SortSelector from './SortSelector';

class EventList extends React.Component {
	render() {
		let { events, sort } = this.props;
		return (
			<div>
				<h1>Event list:</h1>
				<h2>Sorting:</h2>
				<SortSelector />
				<ul>
					{ events
						.sort(({ starting_timestamp: ts1 }, { starting_timestamp: ts2 }) => (sort === 'asc' ? ts1 - ts2 : ts2 - ts1))
						.map((event, i) => (<EventItem event={event} key={i} />)) }</ul>
			</div>
		);
	}
}

EventList.propTypes = {
	events: PropTypes.array.isRequired,
	sort: PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ events: state.events, sort: state.sort });

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({}, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EventList);
