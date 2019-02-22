import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as writeAction from '../../modules/write';
import * as userAction from '../../modules/user';

import '../../../scss/style.css';

class AfterLogin extends Component {
	constructor() {
		super();
	}

	onClickWriteBtn = () => {
		const { UserAction } = this.props;
		UserAction.setCurPage('write');
	};

	render() {
		const { curPage } = this.props;
		return (
			<div id="afterLogin">
				{curPage === 'cardList' ? (
					<button id="writeBtn" className="navBtn" type="button" onClick={this.onClickWriteBtn}>
						{'글쓰기'}
					</button>
				) : null}
				{/* {curPage === 'write' ? null : null} */}

				<button id="logoutBtn" className="navBtn" type="button">
					{'로그아웃'}
				</button>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		userEmail: state.user.userEmail,
		curPage: state.user.curPage
	}),
	(dispatch) => ({
		WriteAction: bindActionCreators(writeAction, dispatch),
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(AfterLogin);
