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
        this.myRef = React.createRef();
        this.command = this.command.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
        });
    }

    command() {
        const success = document.execCommand('bold', false, null);
    }

    render() {
        return (
            <div id="write">
                <div id="options">
                    <button type="button" onClick={this.command}>
                        {'bold'}
                    </button>
                </div>
                <div id="content">
                    <div id="textField" contentEditable="true" ref={this.myRef} />
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
