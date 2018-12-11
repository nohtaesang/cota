import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import write from './write';

export default combineReducers({
	write,
	pender: penderReducer
});
