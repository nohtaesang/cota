import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as userAction from '../../modules/user';
import './nav.css';
// TODO: imageList에 사용자가 업로드한 이미지를 추가하고, 하단에 이미지를 작게 보여주고, 썸네일을 선택할 수 있게 하기

class ConnectedNav extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const { UserAction } = this.props;
		UserAction.getNaverLoginUrl();
	}

	render() {
		const { isLogin, UserAction, curPage, naverLoginUrl } = this.props;
		console.log(naverLoginUrl);
		return (
			<div id="nav">
				<button id="logo" type="button" name="cardList" onClick={() => UserAction.setCurPage('cardList')}>
					{'COTA'}
				</button>
				{!isLogin ? (
					<div id="beforeLogin">
						<div id="loginForm">
							<input id="id" type="text" />
							<input id="pw" type="password" />
							<button id="loginBtn" type="button">
								<a href={naverLoginUrl}> login</a>
							</button>
						</div>
					</div>
				) : (
					<div id="afterLogin">
						<button type="button" onClick={() => UserAction.setCurPage('write')}>
							{'write'}
						</button>
						<button type="button" onClick={() => UserAction.setCurPage('myPage')}>
							{'my page'}
						</button>

						<button type="button">logout</button>
					</div>
				)}
			</div>
		);
	}
}

export default connect(
	(state) => ({
		isLogin: state.user.isLogin,
		curPage: state.user.curPage,
		naverLoginUrl: state.user.naverLoginUrl
	}),
	(dispatch) => ({
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(ConnectedNav);
