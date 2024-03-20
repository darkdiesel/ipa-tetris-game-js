import { getRandomInt } from './functions.js';

import eatAudio from '../audio/mr_9999_05.wav';

export default class Figure {
  constructor(config, canvas) {
    this.config = config;
    this.canvas = canvas;

    this.x = 0; // figure x coordinate (left bottom point) on game field
    this.y = 0; // figure x coordinate (left bottom point) on game field

    this.figureSize = 4; // size of array to store figure coordinates
    this.figureCount = 6; // count of available figures

    this.visible = true;

    // init array to store figure
    this.figure = new Array(this.figureSize).fill(0).map(() => new Array(this.figureSize).fill(true));

    // init new random figure
    this.randomFigure();
  }

  randomFigure() {
    let figureNum = getRandomInt(0, this.figureCount + 1);

    console.log('Figure:', figureNum);

    // clean previous figure before init new
    this.cleanFigure();

    // reset coordinates
    this.x = 0;
    this.y = 0;

    switch (figureNum) {
      case 0:  // "L"
        this.figure[1][0] = true;
        this.figure[2][0] = true;
        this.figure[3][0] = true;
        this.figure[3][1] = true;
        break;
      case 1: // "J"
        this.figure[1][1] = true;
        this.figure[2][1] = true;
        this.figure[3][1] = true;
        this.figure[3][0] = true;
        break;
      case 2: // "I"
        this.figure[0][0] = true;
        this.figure[1][0] = true;
        this.figure[2][0] = true;
        this.figure[3][0] = true;
        break;
      case 3: // "/\/"
        this.figure[1][1] = true;
        this.figure[2][0] = true;
        this.figure[2][1] = true;
        this.figure[3][0] = true;
        break;
      case 4: // "\/\"
        this.figure[1][0] = true;
        this.figure[2][0] = true;
        this.figure[2][1] = true;
        this.figure[3][1] = true;
        break;
      case 5: // "cube"
        this.figure[2][0] = true;
        this.figure[2][1] = true;
        this.figure[3][0] = true;
        this.figure[3][1] = true;
        break;
      case 6: // "T"
        this.figure[2][0] = true;
        this.figure[2][1] = true;
        this.figure[2][2] = true;
        this.figure[3][1] = true;
        break;
    }
  }

  cleanFigure() {
    for (let i = 0; i < this.figureSize; i++) {
      for (let j = 0; j < this.figureSize; j++) {
        this.figure[i][j] = 0;
      }
    }
  }

  draw(changeVisibility = false) {
    if (changeVisibility) {
      this.visible = !this.visible;
    }

    // clear figure from canvas
    this.clear();

    // if figure visible show it
    if (this.visible) {
      this.show();
    }
  }

  show() {
    for (let i = 0 ; i < this.figureSize; i++) {
      for (let j = this.figureSize - 1; j >= 0; j--) {
        if (this.figure[i][j] === true) {
          let _x = this.x + j;
          let _y = this.y - this.figureSize + (i + 1);

          if (_x >= 0 && _y >= 0) {
            this.canvas.drawGameFieldCell(_x, _y, this.config.figureColor);
          }
        }
      }
    }
  }

  clear() {
    for (let i = 0 ; i < this.figureSize; i++) {
      for (let j = this.figureSize - 1; j >= 0; j--) {
        if (this.figure[i][j] === true) {
          let _x = this.x + j;
          let _y = this.y - this.figureSize + (i + 1);

          if (_x >= 0 && _y >= 0) {
            this.canvas.clearGameFieldCell(_x, _y);
          }
        }
      }
    }


  }
}