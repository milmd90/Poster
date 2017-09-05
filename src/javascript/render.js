var Shapes = [];

function MakePoster() {
    var cellSize = 10;
    var numWide = CanvasWidth / cellSize;
    var numHigh = CanvasHeight / cellSize;

    for (var x = 0; x < numWide; x++) {
        var x1 = cellSize * x;
        var x2 = cellSize * (x+1);
        for (var y = 0; y < numHigh; y++) {
            var y1 = cellSize * y;
            var y2 = cellSize * (y+1);
            Shapes.push({
                points: [
                    { x:x1, y:y1 },
                    { x:x2, y:y1 },
                    { x:x2, y:y2 },
                    { x:x1, y:y2 },
                ],
                fill: {
                    R: 150,
                    G: x,
                    B: y,
                },
                line: {
                    R: 255,
                    G: 255,
                    B: 255,
                },
            });
        }
    }
}

function RenderShapes() {
    $.each(Shapes, function(i, image) {
        image.points = image.points.map(function(point) {
            return {
                x: (point.x - Camera.x) / Camera.z,
                y: (point.y - Camera.y) / Camera.z,
            };
        });
        RenderImage(image);
    });
}

function RenderImage(image) {
    var ctx = BackContextHandle;

    // Set color
    var fill = image.fill;
    if (fill !== undefined) {
        ctx.fillStyle = RGBToString(fill);
    } else {
        var R = Math.floor(Math.random() * 256);
        var G = Math.floor(Math.random() * 256);
        var B = Math.floor(Math.random() * 256);
        ctx.fillStyle = "rgb(" + R + "," + G + "," + B + ")";
    }

    // Set line color
    // var line = image.line;
    // if (line !== undefined) {
    //     ctx.strokeStyle = RGBToString(line);
    // } else {
    //     ctx.strokeStyle = "rgb(255,255,255)";
    // }
    // ctx.lineWidth = 1 / Camera.z;

    // Set line width
    ctx.lineWidth = .00001;

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

function RGBToString(obj) {
    return "rgb(" + obj.R + "," + obj.G + "," + obj.B + ")";
}
