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

let fitData = [0];
let plotDiv; 
var svg;
var canvas2DContext;

function setup() {    
    // randomSeed(870);
    var canvas = createCanvas(screen_width,screen_height);
    canvas.parent('canvasParent');
    canvas2DContext = canvas.canvas;
    TRACK = new Track();
    TRACK_RANDOM = new Track();
    TRACK_RANDOM.y_offset*=-1;
    TRACK_RANDOM.update();   
    createGui();
}

function draw() {
    background(126,200,80);
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
                fitData.push(bf.max);
                let bf_random = POPULATION_RANDOM.evaluateRandom();
                bf_random.avg = Math.round(bf_random.avg * 1e5) / 1e5;
                bf_random.max = Math.round(bf_random.max * 1e5) / 1e5;
                fitLabelRandom.html(`<strong>Monte Carlo</strong> <br> Epoch: ${CURR_GENERATION} <br> Best Fitness: ${bf_random.max} <br> Average Fitness: ${bf_random.avg}`);
                // drawPlot();
            }
            // console.log(POPULATION.population.length);
            break;
            
    };
}

function drawPlot() {
    let plotWidth = 200, plotHeight=200;
    var svg = d3.select("#plotParent svg");
    if (svg.empty()) {
        svg = d3.select("#plotParent").append("svg")
        .attr("width", plotWidth)
        .attr("height", plotHeight);
    }
    svg.selectAll("*").remove();

    var x = d3.scaleLinear()
        .domain([0, fitData.length])
        .range([0, plotWidth]);

    var y = d3.scaleLinear()
        .domain([0, d3.max(fitData)])
        .range([plotHeight, 0]);
        
    var line = d3.line()
        .x(function(d, i) { return x(i); })
        .y(function(d, i) { return y(d); });

    svg.append("path")
        .datum(fitData)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
  }