import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Comment from './Comment';
import * as userAction from '../../modules/user';
import * as writeAction from '../../modules/write';
import * as cardListAction from '../../modules/cardList';

import '../../../scss/style.css';

class CardDetail extends Component {
	constructor() {
		super();
		this.state = {
			isAskRealDelete: false
		};
	}

	componentDidMount() {}

	onClickEdit = async () => {
		const { UserAction, WriteAction, CardListAction } = this.props;
		UserAction.setCurPage('write');
		CardListAction.setIsCardDetailActive(false);
	};

	askRealDelete = () => {
		this.setState({ isAskRealDelete: true });
	};

	onClickDeleteCard = async () => {
		const { CardListAction, cardDetail } = this.props;
		await CardListAction.deleteCard(cardDetail.pno);
		window.location.href = 'http://localhost:3000';
	};

	onClickCancel = () => {
		this.setState({ isAskRealDelete: false });
	};

	render() {
		const { isAskRealDelete } = this.state;
		const { cardDetail, userEmail, commentList, numberOfComment } = this.props;
		return cardDetail ? (
			<div id="card-detail">
				<div id="info">
					<div id="title">{cardDetail.ptitle}</div>
					<div id="write-info">
						<div id="date">
							{`${new Date(cardDetail.modifiedDate).getFullYear()}.${new Date(
								cardDetail.modifiedDate
							).getMonth() + 1}.${new Date(cardDetail.modifiedDate).getDate()}`}
						</div>
						<div id="name">{`${cardDetail.uname}`}</div>
						<div id="email">{cardDetail.uemail}</div>
						{cardDetail.uemail === userEmail ? (
							<div id="owner">
								<button id="edit" type="button" onClick={this.onClickEdit}>
									{'수정'}
								</button>
								<button id="delete" type="button" onClick={this.askRealDelete}>
									{'삭제'}
								</button>
							</div>
						) : null}
					</div>

					{isAskRealDelete ? (
						<div id="isAskRealDelete" onClick={this.onClickCancel}>
							<div id="panel">
								<div id="question">정말 삭제 하시겠습니까?</div>
								<div id="buttons">
									<button type="button" id="delete" onClick={this.onClickDeleteCard}>
										{'삭제'}
									</button>
									<button type="button" id="cancel" onClick={this.onClickCancel}>
										{'취소'}
									</button>
								</div>
							</div>
						</div>
					) : null}
				</div>
				<div id="content" contentEditable="true" dangerouslySetInnerHTML={{ __html: cardDetail.pcontent }} />
				<Comment />
			</div>
		) : null;
	}
}

export default connect(
	(state) => ({
		cardDetail: state.cardList.cardDetail,
		userEmail: state.user.userEmail,
		commentList: state.cardList.commentList,
		numberOfComment: state.cardList.numberOfComment
	}),
	(dispatch) => ({
		UserAction: bindActionCreators(userAction, dispatch),
		WriteAction: bindActionCreators(writeAction, dispatch),
		CardListAction: bindActionCreators(cardListAction, dispatch)
	})
)(CardDetail);
