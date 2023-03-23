function Population(track){
    this.population_size = POPULATION_SIZE;
    this.population = [];
    this.track = track;
    
    let {position, direction} = this.track.getStartingPositionDirection();
    
    this.generatePopulation = function () {
        this.population = [];
        for (let i = 0; i < this.population_size; i++) {
            // random 2d vector +- 10
            this.population.push(new Vehicle(this.track, position.copy(), direction.normalize()));
        }
    }
    this.generatePopulation();

    this.evaluate = function () {
        let max_fitness = 0;
        let max_fitness_index = 0;
        for (let i = 0; i < this.population_size; i++) {
            this.population[i].calculateFitness();
            if (this.population[i].fitness > max_fitness) {
                max_fitness = this.population[i].fitness;
                max_fitness_index = i;
            }
        }
        this.population.sort((a, b) => b.fitness - a.fitness);
        let avg_fit = this.population.reduce((acc, cur) => acc + cur.fitness, 0) / this.population.length;
        let new_population = this.selection(this.population.slice(0, this.population_size / 2));
        // destroy old population
        this.population = [];
        this.population = new_population;
        return {
            "max": max_fitness,
            "avg": avg_fit,
        };
    }

    this.evaluateRandom = function () {
        let max_fitness = 0;
        let max_fitness_index = 0;
        for (let i = 0; i < this.population_size; i++) {
            this.population[i].calculateFitness();
            if (this.population[i].fitness > max_fitness) {
                max_fitness = this.population[i].fitness;
                max_fitness_index = i;
            }
        }
        this.population.sort((a, b) => b.fitness - a.fitness);
        let avg_fit = this.population.reduce((acc, cur) => acc + cur.fitness, 0) / this.population.length;
        this.population = [];
        this.generatePopulation();
        return {
            "max": max_fitness,
            "avg": avg_fit,
        };
    }

    this.crossover = function (parent_a, parent_b) {
        let child = new Vehicle(this.track, position.copy(), direction.normalize());
        if (Math.random() > XOVER_RATE) {
            // create copy of parent_a genes
            let new_genes = parent_a.genome.genes.slice();
            child.genome = new Genome(new_genes);
            return child;
        }
        let mid = Math.floor(random(parent_a.genome.genes.length));
        let new_genes = parent_a.genome.genes.slice(0, mid).concat(parent_b.genome.genes.slice(mid));
        child.genome = new Genome(new_genes);
        return child;
    }

    this.selection = function (mating_pool) {
        let new_population = [];
        for (let i = 0; i < this.population_size; i++) {
            let parent_a = mating_pool[Math.floor(random(mating_pool.length))];
            let parent_b = mating_pool[Math.floor(random(mating_pool.length))];
            let child = this.crossover(parent_a, parent_b);
            child.genome.mutate();
            new_population.push(child);
        }
        return new_population;
    }

    this.checkAllCrashed = function () {
        return this.population.every((vehicle) => vehicle.crashed);
    }


    this.reset = function () {
        this.generatePopulation();
        SINGLE_EPOCH_COUNT = 0;
        CURR_GENERATION = 0;
    }
}