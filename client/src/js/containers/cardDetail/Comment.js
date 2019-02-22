import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as userAction from '../../modules/user';
import * as writeAction from '../../modules/write';
import * as cardListAction from '../../modules/cardList';
import * as commentAction from '../../modules/comment';
import '../../../scss/style.css';

class Comment extends Component {
	constructor() {
		super();
		this.state = {
			comment: '',
			isLoading: false,
			editNo: null,
			editComment: ''
		};
	}

	componentDidMount() {
		const { CommentAction, cardDetail, numberOfComment } = this.props;
		CommentAction.setNumberOfComment(0);
		CommentAction.getCommentList(cardDetail.pno, 0);
	}

	onChangeComment = (e) => {
		const { name, value } = e.target;
		if (name === 'comment') {
			this.setState({
				comment: value
			});
		} else if (name === 'editComment') {
			this.setState({
				editComment: value
			});
		}
	};

	onClickCommentWrite = async () => {
		const { comment } = this.state;
		const { CommentAction, cardDetail, uno } = this.props;

		if (comment === '') return;
		const ccontent = comment;
		const cpno = cardDetail.pno;
		const cuno = uno;

		await CommentAction.saveComment(ccontent, cpno, cuno);
		await this.setState({
			comment: ''
		});
	};

	onClickEditComment = (e) => {
		const { commentList } = this.props;
		const curComment = commentList[parseInt(e.target.name, 10)];
		const { cno, ccontent } = curComment;

		this.setState({
			editNo: cno,
			editComment: ccontent
		});
	};

	onClickEditDone = async (e) => {
		const { editComment } = this.state;
		const { CommentAction, commentList, cardDetail, uno } = this.props;
		const curComment = commentList[parseInt(e.target.name, 10)];
		const { cno } = curComment;
		const cuno = uno;
		this.setState({
			isLoading: true
		});

		await CommentAction.updateComment(cno, editComment, cardDetail.pno, cuno);

		const commentIndex = commentList.findIndex((a) => a.cno === cno);
		commentList[commentIndex].ccontent = editComment;
		await CommentAction.setCommentList(commentList);

		this.setState({
			editNo: null,
			isLoading: false
		});
	};

	onClickDeleteComment = async (e) => {
		const { CommentAction, commentList } = this.props;
		const cno = parseInt(e.target.name, 10);

		this.setState({ isLoading: true });
		await CommentAction.deleteComment(e.target.name);
		const commentIndex = commentList.findIndex((a) => a.cno === cno);
		commentList.splice(commentIndex, 1);
		await CommentAction.setCommentList(commentList);
		this.setState({ isLoading: false });
	};

	onClickLoadMoreComment = async () => {
		const { CommentAction, numberOfComment, cardDetail } = this.props;
		CommentAction.setNumberOfComment(numberOfComment + 10);
		CommentAction.getMoreCommentList(cardDetail.pno, numberOfComment + 10);
	};

	render() {
		const { comment, editNo, editComment } = this.state;
		const { cardDetail, userEmail, commentList, numberOfComment } = this.props;

		return (
			<div id="comments">
				{commentList ? (
					commentList.map((a, i) => (
						<div className="comment" key={i}>
							<div className="writer-info">
								<div className="name">{a.uname}</div>
								<div className="email">{a.uemail}</div>
								{userEmail === a.uemail ? (
									<div className="ownerOption">
										{editNo === a.cno ? (
											<button
												className="edit-done"
												type="button"
												name={i}
												onClick={this.onClickEditDone}
											>
												{'수정 완료'}
											</button>
										) : (
											<button
												className="edit"
												type="button"
												name={i}
												onClick={this.onClickEditComment}
											>
												{'수정'}
											</button>
										)}

										<button
											className="delete"
											type="button"
											name={a.cno}
											onClick={this.onClickDeleteComment}
										>
											{'삭제'}
										</button>
									</div>
								) : null}
							</div>

							{editNo === a.cno ? (
								<input
									type="text"
									name="editComment"
									onChange={this.onChangeComment}
									value={editComment}
								/>
							) : (
								<div className="content">{a.ccontent}</div>
							)}
						</div>
					))
				) : null}
				{commentList && commentList.length - 10 === numberOfComment ? (
					<button id="load-more-comments" type="button" onClick={this.onClickLoadMoreComment}>
						{'댓글 더 불러오기'}
					</button>
				) : null}
				<div id="commentWriteForm">
					<input type="text" name="comment" onChange={this.onChangeComment} value={comment} />
					<button type="button" onClick={this.onClickCommentWrite}>
						{'작성'}
					</button>
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		cardDetail: state.cardList.cardDetail,
		userEmail: state.user.userEmail,
		commentList: state.comment.commentList,
		numberOfComment: state.comment.numberOfComment,
		uno: state.user.uno
	}),
	(dispatch) => ({
		UserAction: bindActionCreators(userAction, dispatch),
		WriteAction: bindActionCreators(writeAction, dispatch),
		CardListAction: bindActionCreators(cardListAction, dispatch),
		CommentAction: bindActionCreators(commentAction, dispatch)
	})
)(Comment);
