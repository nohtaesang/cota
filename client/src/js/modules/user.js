import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const GET_NAVER_LOGIN_URL = 'GET_NAVER_LOGIN_URL';
const SET_CUR_PAGE = 'SET_CUR_PAGE';
const CLICK_NAVER_LOGIN = 'CLICK_NAVER_LOGIN';

export const getNaverLoginUrl = () => ({
	type: GET_NAVER_LOGIN_URL,
	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/naverLogin')
});

export const setCurPage = (newPage) => ({
	type: SET_CUR_PAGE,
	payload: newPage
});

export const clickNaverLogin = (url) => ({
	type: CLICK_NAVER_LOGIN,
	payload: axios.post(url)
});

export const initialState = {
	userEmail: null,
	curPage: 'cardList',
	isLogin: false,
	naverLoginUrl: null
};

export default handleActions(
	{
		[SET_CUR_PAGE]: (state, action) => ({
			...state,
			curPage: action.payload
		}),
		...pender({
			type: GET_NAVER_LOGIN_URL,
			onSuccess: (state, action) => ({ ...initialState, naverLoginUrl: action.payload.data.url })
		}),
		...pender({
			type: CLICK_NAVER_LOGIN,
			onPending: (state, action) => {
				console.log('z');
			},
			onSuccess: (state, action) => {
				console.log(action);
			}
		})
	},
	initialState
);
