import React, { Component } from 'react';
import { connect } from 'react-redux';
import './write.css';

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
        console.log(e.target.name);
    }

    render() {
        return (
            <div id="write">
                <div id="options">
                    <button type="button" name="bold" onClick={this.command}>
                        {'bold'}
                    </button>
                    <button type="button" name="italic" onClick={this.command}>
                        {'italic'}
                    </button>
                    <input type="number" />
                    <button type="button" name="setFontSize" onClick={this.command}>
                        {'setFontSize'}
                    </button>
                    <button type="button" name="insertHorizontalRule" onClick={this.command}>
                        {'insertHorizontalRule'}
                    </button>
                    <button type="button" name="insertImage" onClick={this.command}>
                        {'insertImage'}
                    </button>
                    <button type="button" name="justifyLeft" onClick={this.command}>
                        {'justifyLeft'}
                    </button>
                    <button type="button" name="justifyCenter" onClick={this.command}>
                        {'justifyCenter'}
                    </button>
                    <button type="button" name="justifyRight" onClick={this.command}>
                        {'justifyRight'}
                    </button>
                    <button type="button" name="justifyFull" onClick={this.command}>
                        {'justifyFull'}
                    </button>
                    <button type="button" name="redo" onClick={this.command}>
                        {'redo'}
                    </button>
                    <button type="button" name="undo" onClick={this.command}>
                        {'undo'}
                    </button>
                    <button type="button" name="removeFormat" onClick={this.command}>
                        {'removeFormat'}
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
