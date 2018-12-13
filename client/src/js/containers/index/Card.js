import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as cardlistAction from '../../modules/cardlist';

class ConnectedCard extends Component {
	constructor() {
		super();
	}

	render() {
		const { CardlistAction } = this.props;
		return (
			<div className="card">
				<img className="thumbnail" alt="" src="" />
				<h1 className="title">title</h1>
				<p className="view-count">viewCount</p>
				<button type="button" className="save-btn">
					{'save'}
				</button>
				<button type="button" className="write-btn">
					{'writer'}
				</button>
				<button type="button" className="follow-btn">
					{'follow'}
				</button>
				<button type="button" className="like-btn">
					{'like'}
				</button>
				<button type="button" className="comment-btn">
					{'comment'}
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
)(ConnectedCard);
