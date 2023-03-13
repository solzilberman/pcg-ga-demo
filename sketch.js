// RoadSegmeng Class: road segment based on polyline formed by affine transfrom start -> end
function RoadSegment(startLine=null, endLine=null, theta=PI/16, translation=[50,50]){
    this.width = 50;
    this.theta = theta;
    this.translation = createVector(translation[0],translation[1]);
    console.log(this.translation);
    this.start = startLine == null ? {
        middle: createVector(500, 50),
        left: createVector(500-this.width, 50),
        right: createVector(500+this.width, 50)
    } : startLine;

    this.end = endLine == null ? {
        middle: this.start.middle.copy().add(this.translation).rotate(this.theta),
        left: this.start.left.copy().add(this.translation).rotate(this.theta),
        right: this.start.right.copy().add(this.translation).rotate(this.theta)
    } : endLine;

    // this.left_points = [this.start.left, this.start.left];
    // this.middle_points= [this.start.middle,this.start.middle];
    // this.right_points = [this.start.right, this.start.right];
    // for (let i = 0.1; i < 1; i += 0.1){
    //     let rotateLerp = this.theta * i;
    //     let interpolated_point_middle = p5.Vector.lerp(this.start.middle, this.end.middle, i).rotate(rotateLerp);
    //     let interpolated_point_left = p5.Vector.lerp(this.start.left, this.end.left, i).rotate(rotateLerp);
    //     let interpolated_point_right = p5.Vector.lerp(this.start.right, this.end.right, i).rotate(rotateLerp);
    //     this.left_points.push(interpolated_point_left);
    //     this.middle_points.push(interpolated_point_middle);
    //     this.right_points.push(interpolated_point_right);
    // }
    // this.end.middle = this.middle_points[this.middle_points.length - 1];
    // this.end.left = this.left_points[this.left_points.length - 1];
    // this.end.right = this.right_points[this.right_points.length - 1];
    // this.middle_points.push(this.end.middle);
    // this.left_points.push(this.end.left);
    // this.right_points.push(this.end.right);
    
    this.draw = function(){
        ellipse(this.start.middle.x, this.start.middle.y, 10, 10);
        ellipse(this.start.left.x, this.start.left.y, 10, 10);
        ellipse(this.start.right.x, this.start.right.y, 10, 10);

        // for (let i = 0; i < this.left_points.length; i++){
        //     ellipse(this.left_points[i].x, this.left_points[i].y, 2, 2);
        //     ellipse(this.middle_points[i].x, this.middle_points[i].y, 2, 2);
        //     ellipse(this.right_points[i].x, this.right_points[i].y, 2, 2);
        // }

        // beginShape();
        // for (let i = 0; i < this.left_points.length; i++){
        //     curveVertex(this.left_points[i].x, this.left_points[i].y);
        // }
        // endShape();

        // beginShape();
        // for (let i = 0; i < this.middle_points.length; i++){
        //     curveVertex(this.middle_points[i].x, this.middle_points[i].y);
        // }
        // endShape();

        // beginShape();
        // for (let i = 0; i < this.right_points.length; i++){
        //     curveVertex(this.right_points[i].x, this.right_points[i].y);
        // }
        // endShape();

        ellipse(this.end.middle.x, this.end.middle.y, 10, 10);
        ellipse(this.end.left.x, this.end.left.y, 10, 10);
        ellipse(this.end.right.x, this.end.right.y, 10, 10);

        line(this.start.left.x, this.start.left.y, this.start.right.x, this.start.right.y);
        line(this.end.left.x, this.end.left.y, this.end.right.x, this.end.right.y);

        console.log(this.end.middle);
        this.midPoint = p5.Vector.lerp(this.start.middle, this.end.middle, 0.5).add(createVector(0, 50));
        console.log(this.midPoint);
        ellipse(this.midPoint.x, this.midPoint.y, 10, 10);

    }

}

let road;
function setup() {    
    createCanvas(1080,920);
    road = new RoadSegment();
    // //  calculate theta of road segment end.right -> road.end.left
    // let diffVec = p5.Vector.sub(road.end.left, road.end.right).normalize().mult(-1);
    // let theta = Math.atan2(diffVec.y, diffVec.x);
    // console.log(theta*180/PI);
    // road2 = new RoadSegment(road.end, null, road.theta, [-50,70]);
    // diffVec = p5.Vector.sub(road2.end.left, road2.end.right).normalize().mult(-1);
    // theta = Math.atan2(diffVec.y, diffVec.x);
    // console.log(theta*180/PI);
}

function draw() {
    background(220);
    noFill();
    stroke(0);
    road.draw();
    // road2.draw();
    noLoop();
}