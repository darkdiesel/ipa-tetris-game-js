import {
    filterElements,
    findElements
} from "./functions.js";

import {
    SELECTOR_TETRIS_START,
    SELECTOR_TETRIS_STOP,
    SELECTOR_TETRIS_PAUSE,
    SELECTOR_TETRIS_RESET,
    SELECTOR_TETRIS_ELEMENT
} from "./constants.js";

export default class Actions {
    constructor(start, stop, pause, reset, container) {
        this.start = start;
        this.stop = stop;
        this.pause = pause;
        this.reset = reset;

        this.container = container;

        this.actionStartElements = filterElements(findElements(SELECTOR_TETRIS_START), this.container, SELECTOR_TETRIS_ELEMENT);
        this.actionStopElements = filterElements(findElements(SELECTOR_TETRIS_STOP), this.container, SELECTOR_TETRIS_ELEMENT);
        this.actionPauseElements = filterElements(findElements(SELECTOR_TETRIS_PAUSE), this.container, SELECTOR_TETRIS_ELEMENT);
        this.actionResetElements = filterElements(findElements(SELECTOR_TETRIS_RESET), this.container, SELECTOR_TETRIS_ELEMENT);

        this.initActions();
    }

    initActions() {
        // if start controls not detected then start game automatically
        if (!this.actionStartElements.length) {
            this.start();
        }

        for (const elem of this.actionStartElements) {
            elem.addEventListener('click',  async () => {
                this.start();
            });
        }

        for (const elem of this.actionStopElements) {
            elem.addEventListener('click', async () => {
                this.stop();
            });
        }

        for (const elem of this.actionPauseElements) {
            elem.addEventListener('click',  async () => {
                this.pause();
            });
        }

        for (const elem of this.actionResetElements) {
            elem.addEventListener('click',  async () => {
                this.reset();
            });
        }
    }
}