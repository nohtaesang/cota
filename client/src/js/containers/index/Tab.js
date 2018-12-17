import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as cardlistAction from '../../modules/cardList';

// TODO: 버튼을 누르면, 카드리스트의 카테고리가 변경되도록

class ConnectedTab extends Component {
	constructor() {
		super();
	}

	render() {
		const { CardlistAction } = this.props;
		return (
			<div id="tab">
				<button type="button" id="best-works">
					{'best'}
				</button>
				<button type="button" id="recent-works">
					{'recent'}
				</button>
				<button type="button" id="follow-works">
					{'follow'}
				</button>
				<button type="button" id="save-works">
					{'save'}
				</button>
			</div>
		);
	}
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		CardlistAction: bindActionCreators(cardlistAction, dispatch)
	})
)(ConnectedTab);
