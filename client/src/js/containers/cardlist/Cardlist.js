import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import * as cardlistAction from '../../modules/cardlist';

class ConnectedWrite extends Component {
	constructor() {
		super();
	}

	render() {
		const { CardlistAction } = this.props;
		return <div id="cardlist" />;
	}
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		CardlistAction: bindActionCreators(cardlistAction, dispatch)
	})
)(ConnectedWrite);
