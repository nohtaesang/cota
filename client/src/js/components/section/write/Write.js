import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({});

class ConnectedWrite extends Component {
    constructor() {
        super();
        this.state = {
            html: '', // 이거랑
            file: '',
            fileLocalUrl: '',
            loaded: '',
            hashTag: '',
            hashTags: [], // 이거랑 보내면 됨
        };
        this.textFieldRef = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.optionCommand = this.optionCommand.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.imageUpload = this.imageUpload.bind(this);
    }

    imageUpload(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file,
                fileLocalUrl: reader.result,
            });
            this.textFieldRef.current.focus();
            document.execCommand('insertImage', false, this.state.fileLocalUrl);
        };

        reader.readAsDataURL(file);
    }

    handleInput(e) {
        this.setState({
            html: e.target.innerHTML,
        });
    }

    handleChange(e) {
        this.setState({
            hashTag: e.target.value,
        });
    }

    handleClick(e) {
        const { name } = e.target;
        const { hashTag, hashTags } = this.state;

        switch (name) {
        case 'confirm':
            break;
        case 'cancel':
            break;
        case 'insertHashTag':
            if (hashTags.indexOf(hashTag) !== -1) {
                this.setState({
                    hashTag: '',
                });
            } else {
                this.setState({
                    hashTags: hashTags.concat([hashTag]),
                    hashTag: '',
                });
            }
            break;
        default:
            break;
        }
    }

    optionCommand(e) {
        const { name } = e.target;

        switch (name) {
        case 'bold':
            document.execCommand('bold', false, null);
            break;
        case 'redo':
            document.execCommand('redo', false, null);
            break;
        case 'undo':
            document.execCommand('undo', false, null);
            break;

        default:
            break;
        }
    }

    render() {
        return (
            <div id="write">
                <div id="options">
                    <button type="button" name="bold" onClick={this.optionCommand}>
                        {'bold'}
                    </button>
                    <input type="file" name="insertImage" onChange={this.imageUpload} />
                    <button type="button" name="redo" onClick={this.optionCommand}>
                        {'redo'}
                    </button>
                    <button type="button" name="undo" onClick={this.optionCommand}>
                        {'undo'}
                    </button>
                </div>
                <div id="content">
                    <div
                        id="textField"
                        contentEditable="true"
                        onInput={this.handleInput}
                        ref={this.textFieldRef}
                    />
                </div>
                <div id="hashTag">
                    <div>hashtag</div>
                    {this.state.hashTags.length
                        ? this.state.hashTags.map((hashTag, i) => (
                            <div className="hashTag" key={hashTag}>
                                {hashTag}
                            </div>
                        ))
                        : null}
                    <input
                        id="inputHashTag"
                        value={this.state.hashTag}
                        onChange={this.handleChange}
                    />
                    <button
                        type="submit"
                        name="insertHashTag"
                        id="insertHashTag"
                        onClick={this.handleClick}
                    >
                        {'추가'}
                    </button>
                </div>
                <button type="submit" name="confirm" id="confirm" onClick={this.handleClick}>
                    {'confirm'}
                </button>
                <button type="submit" name="cancel" id="cancel">
                    {'cancel'}
                </button>
            </div>
        );
    }
}

const Write = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedWrite);

export default Write;
