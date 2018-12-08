import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const SEND_IMAGE = 'SEND_IMAGE';

export const sendImage = (imageUrl) => ({
	type: SEND_IMAGE,
	payload: axios.post('ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:9000/insert', { imageUrl })
});

export const initialState = {
	title: '',
	content: '',
	hashTags: [],
	imageUrl: ''
};

export default handleActions(
	{
		...pender({
			type: SEND_IMAGE,
			onSuccess: (state, action) => {
				console.log(action);
				return {
					...state,
					imageUrl: action.imageUrl
				};
			}
		})
	},
	initialState
);
