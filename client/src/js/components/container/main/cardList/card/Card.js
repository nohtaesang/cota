import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardDetail from './cardDetail/CardDetail';

const mapStateToProps = (state) => ({
	cardList: state.cardList
});

// eslint-disable-next-line react/prefer-stateless-function
class ConnectedCard extends Component {
	render() {
		const { props } = this;
		const { cardList } = props;
		const { cards } = cardList;
		const curCard = cards[props.no];
		return (
			<div className="card">
				<div className="thumbnail">{curCard.thumbnail}</div>
				<div className="title">{curCard.title}</div>
				<div className="writer">{curCard.writer}</div>
				<button className="followBtn" type="button">
					{'follow'}
				</button>
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

const Card = connect(mapStateToProps)(ConnectedCard);

export default Card;
