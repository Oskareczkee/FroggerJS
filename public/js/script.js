import { Game } from "./Game/Game";
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;
const game = new Game(context);
game.run();
