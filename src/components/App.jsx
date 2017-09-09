import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Canvas from './Canvas';
import Image from './Image';

class App extends Component {
    render() {
        return (
            <div>
                <Canvas />
                <Image />
            </div>
        );
    }
}

export default App;
