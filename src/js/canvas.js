export default class Canvas {
    constructor(container, config) {
        this.container = container;
        this.config = config;

        //@TODO: Check if exist and don't create
        this.element = document.createElement("canvas");
        this.context = this.element.getContext("2d");

        this.element.width = config.pointSizePxX * 20; // 10 points original = 16 * 10
        this.element.height = config.pointSizePxY * 26; //20 points original = 16 * 20

        this.element.classList.add("ipa-tetris-game-canvas");

        this.container.querySelector(".ipa-tetris-game-canvas-wrapper").appendChild(this.element);

        // set start position
        this.config.centerX = this.getCenterX();
        this.config.centerY = this.getCenterY();

        // calculate game field position by Y coordinate to draw game field from bottom
        this.gameFieldStartX = 0;
        this.gameFieldStartY = this.element.height - (this.config.getGameFieldHeight() * this.config.getPointSizeY());
    }

    getCenterX(){
        return Math.floor((this.element.width / this.config.pointSizePxX)  / 2) * this.config.pointSizePxX;
    }

    getCenterY(){
        return Math.floor((this.element.height / this.config.pointSizePxY)  / 2) * this.config.pointSizePxY;
    }

    drawGameFieldCell(x, y, color){
        this.drawCell(x * this.config.getPointSizeX() + this.gameFieldStartX, y * this.config.getPointSizeY() + this.gameFieldStartY, color);
    }

    drawCell(x, y, color){
        this.context.fillStyle = color;
        this.context.strokeStyle = color;
        this.context.lineWidth = 1;
        // this.context.lineJoin = "bevel";;

        this.context.strokeRect(x + 1, y + 1, this.config.pointSizePxX - 2, this.config.pointSizePxY - 2);
        this.context.fillRect(x + this.config.pointPaddingX, y + this.config.pointPaddingY, this.config.pointSizePxX - this.config.pointPaddingX * 2, this.config.pointSizePxY - this.config.pointPaddingY * 2);
    }

    clearGameFieldCell(x, y) {
        this.clearCell(x * this.config.getPointSizeX() + this.gameFieldStartX, y * this.config.getPointSizeY() + this.gameFieldStartY);
    }

    clearCell(x, y) {
        this.context.clearRect(x, y, this.config.pointSizePxX, this.config.pointSizePxY);
    }

    drawGameField(color){
        this.context.strokeStyle = color;

        this.context.strokeRect(this.gameFieldStartX, this.gameFieldStartY, this.config.getGameFieldWidth() * this.config.getPointSizeX(), this.config.getGameFieldHeight() * this.config.getPointSizeY());
    }

    clearFull(){
        this.clearCell(0, 0, this.element.width, this.element.height);
    }
}
