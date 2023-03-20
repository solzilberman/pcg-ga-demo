function nextMode() {
    if (MODE == "design") {
        MODE = "EVOLVE";
        button.html("Reset");
        POPULATION.reset();
    } else {
        MODE = "design";
        button.html("Accept Track");
    }
}

function handleSliders() {
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

    tmpTheta = sliderTheta.value();
    if (track.theta != tmpTheta) {
        track.theta = sliderTheta.value();
        track.update();
    }
    labelTheta.html('Track Theta: ' + track.theta);
}