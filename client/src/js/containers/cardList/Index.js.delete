import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Tab from './Tab';
import CardList from './CardList';
import * as cardlistAction from '../../modules/cardList';

// TODO: 1. TAB
// 2. cardlist

class ConnectedIndex extends Component {
	constructor() {
		super();
	}

	render() {
		const { CardlistAction } = this.props;
		return (
			<div id="index-container">
				<Tab />
				<CardList />
			</div>
		);
	}
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		CardlistAction: bindActionCreators(cardlistAction, dispatch)
	})
)(ConnectedIndex);
