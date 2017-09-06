const right = "Right";
const left = "Left";
const cellSize = 100;

var Squares = [];
var Arcs = [];
var cursor;
var dir;
var last;

function MakePoster() {
    cursor = {
        x:-1,
        y:1,
    };
    dir = 3;
    last = left;

    MakeBackground();
    // MakeForground(3);
    // MakeForground(3);
    // MakeForground(3);
    MakeForground(3);
}

function MakeForground(level) {
    HalfStem();
    Leaf();
    if (level) {
        MakeForground(level-1);
    } else {
        Leaf();
    }
    Leaf();
    HalfStem();
}

function MakeBackground() {
    var numWide = CanvasWidth / cellSize;
    var numHigh = CanvasHeight / cellSize;

    for (var x = 0; x < numWide; x++) {
        var x1 = cellSize * x;
        var x2 = cellSize * (x+1);
        for (var y = 0; y < numHigh; y++) {
            var y1 = cellSize * y;
            var y2 = cellSize * (y+1);
            Squares.push({
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
    console.log("Rendering Squares");
    $.each(Squares, function(i, image) {
        var newImage = {
            fill: image.fill,
            line: image.line,
        };
        newImage.points = image.points.map(function(point) {
            return {
                x: (point.x - Camera.x) / Camera.z,
                y: (point.y - Camera.y) / Camera.z,
            };
        });
        RenderImage(newImage);
    });

    BackContextHandle.lineWidth = 1;
    BackContextHandle.strokeStyle = "rgb(255,255,255)";

    console.log("Rendering Arcs");
    $.each(Arcs, function(i, arc) {
        var x = (arc.x - Camera.x) / Camera.z + CenterX;
        var y = (arc.y - Camera.y) / Camera.z + CenterY;

        BackContextHandle.beginPath();
        BackContextHandle.arc(x, y, cellSize/2, arc.start, arc.end, true);
        BackContextHandle.stroke();
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




function Leaf() {
    turnRight();
    turnLeft();
    circleRight();
    turnLeft();
    circleRight();
    turnLeft();
    circleRight();
    turnLeft();
    turnRight();
    turnLeft();

}

function HalfStem() {
    turnRight();
    turnLeft();
    circleRight();
    turnLeft();
    turnRight();
    turnLeft();
}

function circleRight() {
    turnRight();
    turnRight();
    turnRight();
    turnRight();
}

function circleLeft() {
    turnLeft();
    turnLeft();
    turnLeft();
    turnLeft();
}

function turnRight() {
    if (last == left) {
        hopRight();
    }
    last = right;

    var next = (dir+1)%4;
    Arcs.push({
        x: cursor.x,
        y: cursor.y,
        start: dir*Math.PI,
        end: next*Math.PI,
    });
    dir = next;
}

function turnLeft() {
    if (last == right) {
        hopLeft();
    }
    last = left;

    var next = (dir+3)%4;
    Arcs.push({
        x: cursor.x,
        y: cursor.y,
        start: dir*Math.PI,
        end: next*Math.PI,
    });
    dir = next;
}

function hopRight() {
    var n = dirToCord(dir+1);
    cursor = {
        x:cursor.x + n.x,
        y:cursor.y + n.y,
    };
}

function hopLeft() {
    var n = dirToCord(dir-1);
    cursor = {
        x:cursor.x + n.x,
        y:cursor.y + n.y,
    };
}

function dirToCord(dir) {
    switch ((dir+4)%4) {
        case 0:
            return {x:1, y:0};
        case 1:
            return {x:0, y:-1};
        case 2:
            return {x:-1, y:0};
        case 3:
            return {x:0, y:1};
        default:
            console.log("dirToCord "+ dir%4);
    }
}

function RGBToString(obj) {
    return "rgb(" + obj.R + "," + obj.G + "," + obj.B + ")";
}
