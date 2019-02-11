import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from './Card';
import * as cardListAction from '../../modules/cardList';
import write, * as writeAction from '../../modules/write';
import './cardList.css';

class CardList extends Component {
	constructor() {
		super();
	}

	componentWillMount() {
		const { CardListAction, WriteAction, cardDetail } = this.props;
		CardListAction.getCardList(0);
	}

	onClickLoadMore = () => {
		const { CardListAction, numberOfCard } = this.props;
		CardListAction.setNumberOfCard(numberOfCard + 10);
		CardListAction.getMoreCardList(numberOfCard + 10);
	};

	render() {
		const { cardList, isCardDetailActive, numberOfCard } = this.props;

		return (
			<div id="card-list">
				{cardList.map((card, i) => <Card key={i} info={card} imgIndex={i} />)}
				{cardList.length - 10 === numberOfCard ? (
					<button type="button" id="loadMoreBtn" onClick={this.onClickLoadMore}>
						{'loadMore'}
					</button>
				) : null}
			</div>
		);
	}
}

export default connect(
	(state) => ({
		cardList: state.cardList.cardList,
		isCardDetailActive: state.cardList.isCardDetailActive,
		numberOfCard: state.cardList.numberOfCard,
		cardDetail: state.cardList.cardDetail
	}),
	(dispatch) => ({
		CardListAction: bindActionCreators(cardListAction, dispatch),
		WriteAction: bindActionCreators(writeAction, dispatch)
	})
)(CardList);
