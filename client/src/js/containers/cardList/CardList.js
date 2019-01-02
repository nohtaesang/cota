import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Tab from './Tab';
import Card from './Card';
import CardDetail from './CardDetail';
import * as cardListAction from '../../modules/cardList';
import './cardList.css';

class ConnectedCardList extends Component {
	constructor() {
		super();
	}

	componentWillMount() {
		const { CardListAction, numberOfCard } = this.props;
		CardListAction.getCardList('recent', numberOfCard);
		CardListAction.setNumberOfCard(10);
	}

	loadMoreCardList = async () => {
		const { CardListAction, numberOfCard, category } = this.props;

		await CardListAction.getCardList(category, numberOfCard);
		await CardListAction.setNumberOfCard(numberOfCard + 10);
	};

	render() {
		const { CardListAction, cardList, numberOfCard, loading, cardDetail, isCardDetailActive } = this.props;
		const isMoreCards = cardList.length === numberOfCard;
		console.log(cardList.length);
		return (
			<div id="card-list">
				<div id="temp">Hello World</div>
				<Tab />

				<div id="cards">{cardList.length ? cardList.map((info, i) => <Card info={info} key={i} />) : null}</div>
				{isCardDetailActive ? <CardDetail /> : null}
				{loading ? <p>loading...</p> : null}
				{isMoreCards ? (
					<button type="button" onClick={this.loadMoreCardList}>
						{'load more cards'}
					</button>
				) : null}
			</div>
		);
	}
}

export default connect(
	(state) => ({
		category: state.cardList.category,
		cardList: state.cardList.cardList,
		numberOfCard: state.cardList.numberOfCard,
		cardDetail: state.cardList.cardDetail,
		isCardDetailActive: state.cardList.isCardDetailActive,
		loading: state.pender.pending.GET_CARD_LIST
	}),
	(dispatch) => ({
		CardListAction: bindActionCreators(cardListAction, dispatch)
	})
)(ConnectedCardList);
