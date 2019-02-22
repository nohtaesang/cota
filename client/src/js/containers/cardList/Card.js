import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as cardListAction from '../../modules/cardList';
import '../../../scss/style.css';

class Card extends Component {
	constructor() {
		super();
	}

	onClickCard = async (pno) => {
		const { CardListAction, isCardDetailActive, info } = this.props;
		if (!isCardDetailActive) {
			await CardListAction.setIsCardDetailActive(true);
			await CardListAction.setCardDetail(info);
		}
	};

	render() {
		const { info, isCardDetailActive } = this.props;
		const { ptitle, modifiedDate, pthumbnail, pno, uname, uemail } = info;
		const curDate = new Date(modifiedDate);
		return (
			<div className="card" onClick={() => this.onClickCard(pno)}>
				<img className="thumbnail" alt="" src={pthumbnail} />
				<div className="title">{ptitle}</div>
				<div className="writer-and-date">
					<div className="writer">{uname}</div>
					<div className="date">
						{`${curDate.getFullYear()}.${curDate.getMonth() + 1}.${curDate.getDate()}`}
					</div>
				</div>

				{/* <div className="comment">{pcommentCnt}</div> */}

				{/* <div className="date">{`${curDate.getFullYear()}.${curDate.getMonth()}.${curDate.getDate()}`}</div> */}
				{/* <div className=""></div> */}
			</div>
		);
	}
}

export default connect(
	(state) => ({
		isCardDetailActive: state.cardList.isCardDetailActive
	}),
	(dispatch) => ({
		CardListAction: bindActionCreators(cardListAction, dispatch)
	})
)(Card);
