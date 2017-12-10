import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import background from './img/stone-bg.png';
import { injectGlobal } from 'styled-components';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

injectGlobal`
    body{
        user-select: none;
        margin: 0;
        padding: 0;
        height: calc(100vh);
        width: calc(100vw);
        min-width: calc(100vw);
        min-height: calc(100vh);
        overflow: hidden;
        font-family: monospace;
        background-color: rgba(0,0,0,1);
        display: grid;
        image-rendering: pixelated;
        background: 
            radial-gradient(transparent, black),
            url(${background});

        background-size: auto auto, 150px 142px;
    }
`;
