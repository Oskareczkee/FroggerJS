export class Input{
    private canvas : HTMLCanvasElement
    private keymap : Set<string> = new Set() /*if key is present in set it is pressed*/

    constructor(canvasElement : HTMLCanvasElement){
        this.canvas = canvasElement;

        //add proper event listeners
        let instance = this; //this is overloaded in events, we need to keep it
        this.canvas.addEventListener("keydown", function(e){
            instance.keymap.add(e.key);       
        });

        this.canvas.addEventListener("keyup", function(e){
            instance.keymap.delete(e.key);
        });
    }

    //this function can be used to simulate key press
    public addKeyPressed(key : string){
        if(this.keymap.has(key)) return;
        this.keymap.add(key);
    }

    //this function can be used to simulate key press
    public removeKeyPressed(key : string){
        if(this.keymap.has(key))
            this.keymap.delete(key);
    }

    public isKeyPressed(key : string){
        if(this.keymap.has(key))
            return true;
        return false;
    }

    /*is key released can be added by adding second set, which will have keys pressed in previous frame
      if in previous frame key was pressed and in actual it is not, that means it has been just released*/
}