import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from './tab/Tab';
import Filter from './filter/Filter';
import Search from './search/Search';
import CardList from './cardList/CardList';

const ConnectedMain = () => (
	<div id="main">
		<Tab />
		<Search />
		<Filter />
		<CardList />
	</div>
);

const Main = connect()(ConnectedMain);

export default Main;
