import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as userAction from '../../modules/user';
import './nav.css';

class BeforeLogin extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div id="beforeLogin">
				<button id="loginBtn" type="button">
					{'로그인'}
				</button>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		userEmail: state.user.userEmail
	}),
	(dispatch) => ({
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(BeforeLogin);
