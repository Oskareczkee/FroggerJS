import { Scene } from "../Core/Scene";
import { initAudio } from "./Audio";
import { Frog } from "./Frog";
import { initInput } from "./Input";
import { MapGenerator, MapGeneratorOptions } from "./MapGenerator";
import {Audio as GameAudio} from "./Audio"
import { Tile } from "../Core/drawing/Tile";
import { Options } from "./Options";
import { FroggerMapGeneratorOptions } from "./MapGeneratorOptionsConf";

export class Game{
    private context2D : CanvasRenderingContext2D;
    private actualScene : Scene;

    private map : Tile[][] | null = null;

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

        this.map = new MapGenerator(this.context2D).GenerateMap(this.context2D.canvas.width/Options.TileWidth,this.context2D.canvas.height/Options.TileHeigth, FroggerMapGeneratorOptions);
        this.actualScene.addMap(this.map);
        this.actualScene.addObject(new Frog(this.context2D.canvas.width/2 - 16,this.context2D.canvas.height - 32 ,32,32), "Frog");
        GameAudio.addAndPlay("../resources/audio/background.mp3", .5, true, "background");
        /*add more setup here if needed*/
    }

    public run(){
        this.actualScene.loop();
    }
}