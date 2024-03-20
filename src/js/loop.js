export default class Loop {
    constructor(tetrisUpdate, tetrisDraw, figureDraw, config) {
        this.tetrisUpdate = tetrisUpdate;
        this.tetrisDraw = tetrisDraw;

        this.figureDraw = figureDraw;

        this.config = config;

        this.gameTime = Date.now();
        this.tetrisTime = Date.now();
        this.figureTime = Date.now();

        this.gameTickTimer = undefined;
    }

    gameTick() {
        if (this.config.gameOverStatus) {
            this.stop();
            this.tetrisUpdate();
            return;
        }

        this.gameTime = Date.now();

        if (this.gameTime - this.tetrisTime > this.config.tetrisTick) {
            this.tetrisTime = Date.now();

            this.tetrisUpdate();
            this.tetrisDraw();
        }

        if (this.gameTime - this.figureTime > this.config.figureTick) {
            this.figureTime = Date.now();

            this.figureDraw();
        }
    }

    start() {
        if (!this.isActive()) {
            this.gameTickTimer = setInterval(() => {
                this.gameTick();
            }, this.config.gameTick);
        }
    }

    stop() {
        if (this.isActive()) {
            clearInterval(this.gameTickTimer);

            this.gameTickTimer = undefined;
        }
    }

    isActive(){
        return !(this.gameTickTimer === undefined);
    }
}
