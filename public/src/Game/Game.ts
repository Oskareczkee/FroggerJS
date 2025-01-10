import { Scene } from "../Core/Scene";
import { initAudio } from "./Audio";
import { Frog } from "./Frog";
import { initInput } from "./Input";
import { MapGenerator, MapGeneratorOptions } from "./MapGenerator";
import {Audio as GameAudio} from "./Audio"

export class Game{
    private context2D : CanvasRenderingContext2D;
    private actualScene : Scene;

    private tileWidth = 48;
    private tileHeigth = 48;

    constructor(context2D : CanvasRenderingContext2D | null){
        if(context2D===null)
            throw new Error("Game: Rendering context was null!");

        initInput(context2D.canvas);
        initAudio(context2D.canvas);
        
        this.context2D = context2D;
        this.actualScene = new Scene(context2D);
        this.setup();
    }

    get Scene(){return this.actualScene;}

    public setup(){
        GameAudio.GlobalVolume = 0.1;
        let options = new MapGeneratorOptions();
        options.fillScreen=true;

        let map = new MapGenerator(this.context2D).GenerateMap(this.context2D.canvas.width/this.tileWidth,this.context2D.canvas.height/this.tileHeigth, options);
        this.actualScene.addMap(map);
        this.actualScene.addObject(new Frog(this.context2D.canvas.width/2 - 16,this.context2D.canvas.height - 32 ,32,32), "Frog");
        GameAudio.addAndPlay("../resources/audio/background.mp3", 1.0, true, "background");
        /*add more setup here if needed*/
    }

    public run(){
        this.actualScene.loop();
    }
}