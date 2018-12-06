import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './card/Card';

const mapStateToProps = (state) => ({
	cardList: state.cardList
});

// eslint-disable-next-line react/prefer-stateless-function
class ConnectedCardList extends Component {
	render() {
		const { props } = this;
		const { cardList } = props;
		const { cards } = cardList;
		return <div id="cardList">{cards.map((a, i) => <Card key={a.id} id={a.id} no={i} />)}</div>;
	}
}

const CardList = connect(mapStateToProps)(ConnectedCardList);

export default CardList;
