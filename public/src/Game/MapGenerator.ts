import { Tile } from "../Core/drawing/Tile";
import { Car, CarDirection } from "./Car";
import { FireHydrant } from "./FireHydrant";

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
    fillScreen: boolean = true;
    //how much padding has to be added relative to the screen, works only if fillScreen is set to true
    screenPaddingX: number = 0;
    //how much padding has to be added relative to the screen, works only if fillScreen is set to true
    screenPaddingY: number = 0;

    pavementChance = 0.1; //10%
    fireHydrantChance = 0.2;
    maxFireHydrants = (this.tilesHorizontal / 4) * 3; //75%

    roadCarsMin = 2;
    roadCarsMax = 5;
    roadCarsSpeedMin = 3;
    roadCarsSpeedMax = 8;

    roadChance = 0.9; // 90%
}

export class MapGenerator {
    private static tileGrassSrc = '../resources/tiles/grass_tile.png';
    private static tileRoadSrc = '../resources/tiles/road_tile.png';
    private static tilePavementSrc = '../resources/tiles/pavement_tile.png';
    private context2D: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context2D = context;
    }

    private GenerateRoad(tilesHorizontal: number,
        startX: number, startY: number,
        settings: MapGeneratorOptions): Array<Tile> {
        let out = [];
        let actualX = startX;
        for (let x = 0; x < tilesHorizontal; x++) {
            //add tiles
            out.push(new Tile(actualX, startY, settings.tileWidthPx, settings.tileHeightPx, MapGenerator.tileRoadSrc));
            actualX += settings.tileWidthPx;
        }
        
        //add cars after tiles, so cars will be drawn on top of tiles, when z-index will be implemented problem will be solved
        let cars = Math.floor(Math.random() * (settings.roadCarsMax - settings.roadCarsMin + 1) + settings.roadCarsMin);
        let laneDirection = Math.random() >= 0.5 ? CarDirection.Right : CarDirection.Left; //get random lane, 50% chance for each
        let spaceBetween = this.context2D.canvas.width / cars;
        
        for (let x = 0; x < cars; x++) {
            let car = Car.RandomCar(spaceBetween * x, startY, laneDirection, settings.roadCarsSpeedMin, settings.roadCarsSpeedMax);
            out.push(car);
        }

        return out;
    }


    private GeneratePavement(tilesHorizontal: number,
        startX: number, startY: number,
        settings: MapGeneratorOptions): Array<Tile> {
        let out = [];
        let hydrants = 0;
        let actualX = startX;
        for (let x = 0; x < tilesHorizontal; x++) {
            let addHydrant: boolean = Math.random() < settings.fireHydrantChance;

            out.push(new Tile(actualX, startY, settings.tileWidthPx, settings.tileHeightPx, MapGenerator.tilePavementSrc));
            if (addHydrant && hydrants < settings.maxFireHydrants) {
                out.push(new FireHydrant(actualX, startY, settings.tileWidthPx, settings.tileHeightPx));
                hydrants++;
            }

            actualX += settings.tileWidthPx;
        }

        return out;
    }

    private GenerateGrass(tilesHorizontal: number,
        startX: number, startY: number,
        settings: MapGeneratorOptions): Array<Tile> {
        let out = [];
        let actualX = startX;
        for (let x = 0; x < tilesHorizontal; x++) {
            out.push(new Tile(actualX, startY, settings.tileWidthPx, settings.tileHeightPx, MapGenerator.tileGrassSrc));
            actualX += settings.tileWidthPx;
        }

        return out;
    }

    public GenerateMap(tilesHorizontal: number, tilesVertical: number,
        settings: MapGeneratorOptions): Array<Array<Tile>> {
        let out: Array<Array<Tile>> = [[]];

        settings.tilesHorizontal = tilesHorizontal;
        settings.tilesVertical = tilesVertical;

        if (settings.fillScreen) {
            let canvasX = this.context2D.canvas.width - settings.screenPaddingX * 2;
            let canvasY = this.context2D.canvas.height - settings.screenPaddingY * 2;

            settings.startX = settings.screenPaddingX;
            settings.startY = settings.screenPaddingY;
            settings.tileWidthPx = canvasX / settings.tilesHorizontal;
            settings.tileHeightPx = canvasY / settings.tilesVertical;
        }

        let actualX = settings.startX;
        let actualY = settings.startY;

        //top 2 tiles will be always grass
        out.push(this.GenerateGrass(tilesHorizontal, actualX, actualY, settings));
        actualY += settings.tileHeightPx;

        let wasPavement: boolean = false; //was the last row pavement?

        //generate tilesVertical - 1 - 1 road/pavement tiles, -1 cause we want the last tile to be grass as well
        for (let x = 0; x < settings.tilesVertical - 2; x++) {

            //if last row was pavement, generate road
            if (wasPavement) {
                out.push(this.GenerateRoad(tilesHorizontal, actualX, actualY, settings));
                wasPavement = false;
                actualY += settings.tileHeightPx;
                continue;
            }

            let isPavement: boolean = Math.random() < settings.pavementChance;
            if (isPavement) {
                out.push(this.GeneratePavement(tilesHorizontal, actualX, actualY, settings));
                wasPavement = true;
                actualY += settings.tileHeightPx;
                continue;
            }

            //else road has been generated
            else {
                out.push(this.GenerateRoad(tilesHorizontal, actualX, actualY, settings));
                actualY += settings.tileHeightPx;
                continue;
            }
        }

        //last row should be grass
        out.push(this.GenerateGrass(tilesHorizontal, actualX, actualY, settings));

        return out;
    }
}