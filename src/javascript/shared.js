//Global variables
var RenderData = [];

//Lifecycle methods
function Render() {
    // $.each(RenderData, function(layer) {
    //     layer.render()
    // });
    RenderShapes();
}

// Util functions
function dirToCord(dir) {
    switch ((dir+4)%4) {
        case 0:
            return {x:1, y:0};
        case 1:
            return {x:0, y:1};
        case 2:
            return {x:-1, y:0};
        case 3:
            return {x:0, y:-1};
        default:
            console.log("Error: dirToCord "+ dir%4);
    }
}
