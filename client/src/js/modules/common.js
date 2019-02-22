import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const SET_CUR_PAGE = 'SET_CUR_PAGE';
const CLICK_NAVER_LOGIN = 'CLICK_NAVER_LOGIN';
export const setCurPage = (newPage) => ({
	type: SET_CUR_PAGE,
	payload: newPage
});

export const clickNaverLogin = () => ({
	type: CLICK_NAVER_LOGIN,
	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/naverLogin')
});

export const initialState = {
	curPage: 'myPage',
	isLogin: false
};

export default handleActions(
	{
		[SET_CUR_PAGE]: (state, action) => ({
			...state,
			curPage: action.payload
		}),
		...pender({
			type: CLICK_NAVER_LOGIN,
			onSuccess: (state, action) => {}
		})
	},
	initialState
);
