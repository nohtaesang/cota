import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Nav from './nav/Nav';
import CardList from './cardList/CardList';
import CardDetail from './cardDetail/CardDetail';
import WriteForm from './writeForm/WriteForm';
import DevTools from './DevTools';
import * as cardListAction from '../modules/cardList';
import './app.css';

// library.add(faBold, faImage, faUndo, faRedo, faTimes);

class App extends React.Component {
	constructor() {
		super();
	}

	onClickCardDetailBackground = () => {
		const { CardListAction, isCardDetailActive } = this.props;
		if (isCardDetailActive) {
			CardListAction.setCardDetail(null);
			CardListAction.setIsCardDetailActive(false);
		}
	};

	render() {
		const { isCardDetailActive, curPage } = this.props;
		return (
			<div id="app">
				<Nav />
				{curPage === 'cardList' ? (
					<div id="section">
						<CardList />
						{isCardDetailActive ? (
							<div id="card-detail-background" onClick={this.onClickCardDetailBackground} />
						) : null}
						{isCardDetailActive ? <CardDetail /> : null}
					</div>
				) : null}
				{curPage === 'write' ? (
					<div id="section">
						<WriteForm />
					</div>
				) : null}
			</div>
		);
	}
}

export default connect(
	(state) => ({
		isCardDetailActive: state.cardList.isCardDetailActive,
		curPage: state.user.curPage
	}),
	(dispatch) => ({
		CardListAction: bindActionCreators(cardListAction, dispatch)
	})
)(App);
