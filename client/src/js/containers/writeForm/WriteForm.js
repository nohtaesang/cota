import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import './writeForm.css';
import * as writeAction from '../../modules/write';
import * as userAction from '../../modules/user';
import * as cardListAction from '../../modules/cardList';
import boldIcon from './icon/bold-text-option.png';
import insertImageIcon from './icon/picture.png';
import redoIcon from './icon/reply.png';
import undoIcon from './icon/share-option.png';
import alignJustify from './icon/align-justify.png';
import alignCenter from './icon/center-text-alignment.png';
import alignLeft from './icon/align-to-left.png';
import alignRight from './icon/align-to-right.png';

class ConnectedWrite extends Component {
	constructor() {
		super();
		this.state = {
			contentTitle: '',
			content: '',
			imageList: [],
			thumbnailIndex: 0
		};
		this.handleChange = this.handleChange.bind(this);
		this.textFieldRef = React.createRef();
		this.fileInputRef = React.createRef();
	}

	componentWillMount() {
		const { cardDetail } = this.props;
		if (cardDetail !== null) {
			this.setCardDetailInfo();
		}
	}

	setCardDetailInfo = () => {
		const { cardDetail } = this.props;
		const { ptitle, pcontent, pthumbnail } = cardDetail;
		this.setState({
			contentTitle: ptitle,
			content: pcontent,
			imageList: [ pthumbnail ]
		});
	};

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
			case 'contentTitle':
				this.setState({ contentTitle: value });
				break;
			case 'textField':
				this.setState({ content: this.textFieldRef.current.innerHTML });
				break;
			case 'thumbnail':
				// this.setState({ thumbnail: value });
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
		const { imageList } = this.state;
		const { WriteAction, imageLoadUrl } = this.props;
		const url = 'http://ec2-52-78-219-93.ap-northeast-2.compute.amazonaws.com:3001';
		const file = url + imageLoadUrl;
		try {
			await this.textFieldRef.current.focus();
			await document.execCommand('insertImage', false, url + imageLoadUrl);
			this.setState({
				imageList: imageList.concat(url + imageLoadUrl)
			});
		} catch (e) {
			console.log('err!');
		}
	};

	// thumbnail을 선택한다.
	selectThumbnail = (thumbnailIndex) => {
		this.setState({ thumbnailIndex });
	};

	saveContent = async () => {
		const { contentTitle, content, imageList, thumbnailIndex } = this.state;
		const { WriteAction, CardListAction, UserAction, uno } = this.props;
		if (contentTitle === '' || content === '' || imageList.length === 0) return;
		// TODO: 1을 uno로 바꾸기

		let info = null;
		await WriteAction.saveContent(contentTitle, content, 1, imageList[thumbnailIndex]).then((res) => {
			info = res.data[0];
		});
		await UserAction.setCurPage('cardList');
		await CardListAction.setCardDetail(info);
		await CardListAction.setIsCardDetailActive(true);
	};

	editContent = async () => {
		const { contentTitle, content, imageList, thumbnailIndex } = this.state;
		const { WriteAction, CardListAction, UserAction, uno, cardDetail } = this.props;
		if (contentTitle === '' || content === '' || imageList.length === 0) return;

		let info = null;

		// TODO: 1을 uno로 바꾸기
		await WriteAction.editContent(
			contentTitle,
			content,
			1,
			cardDetail.pno,
			imageList[thumbnailIndex]
		).then((res) => {
			info = res.data[0];
		});
		await UserAction.setCurPage('cardList');
		await CardListAction.setCardDetail(info);
		await CardListAction.setIsCardDetailActive(true);
	};

	onClickCancel = () => {
		const { CardListAction, UserAction } = this.props;
		UserAction.setCurPage('cardList');
		CardListAction.setCardDetail(null);
	};

	render() {
		const { WriteAction, cardDetail } = this.props;
		const { contentTitle, content, imageList, thumbnailIndex } = this.state;
		return cardDetail === null ? (
			<div id="write-form">
				<div id="title">Post</div>
				<input id="contentTitle" value={contentTitle} onChange={this.handleChange} />
				<div id="content-form">
					<div id="options">
						<button type="button">
							<img alt="" src={boldIcon} onClick={() => this.optionCommand('bold')} />
						</button>
						<button type="button">
							<img alt="" src={insertImageIcon} onClick={() => this.optionCommand('insertImage')} />
							<input type="file" id="insertImage" ref={this.fileInputRef} onChange={this.loadImage} />
						</button>
						<button type="button">
							<img alt="" src={redoIcon} onClick={() => this.optionCommand('undo')} />
						</button>
						<button type="button">
							<img alt="" src={undoIcon} onClick={() => this.optionCommand('redo')} />
						</button>
						<button type="button">
							<img alt="" src={alignCenter} onClick={() => this.optionCommand('justifyCenter')} />
						</button>
						<button type="button">
							<img alt="" src={alignJustify} onClick={() => this.optionCommand('justifyFull')} />
						</button>
						<button type="button">
							<img alt="" src={alignLeft} onClick={() => this.optionCommand('justifyLeft')} />
						</button>
						<button type="button">
							<img alt="" src={alignRight} onClick={() => this.optionCommand('justifyRight')} />
						</button>
					</div>
					<div
						name="content"
						id="textField"
						contentEditable="true"
						onInput={this.handleChange}
						ref={this.textFieldRef}
					/>
				</div>
				<div id="title">썸네일 선택</div>
				<div id="image-list">
					{imageList ? (
						imageList.map((a, i) => (
							<img
								className={thumbnailIndex === i ? 'image selected' : 'image'}
								alt=""
								key={i}
								src={a}
								onClick={() => this.selectThumbnail(i)}
							/>
						))
					) : null}
				</div>
				<div id="submits">
					<button type="submit" name="confirm" id="submit" onClick={this.saveContent}>
						{'작성'}
					</button>
					<button type="submit" name="cancel" id="cancel" onClick={this.onClickCancel}>
						{'취소'}
					</button>
				</div>
			</div>
		) : (
			<div id="write-form">
				<div id="title">Edit</div>
				<input id="contentTitle" value={contentTitle} onChange={this.handleChange} />
				<div id="content-form">
					<div id="options">
						<button type="button">
							<img alt="" src={boldIcon} onClick={() => this.optionCommand('bold')} />
						</button>
						<button type="button">
							<img alt="" src={insertImageIcon} onClick={() => this.optionCommand('insertImage')} />
							<input type="file" id="insertImage" ref={this.fileInputRef} onChange={this.loadImage} />
						</button>
						<button type="button">
							<img alt="" src={redoIcon} onClick={() => this.optionCommand('undo')} />
						</button>
						<button type="button">
							<img alt="" src={undoIcon} onClick={() => this.optionCommand('redo')} />
						</button>
						<button type="button">
							<img alt="" src={alignCenter} onClick={() => this.optionCommand('justifyCenter')} />
						</button>
						<button type="button">
							<img alt="" src={alignJustify} onClick={() => this.optionCommand('justifyFull')} />
						</button>
						<button type="button">
							<img alt="" src={alignLeft} onClick={() => this.optionCommand('justifyLeft')} />
						</button>
						<button type="button">
							<img alt="" src={alignRight} onClick={() => this.optionCommand('justifyRight')} />
						</button>
					</div>
					<div
						name="content"
						id="textField"
						contentEditable="true"
						onInput={this.handleChange}
						ref={this.textFieldRef}
						dangerouslySetInnerHTML={{ __html: cardDetail.pcontent }}
					/>
				</div>
				<div id="title">썸네일 선택</div>
				<div id="image-list">
					{imageList ? (
						imageList.map((a, i) => (
							<img
								className={thumbnailIndex === i ? 'image selected' : 'image'}
								alt=""
								key={i}
								src={a}
								onClick={() => this.selectThumbnail(i)}
							/>
						))
					) : null}
				</div>
				<div id="submits">
					<button type="submit" name="confirm" id="submit" onClick={this.editContent}>
						{'수정'}
					</button>
					<button type="submit" name="cancel" id="cancel" onClick={this.onClickCancel}>
						{'취소'}
					</button>
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		imageLoadUrl: state.write.imageLoadUrl,
		state: state.user.uno,
		cardDetail: state.cardList.cardDetail,
		uno: state.user.uno
	}),
	(dispatch) => ({
		WriteAction: bindActionCreators(writeAction, dispatch),
		UserAction: bindActionCreators(userAction, dispatch),
		CardListAction: bindActionCreators(cardListAction, dispatch)
	})
)(ConnectedWrite);
