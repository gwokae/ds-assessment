import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './style.scss';
import EventList from './components/EventList';
import Communication from './components/Communication';
import reducer from './reducer';

const store = createStore(reducer);

ReactDOM.render(
	(
		<Provider store={store}>
			<Communication>
				<EventList/>
			</Communication>
		</Provider>
	), document.getElementById('app'),
);
