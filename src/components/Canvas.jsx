import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Design from './Design'

class Canvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scale: props.scale,
            width: props.width,
            height: props.height
        };
    }

    componentDidMount() {
        this.CanvasHandle = this.refs.canvas;
        this.ContextHandle = this.CanvasHandle.getContext('2d');
        this.BackCanvasHandle = document.createElement("canvas");
        this.BackContextHandle = this.BackCanvasHandle.getContext("2d");

        this.CanvasWidth = this.state.width * this.state.scale;
        this.CanvasHeight = this.state.height * this.state.scale;

        this.CanvasHandle.width = this.CanvasWidth;
        this.CanvasHandle.height = this.CanvasHeight;
        this.BackCanvasHandle.width = this.CanvasWidth;
        this.BackCanvasHandle.height = this.CanvasHeight;
        this.BackContextHandle.lineCap = "butt";
        this.BackContextHandle.lineJoin = "round";
    }

    componentWillUpdate() {
        this.BackContextHandle.fillRect(0, 0, this.CanvasWidth, this.CanvasHeight);
        this.BackContextHandle.save();
    }

    componentDidUpdate() {
        this.BackContextHandle.restore();
        var ImageData = BackContextHandle.getImageData(0, 0, this.CanvasWidth, this.CanvasHeight);
        this.ContextHandle.putImageData(ImageData, 0, 0);
    }

    render() {
        console.log("Canvas render");
        return (
            <div className="canvas">
                <Design
                    ctx={this.BackContextHandle}
                    scale={this.state.scale}
                    cellSize={this.cellSize}
                    CanvasWidth={this.CanvasWidth}
                    CanvasHeight={this.CanvasHeight}
                />
                <canvas ref="canvas" width={this.CanvasWidth} height={this.CanvasHeight}/>
            </div>
        );
    }
}

export default Canvas;
