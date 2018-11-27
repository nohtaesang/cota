import React, { Component } from 'react';
import { connect } from 'react-redux';

const ConnectedSearch = () => (
    <div id="filter">
        <form>
            <input placeholder="keyword" />
            <button type="button">search</button>
        </form>
    </div>
);

const Search = connect()(ConnectedSearch);

export default Search;
