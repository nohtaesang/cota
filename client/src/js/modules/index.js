import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import common from './common';
import user from './user';
import write from './write';
import cardList from './cardList';

export default combineReducers({
	user,
	common,
	write,
	cardList,
	pender: penderReducer
});
