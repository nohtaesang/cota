import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import write from './write';
import cardList from './cardList';

export default combineReducers({
	write,
	cardList,
	pender: penderReducer
});
