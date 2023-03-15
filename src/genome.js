const MUTATION_RATE = 0.01;
const MAX_MAG = 2;
function Genome(genes) {
    this.genes = [];
    if (genes) {
        this.genes = genes;
    } else {
        for (let i = 0; i < SINGLE_EPOCH_DURATION; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(MAX_MAG);
        }
    }

    this.mutate = function () {
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < MUTATION_RATE) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(MAX_MAG);
            }
        }
    }
}