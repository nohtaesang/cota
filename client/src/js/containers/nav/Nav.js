import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as userAction from '../../modules/user';
import * as cardListAction from '../../modules/cardList';
import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';

import './nav.css';

class Nav extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		// 임시 로그인 체크
		const { UserAction } = this.props;

		localStorage.setItem('token', 'nohtaesang'); // 로그인
		// localStorage.clear();

		if (localStorage.getItem('token') !== null) {
			UserAction.setUserEmail('seonghun127@gmail.com');
		}
	}

	onClickLogoBtn = () => {
		const { UserAction, CardListAction } = this.props;
		UserAction.setCurPage('cardList');
		CardListAction.setCardDetail(null);
	};

	render() {
		const { userEmail } = this.props;
		return (
			<div id="nav">
				<button type="button" id="logoBtn" onClick={this.onClickLogoBtn}>
					{'COTA'}
				</button>
				{userEmail === null ? <BeforeLogin /> : <AfterLogin />}
			</div>
		);
	}
}

export default connect(
	(state) => ({
		userEmail: state.user.userEmail
	}),
	(dispatch) => ({
		UserAction: bindActionCreators(userAction, dispatch),
		CardListAction: bindActionCreators(cardListAction, dispatch)
	})
)(Nav);
