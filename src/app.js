let {
    scale,
    rotate,
    translate,
    compose,
    applyToPoint
} = window.TransformationMatrix;
let SINGLE_EPOCH_COUNT = 0;
let POPULATION;
let track;

var sliderTheta = INIT_TRACK_THETA;
var sliderThetaMin = 0;
var sliderThetaMax = 2;
var sliderThetaStep = 0.1;

var sliderNumSegments = INIT_NUM_SEGMENTS;
var sliderNumSegmentsMin = 1;
var sliderNumSegmentsMax = 100;
var sliderNumSegmentsStep = 1;

let fitLabel;
let userHasClicked = false;
let button;

var testGui = 0;

function setup() {    
    // randomSeed(870);
    var canvas = createCanvas(screen_width,screen_height);
    canvas.parent('canvasParent');
    // createSliders();
    track = new Track();
    POPULATION = new Population(track);
    var gui = createGui('Controls');
    gui.setPosition(screen_width + 10, 10);
    gui.addGlobals('sliderTheta', 'sliderNumSegments', 'track.noise_level');
}

function draw() {
    background(220);
    track.theta = sliderTheta;
    track.num_segments = sliderNumSegments;
    track.update();
    track.draw();

    if (MODE == "EVOLVE") {
        for (let i = 0; i < POPULATION.population.length; i++) {
            POPULATION.population[i].update();
            POPULATION.population[i].draw();
        }
        SINGLE_EPOCH_COUNT++;
        if (SINGLE_EPOCH_COUNT > SINGLE_EPOCH_DURATION || POPULATION.checkAllCrashed()) {
            SINGLE_EPOCH_COUNT = 0;
            let bf = POPULATION.evaluate();
            fitLabel.html(`Best Fitness: ${bf.max} <br> Average Fitness: ${bf.avg}`);
        }
        console.log(POPULATION.population.length);
    }
}

    
function mousePressed() { userHasClicked = true; }