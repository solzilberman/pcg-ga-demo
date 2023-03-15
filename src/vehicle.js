function Vehicle(pos, speed) {
    this.pos = pos;
    this.vel = speed;
    this.acc = createVector();
    this.front = createVector(0, 1);
    this.dir = createVector(0, 1);
    this.genome = new Genome();

    this.update = function(){
        // this.pos = applyToPoint(translate(this.speed * this.dir.x, this.speed * this.dir.y), this.pos);
        // this.pos.x %= width;
        // this.pos.y %= height;
        // this.pos = createVector(this.pos.x, this.pos.y);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(5);
    }

    this.getNextPos = function(steps=5){
        return applyToPoint(translate(steps * this.vel * this.dir.x, steps * this.vel * this.dir.y), this.pos);
    }

    this.draw = function(){
        stroke(0,0,0, 50);
        fill(255,0,0);
        this.front  = createVector(this.pos.x+10, this.pos.y);
        let b = createVector(this.pos.x-10, this.pos.y-5);
        let c = createVector(this.pos.x-10, this.pos.y+5);
        let angle = Math.atan2(this.dir.y, this.dir.x);
        let rot = rotate(angle, this.pos.x, this.pos.y);
        this.front  = applyToPoint(rot, this.front);
        b = applyToPoint(rot, b);
        c = applyToPoint(rot, c);
        triangle(this.front.x, this.front.y, b.x, b.y, c.x, c.y);
    }

    this.findNearestWaypoint = function(segments){
        let waypoints = segments.map((s) => createVector(s.middle.x, s.middle.y));
        let nearest = Number.MAX_VALUE;
        let nearestIndex = 0;
        let tip = this.getNextPos();
        tip = createVector(tip.x, tip.y);
        for(let i = 0; i < waypoints.length; i++){
            let dist = p5.Vector.dist(tip, waypoints[i]);
            if(dist < nearest && p5.Vector.dot(this.dir, p5.Vector.sub(waypoints[i], this.pos)) > 0){
                nearest = dist;
                nearestIndex = i;
            }
        }
        // fill(255,0,0);
        // circle(waypoints[nearestIndex].x, waypoints[nearestIndex].y, 10);
        let vec2Nearest = p5.Vector.sub(waypoints[nearestIndex], this.pos);
        vec2Nearest.normalize();
        this.dir = vec2Nearest;
    }
}


function Genome() {
    this.genes = [];

    this.generateGenes = function(){
        for(let i = 0; i < 100; i++){
            this.genes.push(p5.Vector.random2D());
        }
    }

    this.generateGenes();
}