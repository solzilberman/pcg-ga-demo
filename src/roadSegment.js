let {
    scale,
    rotate,
    translate,
    compose,
    applyToPoint
} = window.TransformationMatrix;
let ROAD_WIDTH = 50;
let ELLIPSE_SIZE = ROAD_WIDTH / 10;
// RoadSegmeng Class: road segment based on polyline formed by affine transfrom start -> end
function RoadSegment(startLine = null, theta = PI / 4, translation = [10, 50]) {
    this.width = ROAD_WIDTH;
    this.theta = theta;
    this.translation = createVector(translation[0], translation[1]);
    this.start = startLine == null ? {
        middle: createVector(500, 50),
        left: createVector(500 - this.width, 50),
        right: createVector(500 + this.width, 50)
    } : startLine;

    let end_mat = compose(
        rotate(this.theta, this.start.middle.x, this.start.middle.y),
        translate(this.translation.x, this.translation.y),
    );
    this.end = {
        middle: applyToPoint(end_mat, this.start.middle),
        left: applyToPoint(end_mat, this.start.left),
        right: applyToPoint(end_mat, this.start.right)
    };

    this.numSegments = 5;
    this.segments = [];
    this.poly = [];

    this.generateSegments = function() {
        this.segments = [this.start];
        for (let i = 1; i < this.numSegments + 1; i++) {
            let s = i * 0.1;
            let temp_theta = this.theta * s;
            let temp_translation = translate(this.translation.x * s, this.translation.y * s);
            let temp_matrix = compose(
                rotate(temp_theta, this.start.middle.x, this.start.middle.y),
                temp_translation,
            );
            let temp_start = {
                middle: applyToPoint(temp_matrix, this.start.middle),
                left: applyToPoint(temp_matrix, this.start.left),
                right: applyToPoint(temp_matrix, this.start.right)
            }
            // console length of temp_start
            this.segments.push(temp_start);
            if (i == this.numSegments) {
                this.end = temp_start;
            }
        }

        this.poly = [];
        this.poly.push(this.segments[0].left);
        for (let j = 1; j < this.segments.length; j++) {
            this.poly.push(this.segments[j].left);
        }
        this.poly.push(this.end.middle);
        this.poly.push(this.end.right);
        for (let j = this.segments.length - 1; j > 0; j--) {
            this.poly.push(this.segments[j].right);
        }
        this.poly.push(this.start.right);
    }

    this.generateSegments();

    this.drawSegmentLine = function(left, middle, right) {
        stroke(0, 0, 0, 50);
        strokeWeight(.5);
        line(left.x, left.y, right.x, right.y);
        fill(127,127, 0)
        ellipse(left.x, left.y, ELLIPSE_SIZE, ELLIPSE_SIZE);
        ellipse(middle.x, middle.y, ELLIPSE_SIZE, ELLIPSE_SIZE);
        ellipse(right.x, right.y, ELLIPSE_SIZE, ELLIPSE_SIZE);
    }

    this.drawConnector = function(a, b, weight=1) {
        stroke(255, 255, 0);        
        strokeWeight(weight);
        line(a.x, a.y, b.x, b.y);
    }

    this.updateStart = function(startLine) {
        this.start = startLine;
        this.generateSegments();
    }

    this.drawStart = function() {
        this.drawSegmentLine(this.start.left, this.start.middle, this.start.right);
    }

    this.drawEnd = function() {
        this.drawSegmentLine(this.end.left, this.end.middle, this.end.right);
    }

    this.draw = function() {
        this.generateSegments();
        for (let i = 1; i < this.numSegments + 1; i++) {
            this.drawConnector(this.segments[i - 1].left, this.segments[i].left);
            this.drawConnector(this.segments[i - 1].right, this.segments[i].right);
            this.drawConnector(this.segments[i - 1].middle, this.segments[i].middle, 2);
        }
        beginShape();
        fill(0, 0, 0, 50);
        noStroke();
        for (let j = 0; j < this.poly.length; j++) {
            vertex(this.poly[j].x, this.poly[j].y);
        }
        endShape(CLOSE);

        this.drawSegmentLine(this.start.left, this.start.middle, this.start.right);
        
    }
}