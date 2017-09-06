// Global canvas dimensions
var CanvasWidth;
var CanvasHeight;
var CenterX;
var CenterY;

// Global canvas and graphics handles
var CanvasHandle = null;
var ContextHandle = null;
var BackCanvasHandle = null;
var BackContextHandle = null;

var time = 0;

// Initialize canvas, handlers, and camera
function Init() {
    // Get context handles
    CanvasHandle = document.getElementById("canvas");
    ContextHandle = CanvasHandle.getContext("2d");
    CanvasWidth = ContextHandle.canvas.clientWidth;
    CanvasHeight = ContextHandle.canvas.clientHeight;

    // Create an image backbuffer
    BackCanvasHandle = document.createElement("canvas");
    BackContextHandle = BackCanvasHandle.getContext("2d");
    BackCanvasHandle.width = CanvasWidth;
    BackCanvasHandle.height = CanvasHeight;

    // Set line style
    BackContextHandle.lineCap = "butt";
    BackContextHandle.lineJoin = "round";

    // Get the canvas center
    CenterX = CanvasWidth / 2;
    CenterY = CanvasHeight / 2;
    Camera = {x:0, y:0, z:1};
}

// UpdateRender renders whats in Squares and then updates the canvas
function UpdateRender() {
    // Set background
    BackContextHandle.fillRect(0, 0, CanvasWidth, CanvasHeight);

    // RenderShapes
    BackContextHandle.save();
    RenderShapes();
    BackContextHandle.restore();

    // Swap the backbuffer with the frontbuffer
    var ImageData = BackContextHandle.getImageData(0, 0, CanvasWidth, CanvasHeight);
    ContextHandle.putImageData(ImageData, 0, 0);
}

function ContRender() {
    setTimeout(function() {
        UpdateRender();
        time += 5;
        ContRender();
    }, 10);
}
