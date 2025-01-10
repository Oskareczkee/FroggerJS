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
    //this function can be used to simulate key press
    addKeyPressed(key) {
        if (this.keymap.has(key))
            return;
        this.keymap.add(key);
    }
    //this function can be used to simulate key press
    removeKeyPressed(key) {
        if (this.keymap.has(key))
            this.keymap.delete(key);
    }
    isKeyPressed(key) {
        if (this.keymap.has(key))
            return true;
        return false;
    }
}
