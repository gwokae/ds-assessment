import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ACTIONS } from '../constants';

class SortSelector extends React.Component {
	constructor(props) {
		super(props);

		this.getRadio = this.getRadio.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	render() {
		return (
			<span>
				{ this.getRadio('old to new', 'asc') }
				{ this.getRadio('new to old', 'desc') }
			</span>
		);
	}

	getRadio(label, value) {
		return (
			<label>
				<input type='radio' name='sort'
					onChange={this.onChange} value={value}
					checked={ this.props.sort === value }
				/>
				{label}
			</label>
		);
	}

	onChange(e) {
		this.props.actions.changeSorting(e.target.value);
	}
}

SortSelector.propTypes = {
	sort: PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ sort: state.sort });

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		changeSorting: sort => ({ type: ACTIONS.SORT_CHANGE, sort }),
	}, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SortSelector);
