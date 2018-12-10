import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as writeAction from '../../modules/write';

class ConnectedWrite extends Component {
	constructor() {
		super();

		this.textFieldRef = React.createRef();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.file !== nextProps.file && nextProps.file !== '') {
			this.fileUpload();
		}
	}

	sendImage = async e => {
		const { WriteAction } = this.props;
		// const file = e.target.files[0];
		// const reader = new FileReader();
		// reader.onloadend = () => {
		// 	WriteAction.sendImage(file);
		// };

		// reader.readAsDataURL(file);

		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			WriteAction.setFile(file);
		};
		reader.readAsDataURL(file);
	};

	fileUpload = async => {
		const { WriteAction } = this.props;
		const formData = new FormData();
		formData.append('file', this.props.file);
		WriteAction.sendImage(formData);
		console.log(formData);
		WriteAction.setFile('');
	};

	insertImage = async () => {
		const { imageUrl } = this.props;
		try {
			await this.textFieldRef.current.focus();
			await document.execCommand('insertImage', false, imageUrl);
		} catch (e) {
			console.log('err!');
		}
	};

	render() {
		const {
			WriteAction, title, content, author, hashtags
		} = this.props;
		return (
			<div id="write">
				<div id="options">
					<button type="button" name="bold">
						{'bold'}
					</button>
					<input type="file" name="insertImage" onChange={this.sendImage} />
					<button type="button" name="redo">
						{'redo'}
					</button>
					<button type="button" name="undo">
						{'undo'}
					</button>
				</div>
				<div id="content">
					<div
						id="textField"
						contentEditable="true"
						onInput={this.handleInput}
						ref={this.textFieldRef}
					/>
				</div>
				<div id="hashTag">
					<div>hashtag</div>
					<input id="inputHashTag" />
					<button type="submit" name="insertHashTag" id="insertHashTag">
						{'추가'}
					</button>
				</div>
				<button
					type="submit"
					name="confirm"
					id="confirm"
					onClick={() => {
						WriteAction.sendContent(title, content, author, hashtags);
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
	state => ({
		imageUrl: state.write.imageUrl,
		file: state.write.file,
		title: state.write.title,
		content: state.write.content,
		author: state.write.author,
		hashtags: state.write.hashtags
	}),
	dispatch => ({
		WriteAction: bindActionCreators(writeAction, dispatch)
	})
)(ConnectedWrite);
