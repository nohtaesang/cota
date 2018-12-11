import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const SAVE_CONTENT = 'SAVE_CONTENT';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

export const saveContent = (title, content, author, hashtags) => ({
	type: SAVE_CONTENT,
	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/save', {
		title,
		content,
		author,
		hashtags
	})
});

export const uploadImage = (formData) => ({
	type: UPLOAD_IMAGE,
	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/insertImage', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
});

export const initialState = {
	title: '',
	content: '',
	author: '',
	hashtags: [],
	imageUrl: ''
};

export default handleActions(
	{
		...pender({
			type: SAVE_CONTENT,
			onSuccess: (state, action) => {}
		}),

		...pender({
			type: UPLOAD_IMAGE,
			onFailure: () => {},
			onPending: () => {},
			onSuccess: (state, action) => {
				console.log(action.payload.data);
				// return {
				// 	...state,
				// 	imageUrl: action.payload.data
				// };
			}
		})
	},
	initialState
);
