function MakePoster() {
}


function RenderShapes() {

    var image = {
        points: [
            { x:100, y:100 },
            { x:200, y:100 },
            { x:200, y:200 },
            { x:100, y:200 },
        ],
    };
    RenderImage(image);

}

function RenderImage(image) {
    console.log("RenderImage");
    var ctx = BackContextHandle;

    // Set color
    var color = image.c;
    if (color !== undefined) {
        ctx.fillStyle = color;
    } else {
        var R = Math.floor(Math.random() * 256);
        var G = Math.floor(Math.random() * 256);
        var B = Math.floor(Math.random() * 256);
        ctx.fillStyle = "rgb(" + R + "," + G + "," + B + ")";
        ctx.strokeStyle = "rgb(0,0,0)";
    }

    // Set line color
    var line = image.l;
    if (line !== undefined) {
        ctx.fillStyle = line;
    } else {
        ctx.strokeStyle = "rgb(0,0,0)";
    }

    // Set line width
    ctx.lineWidth = 100 / image.d;

    // Draw from point to point
    var points = image.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.lineTo(points[3].x, points[3].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
