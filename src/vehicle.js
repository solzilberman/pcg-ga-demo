function intersects(v0, v1, v2, v3) {
    let a = v0.x, b = v0.y, c = v1.x, d = v1.y, p = v2.x, q = v2.y, r = v3.x, s = v3.y;
    // https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  };

function Vehicle(track, starting_pos = createVector(width / 2, height / 2), starting_dir = createVector(0, 1)) {
    this.pos = starting_pos.copy();
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.genome = new Genome();
    this.count = 0;
    this.fill = "orange"
    this.track = track;
    this.fitness = 0;
    this.crashed = false;
    this.finished = false;

    this.update = function () {
        if (this.count >= this.genome.genes.length || this.crashed) {
            // console.log("Finished" + this.pos);
            return
        }
        
        let finish_line = this.track.end;
        if (this.checkCrossedFinishLine(finish_line) == true) {
            this.fitness = 9999999;
            this.finished = true;
            this.fill = "green";
            return
        }

        if (this.isInsideTrack(this.track.segments) == false || this.checkObstacleCollision(this.track)) {
            // console.log("Out of track");
            this.fill = "red";
            this.crashed = true;
            return
        }

        this.acc.add(this.genome.genes[this.count]);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(MAX_MAG);
        this.count++;
    }

    this.draw = function () {
        stroke(0, 0, 0);
        strokeWeight(.1);
        fill(this.fill);
        // circle(this.pos.x, this.pos.y, 10);
        // line(this.pos.x, this.pos.y, 0, this.pos.y);
        let front  = createVector(this.pos.x+VEHICLE_SIZE, this.pos.y);
        let b = createVector(this.pos.x-VEHICLE_SIZE, this.pos.y-VEHICLE_SIZE/2);
        let c = createVector(this.pos.x-VEHICLE_SIZE, this.pos.y+VEHICLE_SIZE/2);
        let angle = Math.atan2(this.vel.y, this.vel.x);
        let rot = rotate(angle, this.pos.x, this.pos.y);
        front  = applyToPoint(rot, front);
        b = applyToPoint(rot, b);
        c = applyToPoint(rot, c);
        triangle(front.x, front.y, b.x, b.y, c.x, c.y);
    }

    this.isInsideTrack = function (segments) {
        let v0 = this.pos.copy();
        let v1 = createVector(0,this.pos.y);
        let count = 0;
        for (let i = 1; i < segments.length; i++) {
            count = count + intersects(v0, v1, segments[i].right, segments[i - 1].right);
            count = count + intersects(v0, v1, segments[i].left, segments[i - 1].left);
        }
        count = count + intersects(v0, v1, segments[0].right, segments[0].left);
        return count > 0 && count % 2 == 1;
    }

    this.checkCrossedFinishLine = function (finish_line) {
        
        // console.log(distance);
        return dist(this.pos.x, this.pos.y, finish_line.middle.x, finish_line.middle.y) < VEHICLE_SIZE;
    }



    this.checkObstacleCollision = function (track) {
        if (track.num_obstacles == 0) {
            return false;
        }

        for (let i = 0; i < track.num_obstacles; i++) {
            let obstacle = track.obstacles[i];
            if (dist(this.pos.x, this.pos.y, obstacle.x, obstacle.y) < OBSTACLE_RADIUS) {
                return true;
            }
        }
        return false;
    }

    this.calculateFitness = function () {
        let waypoints = this.track.segments.map(s => s.middle);
        let d = Infinity;
        let d_ind = 0;
        for (let i = 0; i < waypoints.length; i++) {
            let d1 = dist(this.pos.x, this.pos.y, waypoints[i].x, waypoints[i].y);
            if (d1 < d) {
                d = d1;
                d_ind = i;
            }
        }
        this.fitness = map(d_ind, 0, waypoints.length, 0, 1);
        
        // let sum_dist_bw_waypoints = 0;
        // let waypoints = this.track.segments.map(s => s.middle);
        // for (let i = 1; i < waypoints.length; i++) {
        //     sum_dist_bw_waypoints += dist(waypoints[i].x, waypoints[i].y, waypoints[i-1].x, waypoints[i-1].y);
        // }
        // this.fitness = map(dist(this.pos.x,this.pos.y, this.track.end.middle.x, this.track.end.middle.y), 0, sum_dist_bw_waypoints, 1, 0);
        
        if (this.crashed) {
            this.fitness /= 10;
        }
        return this.fitness;
    }
}
