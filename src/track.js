function Track() {
    this.noise_level = INIT_NOISE_LEVEL;
    this.radius = TRACK_RADIUS;
    this.segment_size = .1;
    this.number_segments = 30;
    this.points = [];
    this.segments = [];
    this.center = createVector(width / 2, height / 2);
    this.theta = INIT_TRACK_THETA;
    this.y_offset = -width/4;
    this.obstacles = [];
    this.num_obstacles = 0;
    this.generatePoints = function () {
        // for (let i = 0; i < this.number_segments; i++) {
        //     let off = map(i, 0, this.number_segments, this.segment_size*width, (1-this.segment_size)*width);
        //     let x = off;
        //     let y = height/2 + map(noise(i), 0, 1, -this.noise_level, this.noise_level);
        //     this.points.push(createVector(x, y+ this.y_offset));
        // }
        for (let i = 0; i < this.number_segments; i++) {
            let angle = i * this.theta*PI / this.number_segments;
            let x = this.y_offset + width / 2 + this.radius * cos(angle);
            let y = height / 2 + this.radius * sin(angle);
            let offset = map(noise(i), 0, 1, -this.noise_level, this.noise_level);
            // x += offset;
            y += offset;
            this.points.push(createVector(x, y));
        }

        // select 3 random points and ensure they are not too close to each other
        let point1 = this.points[this.points.length/3];
        let point2 = this.points[2*this.points.length/3];
        let point3 = this.points[this.points.length-3];
        this.obstacles.push(createVector(point1.x, point1.y));
        this.obstacles.push(createVector(point2.x, point2.y));
        this.obstacles.push(createVector(point3.x, point3.y));
    }

    this.update = function () {
        this.points = [];
        this.segments = [];
        this.obstacles = [];
        this.generatePoints();

        for (let i = 0; i < this.points.length; i++) {
            let new_center = createVector(this.center.x+this.y_offset, this.center.y);
            let curr = p5.Vector.sub(this.points[i], new_center);
            let curr_mag = curr.mag();
            let v1 = p5.Vector.add(new_center, curr.copy().setMag(curr_mag - WIDTH_DELTA));
            let v2 = p5.Vector.add(new_center, curr.copy().setMag(curr_mag + WIDTH_DELTA));
            // let v1 = createVector(this.points[i].x, this.points[i].y+WIDTH_DELTA);
            // let v2 = createVector(this.points[i].x, this.points[i].y-WIDTH_DELTA);

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
        this.poly.push(this.segments[this.segments.length - 1].middle);
        this.poly.push(this.segments[this.segments.length - 1].right);
        for (let j = this.segments.length - 1; j > 0; j--) {
            this.poly.push(this.segments[j].right);
        }
        this.poly.push(this.segments[0].right);
        this.start = this.segments[0];
        this.end = this.segments[this.segments.length - 1];
    }

    this.update();

    this.drawSegmentLine = function (left, middle, right) {
        // stroke(0, 0, 0, 50);
        // strokeWeight(.5);
        line(left.x, left.y, right.x, right.y);
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
        fill(0, 255, 0)
        this.drawSegmentLine(this.start.left, this.start.middle, this.start.right);
    }

    this.drawEnd = function () {
        stroke(255, 0, 0);
        fill(255, 0, 0);
        this.drawSegmentLine(this.end.left, this.end.middle, this.end.right);
    }

    this.draw = function () {
        beginShape();
        fill(127);
        noStroke();
        for (let j = 0; j < this.poly.length; j++) {
            vertex(this.poly[j].x, this.poly[j].y);
        }
        endShape(CLOSE);

        for (let i = 1; i < this.segments.length; i++) {
            this.drawConnector(this.segments[i - 1].left, this.segments[i].left);
            this.drawConnector(this.segments[i - 1].right, this.segments[i].right);
            this.drawConnector(this.segments[i - 1].middle, this.segments[i].middle, 2);
            fill(255, 255, 0)
            ellipse(this.segments[i].middle.x, this.segments[i].middle.y, ELLIPSE_SIZE/2, ELLIPSE_SIZE/2);
        }
        this.drawStart();
        this.drawEnd();
        
        for (let i = 0; i < this.num_obstacles; i++) {
            fill(255, 0, 0);
            ellipse(this.obstacles[i].x, this.obstacles[i].y, OBSTACLE_RADIUS,OBSTACLE_RADIUS);
        }


        // ellipse(this.center.x, this.center.y, ELLIPSE_SIZE, ELLIPSE_SIZE);
        
        fill(255);
        noStroke();
        textSize(32);
        let tc = this.y_offset > 0 ? 'MC' : 'GA'
        text(tc, this.end.middle.x + 20, this.end.middle.y + 10);
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
            curveVertex(this.segments[this.segment_size-1][edges[i]].x, this.segments[this.segment_size-1][edges[i]].y);
            for (let j = 0; j < this.points.length; j++) {
                curveVertex(this.segments[j][edges[i]].x, this.segments[j][edges[i]].y);
            }
            curveVertex(this.segments[0][edges[i]].x, this.segments[0][edges[i]].y);
            curveVertex(this.segments[1][edges[i]].x, this.segments[1][edges[i]].y);
            endShape();
        }
    }

    this.getStartingPositionDirection = function () {
        let start = this.segments[0];
        let next = this.segments[1];
        let dir = p5.Vector.sub(next.middle, start.middle);
        let mid = next.middle.copy().sub(dir.copy().mult(0.5));
        return {
            position: mid,
            direction: dir
        }
    }
}