/*global input and its initializer*/
import { AudioManager as audio } from "../Core/AudioManager";
export var audioInitialized = false;
export var Audio;
export function initAudio(canvas) {
    Audio = new audio(canvas);
    audioInitialized = true;
}
