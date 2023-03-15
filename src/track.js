const WIDTH_DELTA = 50;
const RANDOM_DELTA = 0;

function logspace(a, b, len) {
    // https://github.com/compute-io/logspace/blob/master/lib/index.js
    var arr,
        end,
        tmp,
        d;


    // Calculate the increment:
    end = len - 1;
    d = (b - a) / end;

    // Build the output array...
    arr = new Array(len);
    tmp = a;
    arr[0] = Math.pow(10, tmp);
    for (var i = 1; i < end; i++) {
        tmp += d;
        arr[i] = Math.pow(10, tmp);
    }
    arr[end] = Math.pow(10, b);
    return arr;
}

function Track() {
    this.noise_level = 10;
    this.radius = 300;
    this.num_segments = 10;
    this.points = [];
    this.segments = [];
    this.center = createVector(width / 2, height / 2);

    this.generatePoints = function () {
        for (let i = 0; i < this.num_segments; i++) {
            let angle = i * 1.5*PI / this.num_segments;
            let x = width / 2 + this.radius * cos(angle);
            let y = height / 2 + this.radius * sin(angle);
            let offset = map(noise(i), 0, 1, -this.noise_level, this.noise_level);
            x += offset;
            y += offset;
            this.points.push(createVector(x, y));
        }
    }

    this.update = function () {
        // reset arrays
        this.points = [];
        this.segments = [];
        this.generatePoints();

        for (let i = 0; i < this.points.length; i++) {
            
            let curr = p5.Vector.sub(this.points[i], this.center);
            let curr_mag = curr.mag();
            let v1 = p5.Vector.add(this.center, curr.copy().setMag(curr_mag - WIDTH_DELTA));
            let v2 = p5.Vector.add(this.center, curr.copy().setMag(curr_mag + WIDTH_DELTA));

            this.segments.push({
                middle: this.points[i],
                left: v2,
                right: v1
            });
        }

        this.poly = [];
        this.poly.push(this.segments[0].left);
        for (let j = 1; j < this.segments.length; j++) {
            this.poly.push(this.segments[j].left);
        }
        this.poly.push(this.segments[this.num_segments - 1].middle);
        this.poly.push(this.segments[this.num_segments - 1].right);
        for (let j = this.segments.length - 1; j > 0; j--) {
            this.poly.push(this.segments[j].right);
        }
        this.poly.push(this.segments[0].right);
        this.start = this.segments[0];
        this.end = this.segments[this.num_segments - 1];
    }

    this.update();

    this.drawSegmentLine = function (left, middle, right) {
        // stroke(0, 0, 0, 50);
        // strokeWeight(.5);
        line(left.x, left.y, right.x, right.y);
        fill(127, 127, 0)
        ellipse(left.x, left.y, ELLIPSE_SIZE, ELLIPSE_SIZE);
        ellipse(middle.x, middle.y, ELLIPSE_SIZE, ELLIPSE_SIZE);
        ellipse(right.x, right.y, ELLIPSE_SIZE, ELLIPSE_SIZE);
    }

    this.drawConnector = function (a, b, weight = 1) {
        stroke(255, 255, 0);
        strokeWeight(weight);
        line(a.x, a.y, b.x, b.y);
    }

    this.drawStart = function () {
        stroke(0, 255, 0);
        // strokeWeight(.5);
        this.drawSegmentLine(this.start.left, this.start.middle, this.start.right);
    }

    this.drawEnd = function () {
        stroke(255, 0, 0);
        this.drawSegmentLine(this.end.left, this.end.middle, this.end.right);
    }

    this.draw = function () {
        for (let i = 1; i < this.segments.length; i++) {
            this.drawConnector(this.segments[i - 1].left, this.segments[i].left);
            this.drawConnector(this.segments[i - 1].right, this.segments[i].right);
            this.drawConnector(this.segments[i - 1].middle, this.segments[i].middle, 2);
            fill(127, 127, 0)
            ellipse(this.segments[i].middle.x, this.segments[i].middle.y, ELLIPSE_SIZE, ELLIPSE_SIZE);

        }


        beginShape();
        fill(0, 0, 0, 50);
        noStroke();
        for (let j = 0; j < this.poly.length; j++) {
            vertex(this.poly[j].x, this.poly[j].y);
        }
        endShape(CLOSE);
        this.drawStart();
        this.drawEnd();

    }

    this.drawBezier = function(){
        
        noFill();
        stroke(0);
        strokeWeight(2);
        let edges = ['left', 'middle', 'right'];
        for (let i = 0; i < edges.length; i++) {
            if (edges[i] == 'middle') {
                fill(127);
                stroke(255, 255, 0);
            }
            else if (edges[i] == 'left') {
                fill(127);
                stroke(0)
            }
            else if (edges[i] == 'right') {
                fill(220);
                stroke(0)
            }
            beginShape();
            curveVertex(this.segments[this.num_segments-1][edges[i]].x, this.segments[this.num_segments-1][edges[i]].y);
            for (let j = 0; j < this.points.length; j++) {
                curveVertex(this.segments[j][edges[i]].x, this.segments[j][edges[i]].y);
            }
            curveVertex(this.segments[0][edges[i]].x, this.segments[0][edges[i]].y);
            curveVertex(this.segments[1][edges[i]].x, this.segments[1][edges[i]].y);
            endShape();
        }
    }
}