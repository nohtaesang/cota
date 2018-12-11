import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../scss/init.scss';
import '../../../../scss/Write.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({});

class ConnectedWrite extends Component {
	constructor() {
		super();
		this.state = {
			value: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.command = this.command.bind(this);
	}

	handleChange(e) {
		this.setState({
			value: e.target.value,
		});
	}

	command(e) {
		const success = document.execCommand('bold', false, null);
	}

	render() {
		return (
			<div id="write">
				<div id="content-write">
					<div id="tools">
						<h1 className="container-title">Post</h1>
						<div id="options">
							<button type="button" name="bold" onClick={this.command}>
								<FontAwesomeIcon icon="bold" color="#fff" />
							</button>
							<button type="button" name="insertImage" onClick={this.command}>
								<FontAwesomeIcon icon="image" color="#fff" />
							</button>
							<button type="button" name="undo" onClick={this.command}>
								<FontAwesomeIcon icon="undo" color="#fff" />
							</button>
							<button type="button" name="redo" onClick={this.command}>
								<FontAwesomeIcon icon="redo" color="#fff" />
							</button>
						</div>
						<button type="submit" id="cancel">
							<FontAwesomeIcon icon="times" color="#2f3640" />
						</button>
					</div>
					<div id="content">
						<div id="textField" contentEditable="true" />
					</div>
					<div id="submits">
						<div id="hashtags">
							<p className="hashtag">#casual</p>
							<p className="hashtag">#daily</p>
						</div>
						<input type="text" id="input-hashtag" placeholder="해시태그 입력" />
						<button type="submit" id="submit">
							{'Share'}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const Write = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ConnectedWrite);

export default Write;
