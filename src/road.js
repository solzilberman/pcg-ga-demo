let TX_RANGE = 0;
let TY_RANGE = 100;
let PI = 3.14159265358979;
let THETA_RANGE = PI/8;

function Road(num_segments=50){
    this.num_segments = num_segments;
    this.generateRoad = function(){
        this.roadSegments = [];        
        for (let i = 0; i < this.num_segments ; i++){
            let randomTheta = i%2==0 ? random(0.5*THETA_RANGE, THETA_RANGE) : random(-THETA_RANGE, -0.5*THETA_RANGE);
            let temp_start = i == 0 ? null : this.roadSegments[i-1].end;
            let randomTX = random(-TX_RANGE, TX_RANGE);
            let randomTY = random( TY_RANGE*0.5, TY_RANGE);
            let r = new RoadSegment(temp_start, randomTheta, [randomTX, randomTY]);
            this.roadSegments.push(r);
        }
    }
    this.generateRoad();

    this.draw = function(){
        fill(0,0,0, 50);
        stroke(0,0,0, 50);
        for (let i = 0; i < this.roadSegments.length; i++){
            if (i > 0){
                this.roadSegments[i].updateStart(this.roadSegments[i-1].end);
            }
            this.roadSegments[i].draw();
        }
        this.roadSegments[0].drawStart();
        this.roadSegments[this.roadSegments.length-1].drawEnd();
    }

    this.print = function(){
        for (let i = 0; i < this.roadSegments.length; i++){
            console.log("Road Segment " + i);
            console.log(this.roadSegments[i]);
        }
    }
}