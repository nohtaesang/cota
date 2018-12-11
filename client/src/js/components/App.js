import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faBold, faImage, faUndo, faRedo, faTimes
} from '@fortawesome/free-solid-svg-icons';
import Write from './section/write/Write';

library.add(faBold, faImage, faUndo, faRedo, faTimes);

const App = () => (
	<div id="app">
		<Write />
	</div>
);

export default App;
