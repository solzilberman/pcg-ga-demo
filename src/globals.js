// 75% of the screen
let screen_width = window.innerWidth * 0.75;
let screen_height = window.innerHeight * 0.90;

// ga
var POPULATION_SIZE = 500;
var SINGLE_EPOCH_DURATION = 200;
var MUTATION_RATE = 0.01;
var MAX_MAG = 5;
var GENOME_MAX_MAG = 2;

// track
var WIDTH_DELTA = Math.min(Math.round(screen_width / 50)*1.5, 50);
var ELLIPSE_SIZE = 2;
var INIT_NOISE_LEVEL = 10;
var INIT_NUM_SEGMENTS = 20;
var TRACK_RADIUS = Math.min(0.3 * screen_height, 0.3 * screen_width);
var INIT_TRACK_THETA = 1.5;

// vehicle
var VEHICLE_SIZE = 10;

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

var sliderNumSegments;
var sliderNumSegmentsInit = INIT_NUM_SEGMENTS;
var sliderNumSegmentsMin = 1;
var sliderNumSegmentsMax = 25;
var sliderNumSegmentsStep = 1;
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
var sliderMutationRateMax = 0.5;
var sliderMutationRateStep = 0.01;
var sliderMutationRateLabel;

var fitLabel;
var fitLabelRandom;
let MODE_LABEL;
let MODE_BUTTON;