function setSliderAndLabelStyle(slider, label) {
    slider.style('width', '80px');
    slider.style('font-size', '16px');
    slider.style('font-family', 'monospace');
    label.style('font-size', '16px');
    label.style('font-family', 'monospace');
}

function drawDesignControls() {
    // sliderThetaLabel = createDiv();
    // sliderThetaLabel.parent('guiDiv');
    // sliderTheta = createSlider(sliderThetaMin, sliderThetaMax, sliderThetaInit, sliderThetaStep);
    // sliderTheta.parent('guiDiv');
    // sliderThetaLabel.html(`Theta: ${sliderTheta.value()}`);
    // sliderTheta.input(function () {
    //     sliderThetaLabel.html(`Theta: ${sliderTheta.value()}`);
    // });
    // setSliderAndLabelStyle(sliderTheta, sliderThetaLabel);

    sliderNumSegmentsLabel = createDiv();
    sliderNumSegmentsLabel.parent('guiDiv');
    sliderNumSegments = createSlider(sliderNumSegmentsMin, sliderNumSegmentsMax, sliderNumSegmentsInit, sliderNumSegmentsStep);
    sliderNumSegments.parent('guiDiv');
    sliderNumSegmentsLabel.html(`Segments: ${sliderNumSegments.value()}`);
    sliderNumSegments.input(function () {
        sliderNumSegmentsLabel.html(`Segments: <code>${sliderNumSegments.value()}</code>`);
    });
    setSliderAndLabelStyle(sliderNumSegments, sliderNumSegmentsLabel);

    sliderNoiseLevelLabel = createDiv();
    sliderNoiseLevelLabel.parent('guiDiv');
    sliderNoiseLevel = createSlider(sliderNoiseLevelMin, sliderNoiseLevelMax, sliderNoiseLevelInit, sliderNoiseLevelStep);
    sliderNoiseLevel.parent('guiDiv');
    sliderNoiseLevelLabel.html(`Noise: ${sliderNoiseLevel.value()}`);
    sliderNoiseLevel.input(function () {
        sliderNoiseLevelLabel.html(`Noise: <code>${sliderNoiseLevel.value()}</code>`);
    });
    setSliderAndLabelStyle(sliderNoiseLevel, sliderNoiseLevelLabel);

    RANDOMIZE_BUTTON = createButton("Randomize");
    RANDOMIZE_BUTTON.parent('guiDiv');
    RANDOMIZE_BUTTON.style('width', '80px');
    RANDOMIZE_BUTTON.style('margin-top', '10px');
    RANDOMIZE_BUTTON.mousePressed(function () {
        // sliderTheta.value(random(sliderThetaMin, sliderThetaMax));
        sliderNumSegments.value(random(sliderNumSegmentsMin, sliderNumSegmentsMax));
        sliderNumSegmentsLabel.html(`Segments: <code>${sliderNumSegments.value()}</code>`);
        sliderNoiseLevel.value(random(sliderNoiseLevelMin, sliderNoiseLevelMax));
        sliderNoiseLevelLabel.html(`Noise: <code>${sliderNoiseLevel.value()}</code>`);
    });

    MODE_BUTTON.mousePressed(function () {
        MODE = "TUNE";
        // MODE_BUTTON.html("Lock GA");
        // MODE_LABEL.html(`Mode: "${MODE.toUpperCase()}"`);
        POPULATION = new Population(TRACK);
        POPULATION_RANDOM = new Population(TRACK_RANDOM);
        createGui();
    });
}

function drawTuneControls() {
    sliderPopSizeLabel = createDiv();
    sliderPopSizeLabel.parent('guiDiv');
    sliderPopSize = createSlider(sliderPopSizeMin, sliderPopSizeMax, sliderPopSizeInit, sliderPopSizeStep);
    sliderPopSize.parent('guiDiv');
    sliderPopSizeLabel.html(`Population Size: ${sliderPopSize.value()}`);
    sliderPopSize.input(function () {
        sliderPopSizeLabel.html(`Population Size: <code>${sliderPopSize.value()}</code>`);
    });
    setSliderAndLabelStyle(sliderPopSize, sliderPopSizeLabel);

    sliderEpochDurationLabel = createDiv();
    sliderEpochDurationLabel.parent('guiDiv');
    sliderEpochDuration = createSlider(sliderEpochDurationMin, sliderEpochDurationMax, sliderEpochDurationInit, sliderEpochDurationStep);
    sliderEpochDuration.parent('guiDiv');
    sliderEpochDurationLabel.html(`Epoch Duration: ${sliderEpochDuration.value()}`);
    sliderEpochDuration.input(function () {
        sliderEpochDurationLabel.html(`Epoch Duration: <code>${sliderEpochDuration.value()}</code>`);
    });
    setSliderAndLabelStyle(sliderEpochDuration, sliderEpochDurationLabel);

    sliderMutationRateLabel = createDiv();
    sliderMutationRateLabel.parent('guiDiv');
    sliderMutationRate = createSlider(sliderMutationRateMin, sliderMutationRateMax, sliderMutationRateInit, sliderMutationRateStep);
    sliderMutationRate.parent('guiDiv');
    sliderMutationRateLabel.html(`Mutation Rate: ${sliderMutationRate.value()}`);
    sliderMutationRate.input(function () {
        sliderMutationRateLabel.html(`Mutation Rate: <code>${sliderMutationRate.value()}</code>`);
    });
    setSliderAndLabelStyle(sliderMutationRate, sliderMutationRateLabel);


    MODE_BUTTON.mousePressed(function () {
        MODE = "EVOLVE";
        // MODE_BUTTON.html("Reset");
        // MODE_LABEL.html(`Mode: "${MODE.toUpperCase()}"`);
        createGui();
    });
}

function drawEvolveControls() {
    fitLabel = createDiv();
    fitLabel.parent('guiDiv');
    fitLabel.style('font-size', '16px');
    fitLabel.style('font-family', 'monospace');
    fitLabel.html(`<strong>GA</strong> <br> Epoch: 0 <br> Best Fitness: -INF <br> Average Fitness: -INF`);

    // add html bar between two fitness labels
    fitLabelBar = createDiv();
    fitLabelBar.parent('guiDiv');
    fitLabelBar.style('font-size', '16px');
    fitLabelBar.style('font-family', 'monospace');
    fitLabelBar.html(`------------------------`);

    fitLabelRandom = createDiv();
    fitLabelRandom.parent('guiDiv');
    fitLabelRandom.style('font-size', '16px');
    fitLabelRandom.style('font-family', 'monospace');
    fitLabelRandom.html(`<strong>Monte Carlo</strong> <br> Epoch: 0 <br> Best Fitness: -INF <br> Average Fitness: -INF`);

    MODE_BUTTON.mousePressed(function () {
        MODE = "TRACK";
        // MODE_BUTTON.html("Lock Track");
        // MODE_LABEL.html(`Mode: "${MODE.toUpperCase()}"`);
        
        TRACK = new Track();
        POPULATION = new Population(TRACK);

        TRACK_RANDOM = new Track();
        TRACK_RANDOM.y_offset*=-1;
        TRACK_RANDOM.update();
        POPULATION_RANDOM = new Population(TRACK_RANDOM);
        createGui();
    });
}

var MODE_MESSAGE = {
    "TRACK": "1. Design the racetrack",
    "TUNE": "2. Configure GA Parameters",
    "EVOLVE": "3. Run GA vs MC Race..."
}

var MODE_BUTTON_MESSAGE = {
    "TRACK": "Lock Track",
    "TUNE": "Lock GA",
    "EVOLVE": "Reset"
}

function createGui() {
    document.getElementById("guiDiv").innerHTML = "";
    MODE_LABEL = createDiv();
    MODE_LABEL.parent('guiDiv');
    MODE_LABEL.style('font-size', '26px');
    MODE_LABEL.style('font-family', 'monospace');   
    MODE_LABEL.style('margin-bottom', '10px');
    MODE_LABEL.html(`${MODE_MESSAGE[MODE.toUpperCase()]}`);

    MODE_BUTTON = createButton(MODE_BUTTON_MESSAGE[MODE.toUpperCase()]);
    
    switch (MODE.toUpperCase()) {
        case "TRACK":
            drawDesignControls();
            break;
        case "TUNE":
            drawTuneControls();
            break;
        case "EVOLVE":
            drawEvolveControls();
            break;
    };

    MODE_BUTTON.parent('guiDiv');
    MODE_BUTTON.style('font-size', '16px');
    MODE_BUTTON.style('font-family', 'monospace');
    MODE_BUTTON.style('margin-top', '10px');
}

function updateTrackFromGui(track) {
    // sliderTheta.value() != track.theta || 
    if (sliderNumSegments.value() != track.num_segments || sliderNoiseLevel.value() != track.noise_level) {
        // track.theta = sliderTheta.value();
        track.num_segments = sliderNumSegments.value();
        track.noise_level = sliderNoiseLevel.value();
        track.update();
    }
}

function updateEvolveFromGui(evolve) {
    if (sliderPopSize.value() != evolve.population_size || sliderEpochDuration.value() != SINGLE_EPOCH_DURATION || sliderMutationRate.value() != MUTATION_RATE) {
        evolve.population_size = sliderPopSize.value();
        SINGLE_EPOCH_DURATION = sliderEpochDuration.value();
        MUTATION_RATE = sliderMutationRate.value();
        evolve.reset();
    }
}