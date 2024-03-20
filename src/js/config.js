import { convertSpeed, convertVolume } from './functions';

import {
  GAME_FIELD_WIDTH,
  GAME_FIELD_HEIGHT,
} from './constants';

export default class Config {
  constructor(options = {}) {
    this.tetrisColor = options.tetrisColor || '#2e3434';
    this.figureColor = options.figureColor || '#2e3434'; // #A00034

    this.gameFieldWidth = options.gameFieldWidth || GAME_FIELD_WIDTH;
    this.gameFieldHeight = options.gameFieldHeight || GAME_FIELD_HEIGHT;

    this.pointSizePxX = options.pointSizePxX || 16; // size 1 point of tetris in pixels
    this.pointSizePxY = options.pointSizePxY || 16; // size 1 point of tetris in pixels

    this.pointPaddingX = options.pointPaddingX || 4; // padding for points
    this.pointPaddingY = options.pointPaddingY || 4; // padding for points

    this.centerX = 0; // start position by x of tetris
    this.centerY = 0; // start position by y of tetris

    // mute game
    if ('mute' in options) {
      this.mute = options.mute;
    } else {
      this.mute = true;
    }

    // volume of game
    if (options.gameVolume) {
      this.gameVolume = convertVolume(options.gameVolume);
    } else {
      this.gameVolume = 0.001;
    }

    this.gameTick = options.gameTick || 10; // time out between game animation steps

    // time out between tetris steps
    if (options.tetrisTick) {
      this.tetrisTick = convertSpeed(options.tetrisTick);
    } else {
      this.tetrisTick = 300;
    }

    this.figureTick = options.figureTick || 50; // time out between figure blinding

    this.gameOverStatus = false;
  }

  getGameFieldWidth() {
    return this.gameFieldWidth;
  }

  getGameFieldHeight() {
    return this.gameFieldHeight;
  }

  getPointSizeX() {
    return this.pointSizePxX;
  }

  getPointSizeY() {
    return this.pointSizePxY;
  }
}
