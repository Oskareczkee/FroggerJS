/*global input and its initializer*/

import { AudioManager as audio } from "../Core/AudioManager";

export var audioInitialized : boolean = false;
export var Audio : audio;

export function initAudio(canvas : HTMLCanvasElement){
    Audio = new audio(canvas);
    audioInitialized = true;
}