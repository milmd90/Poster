import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Design extends Component {

    constructor(props) {
        super(props);
        this.scale = this.props.scale
        this.CanvasWidth = this.props.CanvasWidth
        this.CanvasHeight = this.props.CanvasHeight
        this.cellSize = this.props.cellSize
        this.ctx = this.props.ctx

        this.right = "Right";
        this.left = "Left";
        this.cellSize = this.scale / 16;
        this.squareLine = this.cellSize / 100;
        this.arcLine = this.cellSize / 10;

        this.cursor = {
            x:-1,
            y:-1,
        };
        this.dir = 3;
        this.onThe = this.right;

        this.Squares = [];
        this.Arcs = [];
    }

    render() {
        console.log("Design render");
        var levels = 2;

        this.MakeBackground();
        this.Stem(levels);
        this.Stem(levels);
        this.Stem(levels);
        this.Stem(levels);

        return null;
    }

    Stem(level) {
        if (level) {
            this.HalfStem();
            this.Leaf();
            this.Stem(level-1);
            this.Leaf();
            this.HalfStem();
        } else {
            this.Leaf();
        }
    }

    MakeBackground() {
        var numWide = this.CanvasWidth / this.cellSize;
        var numHigh = this.CanvasHeight / this.cellSize;

        for (var x = 0; x < numWide; x++) {
            var x1 = this.cellSize * x;
            var x2 = this.cellSize * (x+1);
            for (var y = 0; y < numHigh; y++) {
                var y1 = this.cellSize * y;
                var y2 = this.cellSize * (y+1);
                this.Squares.push({
                    points: [
                        { x:x1, y:y1 },
                        { x:x2, y:y1 },
                        { x:x2, y:y2 },
                        { x:x1, y:y2 },
                    ],
                });
            }
        }
    }

    RenderShapes() {
        this.ctx.lineWidth = this.squareLine / this.cameraZ;
        var min = {R:133, G:197, B:144};
        var max = {R:200, G:200, B:200};
        var rand = 10;

        $.each(this.Squares, function(i, image) {
            var p =image.points[0];
            var h = (this.CanvasHeight - p.y) / this.CanvasHeight;
            var fill = {
                R:Math.floor(max.R * h - min.R * (h - 1)) - Math.floor(Math.random() * h * rand),
                G:Math.floor(max.G * h - min.G * (h - 1)) - Math.floor(Math.random() * h * rand),
                B:Math.floor(max.B * h - min.B * (h - 1)) - Math.floor(Math.random() * h * rand),
            };
            var newImage = {
                fill: fill
            };
            newImage.points = image.points.map(function(point) {
                return {
                    x: point.x / this.cameraZ - this.cameraX,
                    y: point.y / this.cameraZ - this.cameraY,
                };
            });
            this.RenderImage(newImage);
        });

        // Render design

        var len = this.Arcs.length;
        var cStep = 256 / this.Arcs.length;
        var pi2 = 2 * Math.PI;
        var min = {R:180, G:180, B:180};
        var max = {R:255, G:255, B:255};
        var centerX = this.CenterX;
        var centerY = this.CenterY;

        $.each(this.Arcs, function(i, arc) {

            var x = (arc.x * this.cellSize + centerX) / this.cameraZ - this.cameraX;
            var y = (arc.y * this.cellSize + centerY) / this.cameraZ - this.cameraY;
            var r = cellSize/2 / this.cameraZ;

            // White outline
            this.ctx.lineWidth = 3*arcLine / this.cameraZ;
            this.ctx.strokeStyle = "white";

            this.ctx.beginPath();
            this.ctx.arc(x, y, r, arc.start, arc.end);
            this.ctx.stroke();

            // Color arc
            this.ctx.lineWidth = arcLine / this.cameraZ;
            var fill = {
                R:Math.floor(((max.R - min.R)/2) * (Math.cos(pi2 * ((2*i+time)/len + 1/4)) + 1) + min.R),
                G:Math.floor(((max.G - min.G)/2) * (Math.cos(pi2 * ((i+time)/len + 0/4)) + 1) + min.G),
                B:Math.floor(((max.B - min.B)/2) * (Math.cos(pi2 * ((i+time)/len + 2/4)) + 1) + min.B),
            };
            this.ctx.strokeStyle = this.RGBToString(fill);

            this.ctx.beginPath();
            this.ctx.arc(x, y, r, arc.start, arc.end);
            this.ctx.stroke();

        });
    }

    RenderImage(image) {
        // Set color
        var fill = image.fill;
        if (fill !== undefined) {
            this.ctx.fillStyle = this.RGBToString(fill);
        } else {
            this.ctx.fillStyle = "white";
        }

        // Set line color
        var line = image.line;
        if (line !== undefined) {
            this.ctx.strokeStyle = this.RGBToString(line);
        } else {
            this.ctx.strokeStyle = "white";
        }

        // Draw from point to point
        var points = image.points;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        this.ctx.lineTo(points[1].x, points[1].y);
        this.ctx.lineTo(points[2].x, points[2].y);
        this.ctx.lineTo(points[3].x, points[3].y);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    RGBToString(obj) {
        return "rgb(" + obj.R + "," + obj.G + "," + obj.B + ")";
    }




    Leaf() {
        this.turnRight();
        this.turnLeft();
        this.circleRight();
        this.turnLeft();
        this.circleRight();
        this.turnLeft();
        this.circleRight();
        this.turnLeft();
        this.turnRight();
        this.turnLeft();
    }

    HalfStem() {
        this.turnRight();
        this.turnLeft();
        this.circleRight();
        this.turnLeft();
        this.turnRight();
        this.turnLeft();
    }

    circleRight() {
        this.turnRight();
        this.turnRight();
        this.turnRight();
        this.turnRight();
    }

    circleLeft() {
        this.turnLeft();
        this.turnLeft();
        this.turnLeft();
        this.turnLeft();
    }

    turnRight() {
        if (this.onThe == this.right) {
            this.hopRight();
        }

        this.Arcs.push({
            x: this.cursor.x,
            y: this.cursor.y,
            start: .5*(this.dir-1)*Math.PI,
            end: .5*this.dir*Math.PI,
        });
        this.dir = (this.dir+1)%4;
    }

    turnLeft() {
        if (this.onThe == this.left) {
            this.hopLeft();
        }

        this.Arcs.push({
            x: this.cursor.x,
            y: this.cursor.y,
            start: .5*this.dir*Math.PI,
            end: .5*(this.dir+1)*Math.PI,
        });
        this.dir = (this.dir+3)%4;
    }

    hopRight() {
        var n = this.dirToCord(this.dir+1);
        this.cursor = {
            x:this.cursor.x + n.x,
            y:this.cursor.y + n.y,
        };
        this.onThe = this.left;
    }

    hopLeft() {
        var n = this.dirToCord(this.dir-1);
        this.cursor = {
            x:this.cursor.x + n.x,
            y:this.cursor.y + n.y,
        };
        this.onThe = this.right;
    }

    dirToCord(dir) {
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
}

export default Design;
