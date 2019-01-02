import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBold, faImage, faUndo, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
import Nav from './nav/Nav';
import Write from './write/Write';
import DevTools from './DevTools';
import CardList from './cardList/CardList';
import './app.css';

library.add(faBold, faImage, faUndo, faRedo, faTimes);

class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		const { curPage } = this.props;
		return (
			<div id="app">
				<Nav />
				{/* <CardList /> */}
				{curPage === 'cardList' ? <CardList /> : null}
				{curPage === 'myPage' ? null : null}
				{curPage === 'write' ? <Write /> : null}
			</div>
		);
	}
}

export default connect(
	(state) => ({
		curPage: state.user.curPage
	}),
	(dispatch) => ({})
)(App);
