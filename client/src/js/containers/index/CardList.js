import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Card from './Card';
import CardDetail from './CardDetail';
import * as cardListAction from '../../modules/cardList';

class ConnectedCardList extends Component {
	constructor() {
		super();
	}

	componentWillMount() {
		const { CardListAction, numberOfCard } = this.props;
		CardListAction.getCardList('recent', numberOfCard);
	}

	render() {
		const { CardListAction, cardList, numberOfCard, loading, cardDetail, isCardDetailActive } = this.props;

		return (
			<div id="card-list">
				{cardList.length ? cardList.map((info, i) => <Card info={info} key={i} />) : null}
				{loading ? <p>loading...</p> : null}
				{isCardDetailActive ? <CardDetail /> : null}
			</div>
		);
	}
}

export default connect(
	(state) => ({
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
