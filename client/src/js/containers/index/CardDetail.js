import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as cardlistAction from '../../modules/cardlist';

class ConnectedCardDetail extends Component {
	constructor() {
		super();
	}

	render() {
		const { CardlistAction } = this.props;
		return (
			<div className="card-detail">
				<img className="thumbnail" alt="" src="" />
				<h1 className="title">title</h1>
				<p className="view-count">viewCount</p>
				<p className="comment-count">commentCount</p>
				<div className="comment-list">
					<div className="comment">comment</div>
				</div>
				<input type="textarea" className="comment-input" />
				<button type="button" className="comment-write-btn">
					{'comment-write-btn'}
				</button>
				<div className="content" />
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
			</div>
		);
	}
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		CardlistAction: bindActionCreators(cardlistAction, dispatch)
	})
)(ConnectedCardDetail);
