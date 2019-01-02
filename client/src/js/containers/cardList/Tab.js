import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as cardListAction from '../../modules/cardList';

// TODO: 버튼을 누르면, 카드리스트의 카테고리가 변경되도록

class ConnectedTab extends Component {
	constructor() {
		super();
	}

	setCategory = (e) => {
		const { CardListAction } = this.props;
		const { name } = e.target;
		cardListAction.getCardList(name, 0);
	};

	render() {
		const { CardListAction, category } = this.props;

		return (
			<div id="tab">
				<button
					type="button"
					id="recent-works"
					className={category === 'recent' ? 'active' : null}
					name="recent"
					onClick={this.setCategory}
				>
					{'recent'}
				</button>
				<button
					type="button"
					id="best-works"
					className={category === 'best-works' ? 'active' : null}
					name="best"
					onClick={this.setCategory}
				>
					{'best'}
				</button>
				<button
					type="button"
					id="follow-works"
					className={category === 'follow' ? 'active' : null}
					name="follow"
					onClick={this.setCategory}
				>
					{'follow'}
				</button>
				<button
					type="button"
					id="save-works"
					className={category === 'save' ? 'active' : null}
					name="save"
					onClick={this.setCategory}
				>
					{'save'}
				</button>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		numberOfCardList: state.cardList.numberOfCardList,
		category: state.cardList.category
	}),
	(dispatch) => ({
		CardListAction: bindActionCreators(cardListAction, dispatch)
	})
)(ConnectedTab);
