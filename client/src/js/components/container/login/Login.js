import React, { Component } from 'react';
import { connect } from 'react-redux';

const ConnectedLogin = () => (
    <div id="login">
        <form>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button type="button">login</button>
        </form>
    </div>
);

const Login = connect()(ConnectedLogin);

export default Login;
