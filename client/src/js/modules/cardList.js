import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const GET_CARD_LIST = 'GET_CARD_LIST';
const LOAD_MORE_CARD = 'LOAD_MORE_CARD';
const SET_NUMBER_OF_CARD = 'SET_NUMBER_OF_CARD';
const LOAD_CARD_DETAIL = 'LOAD_CARD_DETAIL';
const SET_IS_CARD_DETAIL_ACTIVE = 'SET_IS_CARD_DETAIL_ACTIVE';

export const getCardList = (category, numberOfCard) => ({
	type: GET_CARD_LIST,
	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/list', {
		category,
		numberOfCard
	})
});

export const setIsCardDetailActive = (state) => ({
	type: SET_IS_CARD_DETAIL_ACTIVE,
	payload: state
});

export const loadCardDetail = (no) => ({
	type: LOAD_CARD_DETAIL,
	payload: axios.get(`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/posts/${no}`)
});

export const initialState = {
	cardList: [],
	numberOfCard: 10,
	isCardDetailActive: false,
	cardDetail: ''
};

export default handleActions(
	{
		[SET_NUMBER_OF_CARD]: (state, action) => ({
			...state,
			numberOfCard: action.payload
		}),
		[SET_IS_CARD_DETAIL_ACTIVE]: (state, action) => ({
			...state,
			isCardDetailActive: action.payload
		}),
		...pender({
			type: GET_CARD_LIST,
			onSuccess: (state, action) => {
				console.log(action.payload.data);
				return { ...state, cardList: action.payload.data };
			}
		}),
		...pender({
			type: LOAD_MORE_CARD,
			onSuccess: (state, action) => {}
		}),
		...pender({
			type: LOAD_CARD_DETAIL,
			onSuccess: (state, action) => {
				console.log(action.payload.data);
				return { ...state, cardDetail: action.payload.data };
			}
		})
	},
	initialState
);
