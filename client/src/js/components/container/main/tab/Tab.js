import React, { Component } from 'react';
import { connect } from 'react-redux';
import { containerMovePage } from '../../../../actions/Container';

const mapDispatchToProps = dispatch => ({
    containerMovePage: state => dispatch(containerMovePage(state)),
});

class ConnectedTab extends Component {
    constructor() {
        super();
        this.clickBest = this.clickBest.bind(this);
        this.clickRecent = this.clickRecent.bind(this);
        this.clickFollow = this.clickFollow.bind(this);
        this.clickMy = this.clickMy.bind(this);
        this.clickStorage = this.clickStorage.bind(this);
    }

    clickBest() {
        const { props } = this;
        props.containerMovePage('best');
    }

    clickRecent() {
        const { props } = this;
        props.containerMovePage('recent');
    }

    clickFollow() {
        const { props } = this;
        props.containerMovePage('follow');
    }

    clickMy() {
        const { props } = this;
        props.containerMovePage('follow');
    }

    clickStorage() {
        const { props } = this;
        props.containerMovePage('follow');
    }

    render() {
        return (
            <div className="tab">
                <button type="button" onClick={this.clickBest}>
                    {'best-work'}
                </button>
                <button type="button" onClick={this.clickRecent}>
                    {'recnet-work'}
                </button>
                <button type="button" onClick={this.clickFollow}>
                    {'follow-work'}
                </button>
                <button type="button" onClick={this.clickMy}>
                    {'my-work'}
                </button>
                <button type="button" onClick={this.clickStorage}>
                    {'my-storage'}
                </button>
            </div>
        );
    }
}

const Tab = connect(mapDispatchToProps)(ConnectedTab);

export default Tab;
