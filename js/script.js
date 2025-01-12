import { Scene } from "./Core/Scene";
import { Game } from "./Game/Game";
import { Input } from "./Game/Input";
import { Audio as GameAudio } from "./Game/Audio";
//GAME STUFF
var canvasVisible = true;
const canvas = document.getElementById("game-canvas");
const canvasError = document.getElementById("game-canvas-error");
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;
const game = new Game(context);
const frog = game.Scene.findByName("Frog");
frog.addElements(document.getElementById("game-lives"), document.getElementById("game-score"), document.getElementById("game-level")); //add elements, so frog events will be able to upadte lives, score and level
frog.updateElements();
game.run();
//END GAME STUFF
//add this listener, if user is on the phone it will not show canvas
window.addEventListener("load", function () {
    var _a;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        (_a = this.document.getElementById("game-buttons")) === null || _a === void 0 ? void 0 : _a.classList.remove("d-none"); //show controls when user is on the phone
    if (canvasVisible && this.window.innerWidth < 576) {
        canvas.classList.add("d-none");
        canvasError.classList.remove("d-none");
        canvasVisible = false;
    }
    else {
        canvas.classList.remove("d-none");
        canvasError.classList.add("d-none");
        canvasVisible = true;
    }
});
//if user rotates phone, or changes size to proper size show game
window.addEventListener("resize", function () {
    if (canvasVisible && this.window.innerWidth < 576) {
        canvas.classList.add("d-none");
        canvasError.classList.remove("d-none");
        canvasVisible = false;
    }
    else {
        canvas.classList.remove("d-none");
        canvasError.classList.add("d-none");
        canvasVisible = true;
    }
});
//phone game buttons subscribe to events
var upInterval = null, downInterval = null, rightInterval = null, leftInterval = null;
var buttonUp = document.getElementById("game-button-up"), buttonDown = document.getElementById("game-button-down");
var buttonLeft = document.getElementById("game-button-left"), buttonRight = document.getElementById("game-button-right");
var buttons = document.getElementById("game-buttons");
buttons === null || buttons === void 0 ? void 0 : buttons.addEventListener("touchstart", function () {
    GameAudio.playAll(); //audio is set to play when canvas is focused, but when it loses that focus audio stops playing
});
//no need to add touch end
buttonUp === null || buttonUp === void 0 ? void 0 : buttonUp.addEventListener("touchstart", function () {
    upInterval = setInterval(function () {
        Input.addKeyPressed('w');
    }, Scene.UPDATE_INTERVAL); //this is the framerate
});
buttonDown === null || buttonDown === void 0 ? void 0 : buttonDown.addEventListener("touchstart", function () {
    downInterval = setInterval(function () {
        Input.addKeyPressed('s');
    }, Scene.UPDATE_INTERVAL); //this is the framerate
});
buttonLeft === null || buttonLeft === void 0 ? void 0 : buttonLeft.addEventListener("touchstart", function () {
    leftInterval = setInterval(function () {
        Input.addKeyPressed('a');
    }, Scene.UPDATE_INTERVAL); //this is the framerate
});
buttonRight === null || buttonRight === void 0 ? void 0 : buttonRight.addEventListener("touchstart", function () {
    rightInterval = setInterval(function () {
        Input.addKeyPressed('d');
    }, Scene.UPDATE_INTERVAL); //this is the framerate
});
buttonUp === null || buttonUp === void 0 ? void 0 : buttonUp.addEventListener("touchend", function () {
    if (!upInterval)
        return;
    Input.removeKeyPressed('w');
    clearInterval(upInterval);
});
buttonDown === null || buttonDown === void 0 ? void 0 : buttonDown.addEventListener("touchend", function () {
    if (!downInterval)
        return;
    Input.removeKeyPressed('s');
    clearInterval(downInterval);
});
buttonLeft === null || buttonLeft === void 0 ? void 0 : buttonLeft.addEventListener("touchend", function () {
    if (!leftInterval)
        return;
    Input.removeKeyPressed('a');
    clearInterval(leftInterval);
});
buttonRight === null || buttonRight === void 0 ? void 0 : buttonRight.addEventListener("touchend", function () {
    if (!rightInterval)
        return;
    Input.removeKeyPressed('d');
    clearInterval(rightInterval);
});
