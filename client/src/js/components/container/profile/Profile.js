import React, { Component } from 'react';
import { connect } from 'react-redux';

// const mapDispatchToProps = dispatch => ({});

const mapStateToProps = (state) => ({
	userInfo: state.userInfo
});

class ConnectedProfile extends Component {
	constructor() {
		super();
		console.log('z');
	}

	render() {
		const { props } = this;
		const { userInfo } = props;
		return (
			<div id="profile">
				<div id="email">{userInfo.email}</div>
				<div id="name">{userInfo.name}</div>
				<div id="sex">{userInfo.sex}</div>
				<div id="birth">{userInfo.birth}</div>
			</div>
		);
	}
}

const Profile = connect(mapStateToProps)(ConnectedProfile);

// mapDispatchToProps,

export default Profile;
