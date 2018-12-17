import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBold, faImage, faUndo, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
import Write from './write/Write';
import Index from './index/Index';
import DevTools from './DevTools';

library.add(faBold, faImage, faUndo, faRedo, faTimes);

const App = () => (
	<div id="app">
		{/* <Write /> */}
		<Index />
		{/* <DevTools /> */}
	</div>
);

export default App;
