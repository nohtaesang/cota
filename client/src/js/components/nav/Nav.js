import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navMovePage } from '../../actions/Nav';

const mapDispatchToProps = (dispatch) => ({
	navMovePage: (state) => dispatch(navMovePage(state))
});

const mapStateToProps = (state) => ({
	userInfo: state.userInfo
});

class ConnectedNav extends Component {
	constructor() {
		super();
		this.clickLogo = this.clickLogo.bind(this);
		this.clickJoin = this.clickJoin.bind(this);
		this.clickCollection = this.clickCollection.bind(this);
		this.clickSearch = this.clickSearch.bind(this);
		this.clickLogin = this.clickLogin.bind(this);
		this.clickProfile = this.clickProfile.bind(this);
		this.clickSetting = this.clickSetting.bind(this);
	}

	clickLogo() {
		const { props } = this;
		props.navMovePage('main');
	}

	clickSearch() {
		const { props } = this;
		props.navMovePage('search');
	}

	clickJoin() {
		const { props } = this;
		props.navMovePage('join');
	}

	clickCollection() {
		const { props } = this;
		props.navMovePage('collection');
	}

	clickLogin() {
		const { props } = this;
		props.navMovePage('login');
	}

	clickProfile() {
		const { props } = this;
		props.navMovePage('profile');
	}

	clickSetting() {
		const { props } = this;
		props.navMovePage('setting');
	}

	render() {
		return (
			<div id="nav">
				<button id="logo" type="button" onClick={this.clickLogo}>
					{'logo'}
				</button>
				<button id="search" type="button" onClick={this.clickSearch}>
					{'search'}
				</button>
				<button id="join" type="button" onClick={this.clickJoin}>
					{'join'}
				</button>
				<button id="login" type="button" onClick={this.clickLogin}>
					{'login'}
				</button>
				<button id="collection" type="button" onClick={this.clickProfile}>
					{'collection'}
				</button>
				<button id="profile" type="button" onClick={this.clickProfile}>
					{'profile'}
				</button>
				<button id="setting" type="button" onClick={this.clickSetting}>
					{'setting'}
				</button>
			</div>
		);
	}
}

const Nav = connect(mapStateToProps, mapDispatchToProps)(ConnectedNav);

export default Nav;
