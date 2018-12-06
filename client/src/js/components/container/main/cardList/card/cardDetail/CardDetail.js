import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
	cardList: state.cardList
});

// eslint-disable-next-line react/prefer-stateless-function
class ConnectedCardDetail extends Component {
	render() {
		const { props } = this;
		const { cardList } = props;
		const { cards } = cardList;
		const curCard = cards[props.no];
		return (
			<div className="cardDetail">
				<div className="content">{curCard.content}</div>

				<div className="title">{curCard.title}</div>
				<div className="writer">{curCard.writer}</div>
				<button className="followBtn" type="button">
					{'follow'}
				</button>
				<div className="explain">{curCard.explain}</div>
				<div className="like">{`like ${curCard.like}`}</div>
				<div className="comment">{`comment ${curCard.comment}`}</div>
				<div className="view">{`view ${curCard.view}`}</div>
				<button className="saveBtn" type="button">
					{'save'}
				</button>
			</div>
		);
	}
}

const CardDetail = connect(mapStateToProps)(ConnectedCardDetail);

export default CardDetail;
