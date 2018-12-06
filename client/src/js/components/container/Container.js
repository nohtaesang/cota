import React, { Component } from 'react';
import { connect } from 'react-redux';
import Join from './join/Join';
import Login from './login/Login';
import Profile from './profile/Profile';
import Main from './main/Main';

const ConnectedContainer = () => (
	<div id="container">
		<p>join</p>
		<Join />
		<p>login</p>
		<Login />
		{/* <p>setting</p> */}
		{/* <p>write</p> */}
		<p>profile</p>
		<Profile />
		<p>main</p>
		<Main a="1" />
	</div>
);

const Container = connect()(ConnectedContainer);

export default Container;
