import React, { Component } from 'react';
import { connect } from 'react-redux';

const ConnectedJoin = () => (
    <div id="join">
        <form>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="nickname" />
            <input type="date" placeholder="birth" />
            <input type="checkbox" />
            <input type="checkbox" />
            <button type="button">join</button>
        </form>
    </div>
);

const Join = connect()(ConnectedJoin);

export default Join;
