export default class Score {
    constructor(container, score = 0) {
        this.container = container;

        this.scoreBlock = this.container.querySelector(".ipa-tetris-game-score .ipa-tetris-game-score-count");

        this.score = score;

        this.draw();
    }

    incScore() {
        this.score++;
        this.draw();
    }

    setToZero() {
        this.score = 0;
        this.draw();
    }

    draw() {
        this.scoreBlock.innerHTML = this.score;
    }
}
