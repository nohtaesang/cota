import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
// import '../../../scss/init.scss';
// import '../../../scss/Write.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as writeAction from '../../modules/write';

// TODO: imageList에 사용자가 업로드한 이미지를 추가하고, 하단에 이미지를 작게 보여주고, 썸네일을 선택할 수 있게 하기

class ConnectedWrite extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			content: '',
			hashtag: '',
			hashtags: [],
			imageList: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.textFieldRef = React.createRef();
		this.fileInputRef = React.createRef();
		this.addHashtag = this.addHashtag.bind(this);
	}

	eventOccur = (evEle, evType) => {
		if (evEle.fireEvent) {
			evEle.fireEvent(evType);
		} else {
			const mouseEvent = document.createEvent('MouseEvents');
			/* API문서 initEvent(type,bubbles,cancelable) */
			mouseEvent.initEvent(evType, true, false);
			const transCheck = evEle.dispatchEvent(mouseEvent);
			if (!transCheck) {
				console.log('클릭 이벤트 발생 실패!');
			}
		}
	};

	check = () => {
		this.eventOccur(this.fileInputRef.current, 'click');
	};

	optionCommand = (command) => {
		document.execCommand(command);
	};

	handleChange = (e) => {
		const { id, value } = e.target;
		switch (id) {
			case 'title':
				this.setState({ title: value });
				break;
			case 'textField':
				this.setState({ content: this.textFieldRef.current.innerHTML });
				break;
			case 'input-hashtag':
				this.setState({ hashtag: value });
				break;
			default:
				break;
		}
	};

	// 1. 사용자가 이미지를 로컬에서 불러온다.
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

	// 2. 사용자가 불러온 이미지를 서버에 업로드 한다.
	uploadImage = async (file) => {
		const { WriteAction } = this.props;
		const formData = new FormData();
		formData.append('file', file);
		try {
			await WriteAction.uploadImage(formData);
			await this.insertImage();
		} catch (e) {
			console.log('err!');
		}
	};

	// 3. 서버에 올라간 이미지를 요청하여 받아와 사용자의 content에 삽입한다.
	insertImage = async () => {
		const { WriteAction, imageLoadUrl } = this.props;
		const url = 'http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001';
		const file = url + imageLoadUrl;

		try {
			await this.textFieldRef.current.focus();
			await document.execCommand('insertImage', false, url + imageLoadUrl);
			// FIXME: 이미지를 imageList에 추가해야함
			// await this.setState
		} catch (e) {
			console.log('err!');
		}
	};

	// 띄어쓰기, 엔터, 버튼 클릭을 했을 때 해쉬태그 추가 해줘야함
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
				<div id="content-write">
					<div id="tools">
						<h1 className="container-title">Post</h1>
						<div id="options">
							<button type="button" name="bold" onClick={() => this.optionCommand('bold')}>
								<FontAwesomeIcon icon="bold" color="#fff" />
							</button>
							<input type="file" id="insertImage" ref={this.fileInputRef} onChange={this.loadImage} />
							<button type="button" name="insertImage" onClick={this.check}>
								<FontAwesomeIcon icon="image" color="#fff" />
							</button>
							<button type="button" name="undo" onClick={() => this.optionCommand('undo')}>
								<FontAwesomeIcon icon="undo" color="#fff" />
							</button>
							<button type="button" name="redo" onClick={() => this.optionCommand('redo')}>
								<FontAwesomeIcon icon="redo" color="#fff" />
							</button>
						</div>
						<button type="submit" name="cancel" id="cancel">
							<FontAwesomeIcon icon="times" color="#2f3640" />
						</button>
					</div>
					<div id="content">
						<input id="title" value={title} onChange={this.handleChange} />
						<div
							name="content"
							id="textField"
							contentEditable="true"
							onInput={this.handleChange}
							ref={this.textFieldRef}
						/>
					</div>
					<div id="submits">
						<div id="hashtags">
							{hashtags ? (
								hashtags.map((a, i) => (
									<p className="hashtag" key={a + i}>
										{a}
									</p>
								))
							) : null}
						</div>
						<input id="input-hashtag" placeholder="해시 태그 입력" value={hashtag} onChange={this.handleChange} />
						<button
							type="submit"
							name="confirm"
							id="submit"
							onClick={() => {
								WriteAction.saveContent(title, content, '노태상', hashtags);
							}}
						>
							{'Share'}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		imageLoadUrl: state.write.imageLoadUrl,
		file: state.write.file,
		title: state.write.title,
		content: state.write.content,
		uno: state.write.uno,
		hashtags: state.write.hashtags
	}),
	(dispatch) => ({
		WriteAction: bindActionCreators(writeAction, dispatch)
	})
)(ConnectedWrite);
