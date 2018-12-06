import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../scss/init.scss';
import '../../../../scss/Write.scss';

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
                <h1 className="container-title">Post</h1>
                <div id="options">
                    <button type="button" name="bold" onClick={this.command}>
                        {'bold'}
                    </button>

                    <button type="button" name="insertImage" onClick={this.command}>
                        {'insertImage'}
                    </button>
                    <button type="button" name="redo" onClick={this.command}>
                        {'redo'}
                    </button>
                    <button type="button" name="undo" onClick={this.command}>
                        {'undo'}
                    </button>
                </div>
                <div id="content">
                    <div id="textField" contentEditable="true" />
                </div>
                <div id="hashTag">hashTag</div>
                <button type="submit" id="submit">
                    {'confirm'}
                </button>
                <button type="submit" id="cancel">
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
