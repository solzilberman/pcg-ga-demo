// 75% of the screen
let screen_width = window.innerWidth * 0.75;
let screen_height = window.innerHeight * 0.90;

// ga
var POPULATION_SIZE = 400;
var SINGLE_EPOCH_DURATION = 175;
var MUTATION_RATE = 0.01;
var XOVER_RATE = 0.9;
var MAX_MAG = 5;
var GENOME_MAX_MAG = 2;
var NUM_GENERATIONS = 1000;

// track
var WIDTH_DELTA = Math.min(Math.round(screen_width / 50)*1.5, 50);
var ELLIPSE_SIZE = 2;
var OBSTACLE_RADIUS = 10;
var INIT_NOISE_LEVEL = 0;
var INIT_SEGMENT_SIZE = 0.1;
var TRACK_RADIUS = get_track_radius()//Math.min(0.2 * screen_height, 0.2 * screen_width);
var INIT_TRACK_THETA = 1.5;

// vehicle
var VEHICLE_SIZE = get_vehicle_size();

// sim
var MODE_OPTIONS = ["design", "evolve", "track"];
var MODE = "track";

// GUI
var sliderTheta;
var sliderThetaInit = INIT_TRACK_THETA;
var sliderThetaMin = 0;
var sliderThetaMax = 2;
var sliderThetaStep = 0.1;
var sliderThetaLabel;

var sliderSegmentSize;
var sliderSegmentSizeInit = INIT_SEGMENT_SIZE;
var sliderSegmentSizeMin = 0;
var sliderSegmentSizeMax = 1;
var sliderSegmentSizeStep = .01;
var sliderNumSegmentsLabel;

var sliderNoiseLevel;
var sliderNoiseLevelInit = INIT_NOISE_LEVEL;
var sliderNoiseLevelMin = 0;
var sliderNoiseLevelMax = 100;
var sliderNoiseLevelStep = 1;
var sliderNoiseLevelLabel;

var sliderPopSize;
var sliderPopSizeInit = POPULATION_SIZE;
var sliderPopSizeMin = 1;
var sliderPopSizeMax = 1000;
var sliderPopSizeStep = 10;
var sliderPopSizeLabel;

var sliderEpochDuration;
var sliderEpochDurationInit = SINGLE_EPOCH_DURATION;
var sliderEpochDurationMin = 0;
var sliderEpochDurationMax = 1000;
var sliderEpochDurationStep = 10;
var sliderEpochDurationLabel;

var sliderMutationRate;
var sliderMutationRateInit = MUTATION_RATE;
var sliderMutationRateMin = 0;
var sliderMutationRateMax = 1.0;
var sliderMutationRateStep = 0.01;
var sliderMutationRateLabel;

var sliderXoverRate;
var sliderXoverRateInit = XOVER_RATE;
var sliderXoverRateMin = 0;
var sliderXoverRateMax = 1.0;
var sliderXoverRateStep = 0.01;
var sliderXoverRateLabel;

var sliderNumObstacles;
var sliderNumObstaclesInit = 0;
var sliderNumObstaclesMin = 0;
var sliderNumObstaclesMax = 3;
var sliderNumObstaclesStep = 1;

var fitLabel;
var fitLabelRandom;
let MODE_LABEL;
let MODE_BUTTON;


function get_vehicle_size() {
    if (window.innerWidth > 1500) {
        return 10;
    } else if (window.innerWidth > 1000) {
        return 6;
    } else if (window.innerWidth > 500) {
        return 3;
    }
}

function get_track_radius() {
    if (window.innerWidth > 1500) {
        return 200;
    } else if (window.innerWidth > 1000) {
        return 150;
    } else if (window.innerWidth > 500) {
        return 100;
    } else {
        return 50;
    }
}