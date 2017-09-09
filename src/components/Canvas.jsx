import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

class Canvas extends Component {
    render() {
        return (
            <div className="canvas">
                <canvas id="canvas"></canvas>
            </div>
        );
    }
}

export default Canvas;
