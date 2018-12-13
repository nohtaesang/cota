import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const LOAD_MORE_CARD = 'LOAD_MORE_CARD';
const GET_CARD_LIST = 'GET_CARD_LIST';
const SET_NUMBER_OF_CARD = 'SET_NUMBER_OF_CARD';

export const setCategory = (category, numberOfCard) => ({
	type: GET_CARD_LIST,
	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/getCardList', {
		category,
		numberOfCard
	})
});

export const initialState = {
	cardList: [],
	numberOfCard: 10
};

export default handleActions(
	{
		[SET_NUMBER_OF_CARD]: (state, action) => ({
			...state,
			numberOfCard: action.payload
		}),
		...pender({
			type: GET_CARD_LIST,
			onSuccess: (state, action) => {}
		}),
		...pender({
			type: LOAD_MORE_CARD,
			onSuccess: (state, action) => {}
		})
	},
	initialState
);
