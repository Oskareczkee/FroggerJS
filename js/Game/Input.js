/*global input and its initializer*/
import { Input as input } from "../Core/Input";
export var inputInitialized = false;
export var Input;
export function initInput(canvas) {
    Input = new input(canvas);
    inputInitialized = true;
}
