const baseNum = 25;
const cellSize = scale / baseNum;
const lineSize = cellSize / 10;
const numX = baseNum * ratioX;
const numY = baseNum * ratioY;

const lineChance = 1/10;
const arcChance = 1/10;

var Lines = [];
var Arcs = [];

function MakePoster() {

    for (x=1; x < numX; x++) {
        for (y=1; y < numY; y++) {
            var x1 = x * cellSize;
            var y1 = y * cellSize;
            if (Math.random() < lineChance) {
                Lines.push({
                    x1: x1,
                    y1: y1,
                    x2: (x+.5) * cellSize,
                    y2: y1,
                });
            }
            if (Math.random() < lineChance) {
                Lines.push({
                    x1: x1,
                    y1: y1,
                    x2: x1,
                    y2: (y+.5) * cellSize,
                });
            }
            if (Math.random() < lineChance) {
                Lines.push({
                    x1: x1,
                    y1: y1,
                    x2: (x-.5) * cellSize,
                    y2: y1,
                });
            }
            if (Math.random() < lineChance) {
                Lines.push({
                    x1: x1,
                    y1: y1,
                    x2: x1,
                    y2: (y-.5) * cellSize,
                });
            }
        }
    }

    for (x=1; x < numX; x++) {
        for (y=1; y < numY; y++) {
            var x1 = x * cellSize;
            var y1 = y * cellSize;
            if (Math.random() < arcChance) {
                Arcs.push({
                    x: x1,
                    y: y1,
                    s: 0,
                });
            }
            if (Math.random() < arcChance) {
                Arcs.push({
                    x: x1,
                    y: y1,
                    s: 1,
                });
            }
            if (Math.random() < arcChance) {
                Arcs.push({
                    x: x1,
                    y: y1,
                    s: 2,
                });
            }
            if (Math.random() < arcChance) {
                Arcs.push({
                    x: x1,
                    y: y1,
                    s: 3,
                });
            }
        }
    }
}

function Render() {

    BackContextHandle.lineWidth = lineSize / Camera.z;
    BackContextHandle.strokeStyle = "white";

    //Draw background
    BackContextHandle.fillStyle="#eeeeee";
    BackContextHandle.fillRect(-Camera.x,-Camera.y,CanvasWidth / Camera.z, CanvasHeight / Camera.z);

    // Render lines
    $.each(Lines, function(i, line) {
        var x1 = line.x1 / Camera.z - Camera.x;
        var y1 = line.y1 / Camera.z - Camera.y;
        var x2 = line.x2 / Camera.z - Camera.x;
        var y2 = line.y2 / Camera.z - Camera.y;

        BackContextHandle.beginPath();
        BackContextHandle.moveTo(x1, y1);
        BackContextHandle.lineTo(x2, y2);
        BackContextHandle.stroke();
    });

    // Render arcs
    var r = cellSize/2 / Camera.z;
    $.each(Arcs, function(i, arc) {
        var x = arc.x / Camera.z - Camera.x;
        var y = arc.y / Camera.z - Camera.y;
        var s = arc.s * Math.PI / 2;
        var e = (arc.s+1)%4 * Math.PI / 2;

        BackContextHandle.beginPath();
        BackContextHandle.arc(x, y, r, s, e);
        BackContextHandle.stroke();

    });
}
