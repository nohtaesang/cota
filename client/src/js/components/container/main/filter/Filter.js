import React, { Component } from 'react';
import { connect } from 'react-redux';

const ConnectedFilter = () => (
	<div id="filter">
		<form>
			<input placeholder="sex" />
			<input placeholder="orderby" />
		</form>
	</div>
);

const Filter = connect()(ConnectedFilter);

export default Filter;
