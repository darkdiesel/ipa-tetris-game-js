import Config from "./config.js";

import Settings from "./settings.js";
import Actions from "./actions.js";

import Canvas from "./canvas.js";
import Score from "./score.js";

import Tetris from "./tetris.js";
import Figure from "./figure.js";

import controlsKeyboard from "./controls-keyboard.js";
import ControlsButtons from "./controls-buttons.js";
import ControlsTouch from "./controls-touch";

import Loop from "./loop.js";

import {SELECTOR_TETRIS} from "./constants";


export default class IpaTetrisGame {
    constructor(container, options = {}) {
        if (container === null) {
            return;
        }

        this.container = container;

        // setup config
        this.config = new Config(options);

        // setup settings
        new Settings(this.container, this.config);

        // create canvas and control elements
        this.canvas = new Canvas(this.container, this.config);
        this.score = new Score(this.container, 0);

        // game elements
        this.figure = new Figure(this.config, this.canvas); // create figure
        this.tetris = new Tetris(this.config, this.canvas, this.figure); // create tetris

        new controlsKeyboard(this.canvas, () => {this.tetris.moveUp();}, () => {this.tetris.moveDown();}, () => {this.tetris.moveLeft();}, () => {this.tetris.moveRight();});
        new ControlsButtons(this.container, () => {this.tetris.moveUp();}, () => {this.tetris.moveDown();}, () => {this.tetris.moveLeft();}, () => {this.tetris.moveRight();});
        new ControlsTouch(this.canvas, () => {this.tetris.moveUp();}, () => {this.tetris.moveDown();}, () => {this.tetris.moveLeft();}, () => {this.tetris.moveRight();});

        // this.loop = undefined;
        this.loop = new Loop(this.updateTetris.bind(this), this.drawTetris.bind(this), this.drawFigure.bind(this), this.config);

        new Actions(this.start.bind(this), this.stop.bind(this), this.pause.bind(this), this.reset.bind(this), this.container, this.config);
    }

    start() {
        this.loop.start();
    }

    stop() {
        this.loop.stop();

        this.tetris.gameOver();
        this.score.setToZero();

        this.canvas.clearFull();
    }

    pause() {
        if (this.loop.isActive()) {
            this.loop.stop();
        }
    }

    reset() {
        if (this.loop.isActive()) {
            this.loop.stop();

            this.tetris.gameOver();

            this.score.setToZero();
            this.figure.randomFigure();

            this.loop.start();
        }
    }

    updateTetris() {
        if (this.config.gameOverStatus) {
            this.drawGameOver();
        } else {
            this.tetris.update(this.score);
        }
    }

    drawTetris() {
        this.tetris.stopMoveSound();

        this.canvas.clearFull();

        this.tetris.startMoveSound();
        this.tetris.draw();

        //this.figure.draw();

        this.canvas.drawGameField();
    }

    drawFigure(){
        this.figure.draw(true);
    }

    drawGameOver() {
        for (let y = 0; y < this.canvas.element.height; y+=this.config.pointSizePxY) {
            for (let x = 0; x < this.canvas.element.width; x+=this.config.pointSizePxX) {
                this.canvas.drawCell(x, y, this.config.tetrisColor);
            }
        }

        this.config.gameOverStatus = false;
    }
}

for (const tetris of document.querySelectorAll(SELECTOR_TETRIS)) {
    new IpaTetrisGame(tetris);
}