// 75% of the screen
let screen_width = window.innerWidth * 0.75;
let screen_height = window.innerHeight * 0.90;

// ga
const POPULATION_SIZE = 100;
const SINGLE_EPOCH_DURATION = 200;
const MUTATION_RATE = 0.01;
const MAX_MAG = 3;

// track
const WIDTH_DELTA = Math.min(Math.round(screen_width / 50)*1.5, 50);
const ELLIPSE_SIZE = 2;
const INIT_NOISE_LEVEL = 0.1;
const INIT_NUM_SEGMENTS = 20;
const TRACK_RADIUS = Math.min(0.3 * screen_height, 0.3 * screen_width);
const INIT_TRACK_THETA = 1.5;

// vehicle
const VEHICLE_SIZE = 3;

// sim
let MODE = "design";
