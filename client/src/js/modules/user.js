import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const setUserEmail = (userEmail) => ({
	type: SET_USER_EMAIL,
	payload: userEmail
});

const SET_CUR_PAGE = 'SET_CUR_PAGE';
export const setCurPage = (newPage) => ({
	type: SET_CUR_PAGE,
	payload: newPage
});

// const GET_NAVER_LOGIN_URL = 'GET_NAVER_LOGIN_URL';
// const CLICK_NAVER_LOGIN = 'CLICK_NAVER_LOGIN';

// export const getNaverLoginUrl = () => ({
// 	type: GET_NAVER_LOGIN_URL,
// 	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/naverLogin')
// });

// export const clickNaverLogin = (url) => ({
// 	type: CLICK_NAVER_LOGIN,
// 	payload: axios.get(url)
// });

export const initialState = {
	token: null,
	uno: 1,
	userEmail: null,
	userName: null,
	curPage: 'cardList'
	// isLogin: false,
	// naverLoginUrl: null
};

export default handleActions(
	{
		[SET_USER_EMAIL]: (state, action) => ({
			...state,
			userEmail: action.payload
		}),
		[SET_CUR_PAGE]: (state, action) => ({
			...state,
			curPage: action.payload
		})
		// ...pender({
		// 	type: GET_NAVER_LOGIN_URL,
		// 	onSuccess: (state, action) => {
		// 		console.log(action);
		// 		return { ...initialState, naverLoginUrl: action.payload.data.url };
		// 	}
		// }),
		// ...pender({
		// 	type: CLICK_NAVER_LOGIN,
		// 	onFailure: (state, err) => {
		// 		console.log(err);
		// 		return state;
		// 	},
		// 	onPending: (state, action) => {
		// 		console.log(typeof action);
		// 		return state;
		// 	},
		// 	onSuccess: (state, action) => {
		// 		console.log(state);
		// 		return state;
		// 	}
		// })
	},
	initialState
);
