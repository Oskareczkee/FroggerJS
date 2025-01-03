/*global input and its initializer*/

import { Input as input } from "../Core/Input";

export var inputInitialized : boolean = false;
export var Input : input;

export function initInput(canvas : HTMLCanvasElement){
    Input = new input(canvas);
    inputInitialized = true;
}