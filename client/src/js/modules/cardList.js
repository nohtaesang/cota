import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

// const INIT_GET_CARD_LIST = 'INIT_GET_CARD_LIST';
// export const getCardList = (numberOfCard) => ({
// 	type: INIT_GET_CARD_LIST,
// 	payload: axios.post(`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/list/recent/${numberOfCard}`)
// });

const GET_CARD_LIST = 'GET_CARD_LIST';
export const getCardList = (numberOfCard) => ({
	type: GET_CARD_LIST,
	payload: axios.get(`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/posts/${numberOfCard}`)
});

// cardList 로 갔을 때, 카드를 계속 더 불러오는 것을 방지
const GET_MORE_CARD_LIST = 'GET_MORE_CARD_LIST';
export const getMoreCardList = (numberOfCard) => ({
	type: GET_MORE_CARD_LIST,
	payload: axios.get(`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/posts/${numberOfCard}`)
});

const RESET_CARD_LIST = 'RESET_CARD_LIST';
export const resetCardList = () => ({
	type: RESET_CARD_LIST
});

const SET_NUMBER_OF_CARD = 'SET_NUMBER_OF_CARD';
export const setNumberOfCard = (numberOfCard) => ({
	type: SET_NUMBER_OF_CARD,
	payload: numberOfCard
});
const SET_IS_CARD_DETAIL_ACTIVE = 'SET_IS_CARD_DETAIL_ACTIVE';
export const setIsCardDetailActive = (state) => ({
	type: SET_IS_CARD_DETAIL_ACTIVE,
	payload: state
});

const SET_CARD_DETAIL = 'SET_CARD_DETAIL';
export const setCardDetail = (cardDetail) => ({
	type: SET_CARD_DETAIL,
	payload: cardDetail
});

const DELETE_CARD = 'DELETE_CARD';
export const deleteCard = (no) => ({
	type: DELETE_CARD,
	payload: axios.delete(`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/posts/${no}`)
});

// export const loadCardDetail = (no) => ({
// 	type: LOAD_CARD_DETAIL,
// 	payload: axios.get(`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/posts/${no}`)
// });

// export const setCategory = (category) => ({
// 	type: SET_CATEGORY,
// 	payload: category
// });

export const initialState = {
	cardList: [],
	cardDetail: null,
	numberOfCard: 0,
	isCardDetailActive: false
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
		[RESET_CARD_LIST]: (state, action) => ({
			...state,
			cardList: []
		}),
		[SET_CARD_DETAIL]: (state, action) => ({
			...state,
			cardDetail: action.payload
		}),
		...pender({
			type: GET_CARD_LIST,
			onSuccess: (state, action) => ({
				...state,
				cardList: action.payload.data
			})
		}),
		...pender({
			type: GET_MORE_CARD_LIST,
			onSuccess: (state, action) => ({
				...state,
				cardList: state.cardList.concat(action.payload.data)
			})
		}),
		...pender({
			type: DELETE_CARD,
			onSuccess: (state, action) => ({
				...state
			})
		})
	},
	initialState
);
