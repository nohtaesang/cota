import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const SEND_CONTENT = 'SEND_CONTENT';
const SEND_IMAGE = 'SEND_IMAGE';
const SET_FILE = 'SET_FILE';

export const sendContent = (title, content, author, hashtags) => ({
	type: SEND_CONTENT,
	payload: axios.post(
		'http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:8080/save',
		{
			title,
			content,
			author,
			hashtags
		}
	)
});

export const sendImage = files => ({
	type: SEND_IMAGE,
	payload: axios.post({
		url:
			'http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:8080/insertImage',
		files: {
			files
		},
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
});

export const setFile = file => ({
	type: SET_FILE,
	payload: file
});

export const initialState = {
	title: 'a',
	content: 'b',
	author: 'c',
	hashtags: ['d', 'e'],
	imageUrl: '',
	file: ''
};

export default handleActions(
	{
		[SET_FILE]: (state, action) => {
			const newFile = action.payload;
			return {
				...state,
				file: newFile
			};
		},
		...pender({
			type: SEND_IMAGE,
			onFailure: () => {
				console.log('z1');
			},
			onPending: () => {
				console.log('z2');
			},
			onSuccess: (state, action) => {
				console.log(action);
				// return {
				// 	...state,
				// 	imageUrl: action.imageUrl
				// };
			}
		})
	},
	initialState
);
