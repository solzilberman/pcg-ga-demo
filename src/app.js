let road;
let vehicle;
let sliderTheta;
let labelTheta;
let sliderTX;
let labelTX;
let sliderTY;
let labelTY;
let sliderNumSegments;
let labelNumSegments;

let track;
function setup() {    
    randomSeed(870);
    var canvas = createCanvas(1080,920);
    canvas.parent('canvasParent');
    road = new Road(25);
    vehicle = new Vehicle(createVector(500, 50), 1);
    createSliders();
    track = new Track();
}

function draw() {
    background(220);
    // road.roadSegments[0].theta = sliderTheta.value();
    // road.roadSegments[0].translation = createVector(sliderTX.value(), sliderTY.value());
    tmpNumSeg = sliderNumSegments.value();
    if (track.num_segments != tmpNumSeg) {
        track.num_segments = sliderNumSegments.value();
        track.update();
    }
    labelNumSegments.html('Num Segments: ' + track.num_segments);

    tmpNoiseLevel = sliderNoiseLevel.value();
    if (track.noise_level != tmpNoiseLevel) {
        track.noise_level = sliderNoiseLevel.value();
        track.update();
    }
    labelNoiseLevel.html('Noise Level: ' + track.noise_level);
    // // road.generateRoad();
    // road.draw();

    // labelTheta.html('Theta: ' + (road.roadSegments[0].theta* 180 / PI).toFixed(2));
    // labelTX.html('TX: ' + road.roadSegments[0].translation.x);
    // labelTY.html('TY: ' + road.roadSegments[0].translation.y);
    track.draw();
    // vehicle.findNearestWaypoint(track.segments);
    vehicle.update();
    vehicle.draw();


}


function createSliders() {
    sliderTheta = createSlider(0, PI/2, PI/4,PI/180);
    sliderTheta.position(10, 10);
    sliderTheta.style('width', '120px');
    labelTheta = createDiv('Theta');
    labelTheta.position(150, 5+10);
    labelTheta.style('font-size', '12px');

    sliderTX = createSlider(0, 100, 50);
    sliderTX.position(10, 30);
    sliderTX.style('width', '120px');
    labelTX = createDiv('TX');
    labelTX.position(150, 5+30);
    labelTX.style('font-size', '12px');

    sliderTY = createSlider(0, 100, 50);
    sliderTY.position(10, 50);
    sliderTY.style('width', '120px');
    labelTY = createDiv('TY');
    labelTY.position(150, 5+50);
    labelTY.style('font-size', '12px');

    sliderNumSegments = createSlider(1, 100, 30, 1);
    sliderNumSegments.position(10, 70);
    sliderNumSegments.style('width', '120px');
    labelNumSegments = createDiv('Num Segments');
    labelNumSegments.position(150, 5+70);
    labelNumSegments.style('font-size', '12px');

    // slider for noise level
    sliderNoiseLevel = createSlider(0, 100, 20, 1);
    sliderNoiseLevel.position(10, 90);
    sliderNoiseLevel.style('width', '120px');
    labelNoiseLevel = createDiv('Noise Level');
    labelNoiseLevel.position(150, 5+90);
    labelNoiseLevel.style('font-size', '12px');
}
