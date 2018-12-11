import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import * as writeAction from '../../modules/write';

class ConnectedWrite extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			content: '',
			hashtag: '',
			hashtags: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.textFieldRef = React.createRef();
		this.addHashtag = this.addHashtag.bind(this);
	}

	handleChange = (e) => {
		const { id, value } = e.target;
		switch (id) {
			case 'title':
				this.setState({ title: value });
				break;
			case 'textField':
				this.setState({ content: this.textFieldRef.current.innerHTML });
				break;
			case 'hashtag':
				this.setState({ hashtag: value });
				break;
			default:
				break;
		}
	};

	loadImage = async (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			this.uploadImage(file);
			// this.textFieldRef.current.focus();
			// console.log(reader);
			// document.execCommand('insertImage', false, reader.result);
		};
		reader.readAsDataURL(file);
	};

	uploadImage = async (file) => {
		const { WriteAction } = this.props;
		const formData = new FormData();
		formData.append('files', file);
		try {
			await WriteAction.uploadImage(formData);
			await this.insertImage();
		} catch (e) {
			console.log('err!');
		}
	};

	// 구현중
	insertImage = async () => {
		const { WriteAction, imageUrl } = this.props;
		const url = 'http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001';
		const file = url + imageUrl;
		WriteAction.getImage(file);

		console.log(file);

		try {
			await this.textFieldRef.current.focus();
			await document.execCommand('insertImage', false, url + imageUrl);
		} catch (e) {
			console.log('err!');
		}
	};

	// 띄어쓰기, 엔터, 버튼 클릭을 했을 때 해쉬태그 추가
	addHashtag = () => {
		const { hashtags, hashtag } = this.state;
		if (hashtag === null || hashtag === undefined || hashtag === '') {
			return;
		}

		this.setState({
			hashtags: hashtags.concat(hashtag),
			hashtag: ''
		});
	};

	render() {
		const { WriteAction } = this.props;
		const { title, content, hashtag, hashtags } = this.state;
		return (
			<div id="write">
				<div id="options">
					<button type="button" name="bold">
						{'bold'}
					</button>
					<input type="file" name="insertImage" onChange={this.loadImage} />
					<button type="button" name="redo">
						{'redo'}
					</button>
					<button type="button" name="undo">
						{'undo'}
					</button>
				</div>
				<input id="title" value={title} onChange={this.handleChange} />
				<div id="content">
					<div
						name="content"
						id="textField"
						contentEditable="true"
						onInput={this.handleChange}
						ref={this.textFieldRef}
					/>
				</div>
				<div id="hashTag">
					<div>hashtag</div>
					{hashtags ? hashtags.map((a, i) => <div key={a + i}>{a}</div>) : null}
					<input id="hashtag" value={hashtag} onChange={this.handleChange} />
					<button type="submit" name="insertHashTag" id="insertHashTag" onClick={this.addHashtag}>
						{'추가'}
					</button>
				</div>
				<button
					type="submit"
					name="confirm"
					id="confirm"
					onClick={() => {
						WriteAction.saveContent(title, content, '노태상', hashtags);
					}}
				>
					{'confirm'}
				</button>
				<button type="submit" name="cancel" id="cancel">
					{'cancel'}
				</button>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		imageUrl: state.write.imageUrl,
		file: state.write.file,
		title: state.write.title,
		content: state.write.content,
		author: state.write.author,
		hashtags: state.write.hashtags
	}),
	(dispatch) => ({
		WriteAction: bindActionCreators(writeAction, dispatch)
	})
)(ConnectedWrite);
