import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as cardListAction from '../../modules/cardList';

class ConnectedCard extends Component {
	constructor() {
		super();
	}
	// 	createdDate: "2018-12-17T06:54:24"
	// modifiedDate: "2018-12-17T06:54:24"
	// pcommentCnt: 0
	// pcontent: "2"
	// phashtag: "hashtags"
	// plikeCnt: 0
	// pno: 2
	// pthumbnail: "hello.jpeg"
	// ptitle: "1"
	// puno: 1
	// pviewCnt: 0

	onClickCard = async () => {
		const { CardListAction, info } = this.props;
		const { pno } = info;
		await CardListAction.loadCardDetail(pno);
		await CardListAction.setIsCardDetailActive(true);
		// console.log(CardListAction);
	};

	render() {
		const { CardListAction, info } = this.props;
		const { ptitle, pcontent, pthumbnail, puno, pcommentCnt, pviewCnt, plikeCnt, pno } = info;

		return (
			<div className="card" onClick={this.onClickCard}>
				<img className="thumbnail" alt="" src={pthumbnail} />
				<h1 className="title">{`제목: ${ptitle}`}</h1>
				<p className="view-cnt">{`조회수: ${pviewCnt}`}</p>
				<p type="button" className="save">
					{'저장하기'}
				</p>
				<p type="button" className="write">
					{`작성자: ${puno}`}
				</p>
				<p type="button" className="follow">
					{'팔로우 하기'}
				</p>
				<p type="button" className="like-cnt">
					{`좋아요 ${plikeCnt}`}
				</p>
				<p type="button" className="comment-cnt">
					{`댓글수: ${pcommentCnt}`}
				</p>
			</div>
		);
	}
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		CardListAction: bindActionCreators(cardListAction, dispatch)
	})
)(ConnectedCard);
