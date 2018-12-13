import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Card from './Card';
import CardDetail from './CardDetail';
import * as cardlistAction from '../../modules/cardlist';

class ConnectedCardList extends Component {
	constructor() {
		super();
	}

	render() {
		const { CardlistAction } = this.props;
		return (
			<div id="card-list">
				{/* FIXME: Card */}
				<Card />
				{/* FIXME: CardDetail */}
				<CardDetail />
			</div>
		);
	}
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		CardlistAction: bindActionCreators(cardlistAction, dispatch)
	})
)(ConnectedCardList);
