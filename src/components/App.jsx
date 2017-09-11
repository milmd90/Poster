import React, { Component } from 'react';

import Canvas from './Canvas';
import Image from './Image';

class App extends Component {
    render() {
        console.log("App render");
        return (
            <div>
                <Canvas
                    scale="3200"
                    width="3"
                    height="2"
                    cameraX="0"
                    cameraY="0"
                    cameraZ="1"
                    time="0"
                />
                <Image />
            </div>
        );
    }
}

export default App;
