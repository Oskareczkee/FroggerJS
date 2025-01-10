import { Scene } from "./Core/Scene";
import { Frog } from "./Game/Frog";
import { Game } from "./Game/Game";
import { Input } from "./Game/Input";
import { Audio as GameAudio } from "./Game/Audio";

//GAME STUFF
var canvasVisible = true;
const canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
const canvasError: HTMLElement = document.getElementById("game-canvas-error") as HTMLElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.imageSmoothingEnabled = false;
const game = new Game(context);


const frog = game.Scene.findByName("Frog") as Frog;
frog.addElements(document.getElementById("game-lives"), document.getElementById("game-score"), document.getElementById("game-level")); //add elements, so frog events will be able to upadte lives, score and level
frog.updateElements();

game.run();

//END GAME STUFF

//add this listener, if user is on the phone it will not show canvas
window.addEventListener("load", function () {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        this.document.getElementById("game-buttons")?.classList.remove("d-none"); //show controls when user is on the phone


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
})

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
})


//phone game buttons subscribe to events
var upInterval: NodeJS.Timeout | null = null, downInterval: NodeJS.Timeout | null = null, rightInterval: NodeJS.Timeout | null = null, leftInterval: NodeJS.Timeout | null = null;
var buttonUp = document.getElementById("game-button-up"), buttonDown = document.getElementById("game-button-down");
var buttonLeft = document.getElementById("game-button-left"), buttonRight = document.getElementById("game-button-right");
var buttons = document.getElementById("game-buttons");

buttons?.addEventListener("touchstart", function(){
    //WARNING: in future just find better solution, iterating through 1 element is not costfull, but this is dirty play
    GameAudio.playAll(); //audio is set to play when canvas is focused, but when it loses that focus audio stops playing
});

buttonUp?.addEventListener("touchstart", function () {
    upInterval = setInterval(function () {
        Input.addKeyPressed('w');
    }, Scene.UPDATE_INTERVAL); //this is the framerate
})

buttonDown?.addEventListener("touchstart", function () {
    downInterval = setInterval(function () {
        Input.addKeyPressed('s');
    }, Scene.UPDATE_INTERVAL); //this is the framerate
})

buttonLeft?.addEventListener("touchstart", function () {
    leftInterval = setInterval(function () {
        Input.addKeyPressed('a');
    }, Scene.UPDATE_INTERVAL); //this is the framerate
})

buttonRight?.addEventListener("touchstart", function () {
    rightInterval = setInterval(function () {
        Input.addKeyPressed('d');
    }, Scene.UPDATE_INTERVAL); //this is the framerate
})


buttonUp?.addEventListener("touchend", function () {
    if (!upInterval) return;
    Input.removeKeyPressed('w');
    clearInterval(upInterval);
})

buttonDown?.addEventListener("touchend", function () {
    if (!downInterval) return;
    Input.removeKeyPressed('s');
    clearInterval(downInterval);
})

buttonLeft?.addEventListener("touchend", function () {
    if (!leftInterval) return;
    Input.removeKeyPressed('a');
    clearInterval(leftInterval);
})

buttonRight?.addEventListener("touchend", function () {
    if (!rightInterval) return;
    Input.removeKeyPressed('d');
    clearInterval(rightInterval);
})