import React from 'react';
import {render} from 'react-dom';
import Container from './Container/Container.jsx';
require('./main.css');

// renders Container componenet to index.html
render(<Container/>, document.getElementById('app'));
