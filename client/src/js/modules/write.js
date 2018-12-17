import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const SAVE_CONTENT = 'SAVE_CONTENT';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

export const saveContent = (title, content, uno, hashtags) => ({
	type: SAVE_CONTENT,
	payload: axios.post('http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001/save', {
		// pTitle: title,
		// pContent: content,
		// pUno: uno,
		// pHashtags: hashtags
		ptitle: '타이틀입니다',
		pcontent: '여기는 콘퉨투 ㅋㅋㅋ ㅋ',
		puno: 1,
		phashtag: '흐시태그',
		pthumbnail: '스엄네일'
	})
});

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
	hashtags: [],
	imageLoadUrl: ''
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
				const routeApi = '/displayFile?fileName=';
				return {
					...state,
					imageLoadUrl: routeApi + action.payload.data
				};
			}
		})
	},
	initialState
);
