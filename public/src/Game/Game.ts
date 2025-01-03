import { Tile } from "../Core/drawing/Tile";
import { Scene } from "../Core/Scene";
import { FireHydrant } from "./FireHydrant";
import { Frog } from "./Frog";
import { initInput } from "./Input";

export class Game{
    private context2D : CanvasRenderingContext2D;
    private actualScene : Scene;

    constructor(context2D : CanvasRenderingContext2D | null){
        if(context2D===null)
            throw new Error("Game: Rendering context was null!");

        initInput(context2D.canvas); /*init input in Input.ts, so input will be available globally for this game instance*/
        this.context2D = context2D;
        this.actualScene = new Scene(context2D);
        this.setup();
    }

    public setup(){
        this.actualScene.addObject(new Frog());
        this.actualScene.addObject(new FireHydrant(200,200,50,50));
        /*add more setup here if needed*/
    }

    public run(){
        this.actualScene.loop();
    }
}