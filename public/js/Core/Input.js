export class Input {
    constructor(canvasElement) {
        this.keymap = new Set(); /*if key is present in set it is pressed*/
        this.canvas = canvasElement;
        //add proper event listeners
        let instance = this; //this is overloaded in events, we need to keep it
        this.canvas.addEventListener("keydown", function (e) {
            instance.keymap.add(e.key);
        });
        this.canvas.addEventListener("keyup", function (e) {
            instance.keymap.delete(e.key);
        });
    }
    isKeyPressed(key) {
        if (this.keymap.has(key))
            return true;
        return false;
    }
}
