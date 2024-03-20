import moveAudio from "../audio/mr_9999_14.wav";
import gameOverAudio from "../audio/mr_9999_08.wav";

import {
    DEBUG_MODE,
} from "./constants.js";
export default class Tetris {

    constructor(config, canvas, figure) {
        this.config = config;
        this.canvas = canvas;
        this.figure = figure;

        this.x = this.config.centerX;
        this.y = this.config.centerY;

        this.speedX = this.config.pointSizePxX;
        this.speedY = 0;

        this.points = new Array(this.config.getGameFieldHeight()).fill(0).map(() => new Array(this.config.getGameFieldWidth()).fill(false));

        // tetris 1 step move audio
        this.moveAudio = new Audio();
        this.moveAudio.preload = 'auto';
        // this.moveAudio.src = '../audio/mr_9999_14.wav';
        this.moveAudio.src = moveAudio;

        // tetris crashed move audio
        this.gameOverAudio = new Audio();
        this.gameOverAudio.preload = 'auto';
        // this.gameOverAudio.src = '../audio/mr_9999_08.wav';
        this.gameOverAudio.src = gameOverAudio;

        this.config.gameOverStatus = false;
    }

    /**
     * Move tetris figure. Check that the figure is down. Check if tetris crashed
     *
     * @param figure
     * @param score
     */
    update(score) {
        // update figure x coordinate
        this.figure.clear(); // clean figure
        this.figure.y += 1;

        if (this.figure.y >= this.config.getGameFieldHeight()) {
            this.config.gameOverStatus = true;
        }

        // this.x += this.speedX;
        // this.y += this.speedY;
        //
        // if (this.x < 0) {
        //     this.x = this.canvas.element.width - this.config.pointSizePx;
        // } else if (this.x >= this.canvas.element.width) {
        //     this.x = 0;
        // }
        //
        // if (this.y < 0) {
        //     this.y = this.canvas.element.height - this.config.pointSizePx;
        // } else if (this.y >= this.canvas.element.height) {
        //     this.y = 0;
        // }
        //
        // this.points.unshift({x: this.x, y: this.y});
        //
        // if (this.points.length > this.maxPoints) {
        //     this.points.pop();
        // }
        //
        // this.points.forEach((el, index) => {
        //     if (el.x === apple.x && el.y === apple.y) {
        //         apple.startEatSound();
        //         this.maxPoints++;
        //         score.incScore();
        //         apple.randomPosition();
        //     }
        //
        //     for (let i = index + 1; i < this.points.length; i++) {
        //         if (el.x === this.points[i].x && el.y === this.points[i].y) {
        //             this.config.gameOverStatus = true;
        //         }
        //     }
        // });

        if (this.config.gameOverStatus) {
            this.gameOver();
            score.setToZero();
            this.figure.randomFigure();
        }
    }

    /**
     * Check if tetris not rotated back while standing on one cell
     * @param speedX
     * @param speedY
     * @returns {boolean}
     */
    checkIfTurnBack(speedX, speedY) {
        if (typeof this.points[1] === 'undefined') {
            return false;
        }

        let x = this.x + speedX;
        let y = this.y + speedY;

        return (this.points[1].x === x) && (this.points[1].y === y);
    }

    /**
     * Draw tetris game field by Points
     */
    draw() {
        for (let i = 0; i < this.config.getGameFieldHeight(); i++) {
            for (let j = 0; j < this.config.getGameFieldWidth(); j++) {
                // console.log('[' + i + ',' + j + ']=',this.points[i][j]);
                if(this.points[i][j] === true) {
                    this.canvas.drawGameFieldCell(j, i, this.config.tetrisColor);
                }
            }
        }
    }

    /**
     * Play move sound when tetris is moving
     */
    startMoveSound() {
        if (!this.config.mute) {
            this.moveAudio.volume = this.config.gameVolume;

            this.moveAudio.play().then(() => {}).catch(() => {
                this.config.mute = true;
            });
        }
    }

    /**
     * Stop playing move sound when tetris is moving
     */
    stopMoveSound() {
        if (!this.config.mute) {
            this.moveAudio.pause();
            this.moveAudio.currentTime = 0;
        }
    }

    /**
     * Play boom sound when tetris is crashed
     */
    startGameOverSound() {
        if (!this.config.mute) {
            this.gameOverAudio.volume = this.config.gameVolume;

            this.gameOverAudio.play().catch(() => {
                this.config.mute = true;
            });
        }
    }

    /**
     * Stop playing boom sound when tetris is crashed
     */
    stopGameOverSound() {
        if (!this.config.mute) {
            this.gameOverAudio.pause();
            this.gameOverAudio.currentTime = 0;
        }
    }

    /**
     * Reset tetris params in case of game over
     */
    gameOver() {
        this.startGameOverSound();

        this.x = this.config.centerX;
        this.y = this.config.centerY;

        this.speedX = this.config.pointSizePxX;
        this.speedY = 0;

        this.cleandPoints();

        // this.config.gameOverStatus = false;
    }

    cleandPoints() {
        for (let i = 0; i < this.config.getGameFieldHeight(); i++) {
            for (let j = 0; j < this.config.getGameFieldWidth(); j++) {
                this.points[i][j] = 0;
            }
        }
    }

    moveUp() {
        if (!this.checkIfTurnBack(0, -this.config.pointSizePx)) {
            this.speedX = 0;
            this.speedY = -this.config.pointSizePx;
        }
    }

    moveDown() {
        if (!this.checkIfTurnBack(0, this.config.pointSizePx)) {
            this.figure.clear();
            this.figure.y += 1;
        }
    }

    moveLeft() {
        if (!this.checkIfTurnBack(-this.config.pointSizePx, 0)) {
            this.figure.clear();
            this.figure.x -= 1;
        }
    }

    moveRight() {
        if (!this.checkIfTurnBack(this.config.pointSizePx, 0)) {
            this.figure.clear();
            this.figure.x += 1;
        }
    }
}
