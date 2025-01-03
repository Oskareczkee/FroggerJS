import {Game} from "./Game/Game";

const canvas : HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.imageSmoothingEnabled=false;
const game = new Game(context);
game.run();
