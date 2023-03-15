
const SINGLE_EPOCH_DURATION = 200;
const POPULATION_SIZE = 500;
let SINGLE_EPOCH_COUNT = 0;
let POPULATION;
let track;

let sliderTheta;
let labelTheta;
let sliderTX;
let labelTX;
let sliderTY;
let labelTY;
let sliderNumSegments;
let labelNumSegments;
let fitLabel;
let userHasClicked = false;

function setup() {    
    // randomSeed(870);
    var canvas = createCanvas(1080,920);
    canvas.parent('canvasParent');
    createSliders();
    track = new Track();
    POPULATION = new Population(track);

}

function draw() {
    background(220);
   
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
    
    track.draw();
    for (let i = 0; i < POPULATION.population.length; i++) {
        POPULATION.population[i].update();
        POPULATION.population[i].draw();
    }
    SINGLE_EPOCH_COUNT++;
    if (SINGLE_EPOCH_COUNT > SINGLE_EPOCH_DURATION || POPULATION.checkAllCrashed()) {
        SINGLE_EPOCH_COUNT = 0;
        let bf = POPULATION.evaluate();
        fitLabel.html('Best Fitness: ' + bf);
    }
    console.log(POPULATION.population.length);


}

    
function mousePressed() { userHasClicked = true; }

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

    sliderNoiseLevel = createSlider(0, 100, 20, 1);
    sliderNoiseLevel.position(10, 90);
    sliderNoiseLevel.style('width', '120px');
    labelNoiseLevel = createDiv('Noise Level');
    labelNoiseLevel.position(150, 5+90);
    labelNoiseLevel.style('font-size', '12px');

    fitLabel = createDiv('Fitness');
    fitLabel.position(10, 120);
    fitLabel.style('font-size', '12px');
    fitLabel.style('font-weight', 'bold');
    fitLabel.style('color', 'red');

}
