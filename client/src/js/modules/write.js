import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const RESET_WRITE_INFO = 'RESET_WRITE_INFO';
export const resetWriteInfo = () => ({
	type: RESET_WRITE_INFO
});

const SAVE_CONTENT = 'SAVE_CONTENT';
export const saveContent = (title, content, uno, thumbnail) => ({
	type: SAVE_CONTENT,
	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/posts', {
		ptitle: title,
		pcontent: content,
		puno: uno,
		pthumbnail: thumbnail
	})
});

const EDIT_CONTENT = 'EDIT_CONTENT';
export const editContent = (title, content, uno, pno, thumbnail) => ({
	type: EDIT_CONTENT,
	payload: axios.put(`http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/posts/${pno}`, {
		ptitle: title,
		pcontent: content,
		pthumbnail: thumbnail,
		puno: uno
	})
});

const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const uploadImage = (formData) => ({
	type: UPLOAD_IMAGE,
	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
});

export const initialState = {
	title: '',
	content: '',
	uno: '',
	imageLoadUrl: '',
	isEdit: false
};

export default handleActions(
	{
		[RESET_WRITE_INFO]: (state, action) => ({
			...state,
			title: '',
			content: '',
			uno: '',
			imageLoadUrl: '',
			isEdit: false
		}),
		...pender({
			type: SAVE_CONTENT,
			onSuccess: (state, action) => {}
		}),
		...pender({
			type: UPLOAD_IMAGE,
			onSuccess: (state, action) => {
				const routeApi = '/displayFile?fileName=';
				return {
					...state,
					imageLoadUrl: routeApi + action.payload.data
				};
			}
		}),
		...pender({
			type: EDIT_CONTENT,
			onSuccess: (state, action) => {}
		})
	},
	initialState
);
