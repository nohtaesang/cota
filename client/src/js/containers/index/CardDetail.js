import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as cardlistAction from '../../modules/cardList';

class ConnectedCardDetail extends Component {
	constructor() {
		super();
	}

	// createdDate: '2018-12-17T06:55:53';
	// modifiedDate: '2018-12-17T06:55:53';
	// pcommentCnt: 0;
	// pcontent: '2';
	// phashtag: 'hashtags';
	// plikeCnt: 0;
	// pno: 3;
	// pthumbnail: 'hello.jpeg';
	// ptitle: '1';
	// puno: 1;
	// pviewCnt: 0;

	render() {
		const { CardlistAction, cardDetail } = this.props;
		const { ptitle, pcontent, pcommentCnt, phashtag, plikeCnt, pno, puno, pviewCnt } = cardDetail;
		return (
			<div className="card-detail">
				<button
					type="button"
					onClick={() => CardlistAction.setIsCardDetailActive(false)}
					id="close-card-detail-btn"
				>
					{'close-card-detail-btn'}
				</button>
				<h1 className="title">{ptitle}</h1>
				<p className="view-cnt">{pcontent}</p>
				<p className="comment-cnt">{`comment${pcommentCnt}`}</p>
				<div className="comment-list">
					<div className="comment">commentList</div>
				</div>
				<input type="textarea" className="comment-input" />
				<button type="button" className="comment-write-btn">
					{'comment-write-btn'}
				</button>
				<div className="content" />
				<button type="button" className="save-btn">
					{'save'}
				</button>
				<button type="button" className="write-btn">
					{pno}
				</button>
				<button type="button" className="follow-btn">
					{'follow'}
				</button>
				<button type="button" className="like-btn">
					{`like${plikeCnt}`}
				</button>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		cardDetail: state.cardList.cardDetail
	}),
	(dispatch) => ({
		CardlistAction: bindActionCreators(cardlistAction, dispatch)
	})
)(ConnectedCardDetail);
