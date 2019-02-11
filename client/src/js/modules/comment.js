import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const SET_NUMBER_OF_COMMENT = 'SET_NUMBER_OF_COMMENT';
export const setNumberOfComment = (numberOfComment) => ({
	type: SET_NUMBER_OF_COMMENT,
	payload: numberOfComment
});

const SAVE_COMMENT = 'SAVE_COMMENT';
export const saveComment = (ccontent, cpno, cuno) => ({
	type: SAVE_COMMENT,
	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/comments', {
		ccontent,
		cpno,
		cuno
	})
});

const GET_COMMENT_LIST = 'GET_COMMENT_LIST';
export const getCommentList = (pno, numberOfComment) => ({
	type: GET_COMMENT_LIST,
	payload: axios.get(
		`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/comments/${pno}/${numberOfComment}`
	)
});

const GET_MORE_COMMENT_LIST = 'GET_MORE_COMMENT_LIST';
export const getMoreCommentList = (pno, numberOfComment) => ({
	type: GET_MORE_COMMENT_LIST,
	payload: axios.get(
		`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/comments/${pno}/${numberOfComment}`
	)
});

const SET_COMMENT_LIST = 'SET_COMMENT_LIST';
export const setCommentList = (commentList) => ({
	type: SET_COMMENT_LIST,
	payload: commentList
});

const DELETE_COMMENT = 'DELETE_COMMENT';
export const deleteComment = (no) => ({
	type: DELETE_COMMENT,
	payload: axios.delete(`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/comments/${no}`)
});

const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const updateComment = (cno, ccontent, cpno, cuno) => ({
	type: UPDATE_COMMENT,
	payload: axios.put(`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/comments/${cno}`, {
		ccontent,
		cpno,
		cuno
	})
});

const GET_LOAD_MORE_COMMENT = 'GET_LOAD_MORE_COMMENT';
export const getLoadMoreComment = (pno, numberOfComment) => ({
	type: GET_LOAD_MORE_COMMENT,
	payload: axios.get(`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/comments/${pno}`)
});

export const initialState = {
	commentList: null,
	numberOfComment: 0
};

export default handleActions(
	{
		[SET_NUMBER_OF_COMMENT]: (state, action) => ({
			...state,
			numberOfComment: action.payload
		}),
		...pender({
			type: GET_COMMENT_LIST,
			onSuccess: (state, action) => ({
				...state,
				commentList: action.payload.data
			})
		}),
		...pender({
			type: GET_MORE_COMMENT_LIST,
			onSuccess: (state, action) => ({
				...state,
				commentList: state.commentList.concat(action.payload.data)
			})
		}),
		...pender({
			type: SAVE_COMMENT,
			onSuccess: (state, action) => ({
				...state,
				commentList: state.commentList.concat(action.payload.data)
			})
		}),
		...pender({
			type: UPDATE_COMMENT,
			onSuccess: (state, action) => ({
				...state
			})
		}),
		...pender({
			type: DELETE_COMMENT,
			onSuccess: (state, action) => ({
				...state
			})
		}),
		...pender({
			type: GET_LOAD_MORE_COMMENT,
			onSuccess: (state, action) => ({
				...state,
				commentList: state.commentList.concat(action.payload.data)
			})
		})
	},
	initialState
);
