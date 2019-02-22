import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import common from './common';
import user from './user';
import write from './write';
import cardList from './cardList';
import comment from './comment';

export default combineReducers({
	user,
	common,
	write,
	cardList,
	comment,
	pender: penderReducer
});
