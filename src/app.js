let {
    scale,
    rotate,
    translate,
    compose,
    applyToPoint
} = window.TransformationMatrix;


let SINGLE_EPOCH_COUNT = 0;
let CURR_GENERATION = 0;
let POPULATION;
let POPULATION_RANDOM;
let TRACK;
let TRACK_RANDOM;

let fitData = [(0,0)];
let plotDiv; 
var svg;
function setup() {    
    // randomSeed(870);
    var canvas = createCanvas(screen_width,screen_height);
    canvas.parent('canvasParent');
    TRACK = new Track();
    TRACK_RANDOM = new Track();
    TRACK_RANDOM.y_offset = 0.15*height;
    TRACK_RANDOM.update();
    
        
    createGui();
}

function draw() {
    background(220);
    TRACK.draw();
    TRACK_RANDOM.draw();

    switch (MODE.toUpperCase()) {
        case "TRACK":
            updateTrackFromGui(TRACK);
            updateTrackFromGui(TRACK_RANDOM);
            break;
        case "TUNE":
            updateEvolveFromGui(POPULATION);
            updateEvolveFromGui(POPULATION_RANDOM);
            break;
        case "EVOLVE":
            for (let i = 0; i < POPULATION.population.length; i++) {
                POPULATION.population[i].update();
                POPULATION.population[i].draw();

                POPULATION_RANDOM.population[i].update();
                POPULATION_RANDOM.population[i].draw();
            }
            SINGLE_EPOCH_COUNT++;
            if (SINGLE_EPOCH_COUNT > SINGLE_EPOCH_DURATION || POPULATION.checkAllCrashed()) {
                CURR_GENERATION++;
                SINGLE_EPOCH_COUNT = 0;
    
                let bf = POPULATION.evaluate();
                bf.avg = Math.round(bf.avg * 1e5) / 1e5;
                bf.max = Math.round(bf.max * 1e5) / 1e5;
                fitLabel.html(`<strong>GA</strong> <br> Epoch: ${CURR_GENERATION} <br> Best Fitness: ${bf.max} <br> Average Fitness: ${bf.avg}`);
                fitData.push([CURR_GENERATION, bf.max]);
                let bf_random = POPULATION_RANDOM.evaluateRandom();
                bf_random.avg = Math.round(bf_random.avg * 1e5) / 1e5;
                bf_random.max = Math.round(bf_random.max * 1e5) / 1e5;
                fitLabelRandom.html(`<strong>Monte Carlo</strong> <br> Epoch: ${CURR_GENERATION} <br> Best Fitness: ${bf_random.max} <br> Average Fitness: ${bf_random.avg}`);
            }
            console.log(POPULATION.population.length);
            break;
    };
}

