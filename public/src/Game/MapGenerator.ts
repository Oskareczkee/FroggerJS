import { Tile } from "../Core/drawing/Tile";

export class MapGeneratorOptions {
    //x coordinate of the first tile
    startX: number = 0;
    //y coordinate of the first tile
    startY: number = 0;

    //Tile width in pixels
    tileWidthPx: number = 50;
    //Tile height in pixels
    tileHeightPx: number = 50;
    //number of tiles horizontally
    tilesHorizontal: number = 20;
    //number of tiles vertically
    tilesVertical: number = 20;

    //fills screen, overrides tileWidthPx, and tileHeightPx to fit the whole screen
    fillScreen: boolean = false;
    //how much padding has to be added relative to the screen, works only if fillScreen is set to true
    screenPaddingX: number = 0;
    //how much padding has to be added relative to the screen, works only if fillScreen is set to true
    screenPaddingY: number = 0;

    pavementChance = 0.1; //10%
    roadChance = 0.9; // 90%
}

export class MapGenerator {
    private static tileGrassSrc = '';
    private static tileRoadSrc = '';
    private static tilePavementSrc = '';

    private GenerateRoad(tilesHorizontal: number,
        startX: number, startY: number,
        settings: MapGeneratorOptions) : Array<Tile> {
        let out = [];
        let actualX = startX;
        for(let x = 0; x < tilesHorizontal;x++){
            out.push(new Tile(actualX, startY, settings.tileWidthPx, settings.tileHeightPx, MapGenerator.tileRoadSrc));
            actualX+=settings.tileWidthPx;
        }

        return out;
    }

    
    private GeneratePavement(tilesHorizontal: number,
        startX: number, startY: number,
        settings: MapGeneratorOptions) : Array<Tile> {
        let out = [];
        let actualX = startX;
        for(let x = 0; x < tilesHorizontal;x++){
            out.push(new Tile(actualX, startY, settings.tileWidthPx, settings.tileHeightPx, MapGenerator.tilePavementSrc));
            actualX+=settings.tileWidthPx;
        }

        return out;
    }

    private GenerateGrass(tilesHorizontal: number,
        startX: number, startY: number,
        settings: MapGeneratorOptions) : Array<Tile> {
        let out = [];
        let actualX = startX;
        for(let x = 0; x < tilesHorizontal;x++){
            out.push(new Tile(actualX, startY, settings.tileWidthPx, settings.tileHeightPx, MapGenerator.tileGrassSrc));
            actualX+=settings.tileWidthPx;
        }

        return out;
    }

    public GenerateMap(tilesHorizontal: number, tilesVertical: number,
        context2D: CanvasRenderingContext2D,
        settings: MapGeneratorOptions): Array<Array<Tile>> {
        let out: Array<Array<Tile>> = [[]];

        if (settings.fillScreen) {
            let canvasX = context2D.canvas.width - settings.screenPaddingX * 2;
            let canvasY = context2D.canvas.height - settings.screenPaddingY * 2;

            settings.startX = settings.screenPaddingX;
            settings.startY = settings.screenPaddingY;
            settings.tileWidthPx = canvasX / settings.tilesHorizontal;
            settings.tileHeightPx = canvasY / settings.tilesVertical;
        }

        let actualX = settings.startX;
        let actualY = settings.startY;

        //top 2 tiles will be always grass
        out.push(this.GenerateGrass(tilesHorizontal, actualX, actualY, settings));
        actualY+=settings.tileHeightPx;
        out.push(this.GenerateGrass(tilesHorizontal, actualX, actualY, settings));
        actualY+=settings.tileHeightPx;

        let wasPavement: boolean = false; //was the last row pavement?

        //generate tilesVertical - 2 - 1 road/pavement tiles, -1 cause we want the last tile to be grass as well
        for (let x = 0; x < settings.tilesVertical - 3; x++) {

            //if last row was pavement, generate road
            if (wasPavement) {
                out.push(this.GenerateRoad(tilesHorizontal, actualX, actualY, settings));
                wasPavement = false;
                actualY+=settings.tileHeightPx;
                continue;
            }

            let isPavement : boolean = Math.random() < settings.pavementChance;
            if(isPavement){
                out.push(this.GeneratePavement(tilesHorizontal, actualX, actualY, settings));
                wasPavement=true;
                actualY = settings.tileHeightPx;
                continue;
            }

            //else road has been generated
            else{
                out.push(this.GenerateRoad(tilesHorizontal, actualX, actualY, settings));
                actualY+=settings.tileHeightPx;
                continue;
            }
        }

        //last row should be grass
        out.push(this.GenerateGrass(tilesHorizontal, actualX, actualY, settings));

        return out;
    }
}