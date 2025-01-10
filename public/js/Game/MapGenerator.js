import { Tile } from "../Core/drawing/Tile";
import { Car, CarDirection } from "./Car";
import { FireHydrant } from "./FireHydrant";
export class MapGeneratorOptions {
    constructor() {
        //x coordinate of the first tile
        this.startX = 0;
        //y coordinate of the first tile
        this.startY = 0;
        //Tile width in pixels
        this.tileWidthPx = 50;
        //Tile height in pixels
        this.tileHeightPx = 50;
        //number of tiles horizontally
        this.tilesHorizontal = 20;
        //number of tiles vertically
        this.tilesVertical = 20;
        //fills screen, overrides tileWidthPx, and tileHeightPx to fit the whole screen
        this.fillScreen = false;
        //how much padding has to be added relative to the screen, works only if fillScreen is set to true
        this.screenPaddingX = 0;
        //how much padding has to be added relative to the screen, works only if fillScreen is set to true
        this.screenPaddingY = 0;
        this.pavementChance = 0.1; //10%
        this.fireHydrantChance = 0.2;
        this.maxFireHydrants = (this.tilesHorizontal / 4) * 3; //75%
        this.roadCarsMin = 2;
        this.roadCarsMax = 5;
        this.roadCarsSpeedMin = 3;
        this.roadCarsSpeedMax = 8;
        this.roadChance = 0.9; // 90%
    }
}
export class MapGenerator {
    constructor(context) {
        this.context2D = context;
    }
    GenerateRoad(tilesHorizontal, startX, startY, settings) {
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
    GeneratePavement(tilesHorizontal, startX, startY, settings) {
        let out = [];
        let hydrants = 0;
        let actualX = startX;
        for (let x = 0; x < tilesHorizontal; x++) {
            let addHydrant = Math.random() < settings.fireHydrantChance;
            out.push(new Tile(actualX, startY, settings.tileWidthPx, settings.tileHeightPx, MapGenerator.tilePavementSrc));
            if (addHydrant && hydrants < settings.maxFireHydrants) {
                out.push(new FireHydrant(actualX, startY, settings.tileWidthPx, settings.tileHeightPx));
                hydrants++;
            }
            actualX += settings.tileWidthPx;
        }
        return out;
    }
    GenerateGrass(tilesHorizontal, startX, startY, settings) {
        let out = [];
        let actualX = startX;
        for (let x = 0; x < tilesHorizontal; x++) {
            out.push(new Tile(actualX, startY, settings.tileWidthPx, settings.tileHeightPx, MapGenerator.tileGrassSrc));
            actualX += settings.tileWidthPx;
        }
        return out;
    }
    GenerateMap(tilesHorizontal, tilesVertical, settings) {
        let out = [[]];
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
        let wasPavement = false; //was the last row pavement?
        //generate tilesVertical - 1 - 1 road/pavement tiles, -1 cause we want the last tile to be grass as well
        for (let x = 0; x < settings.tilesVertical - 2; x++) {
            //if last row was pavement, generate road
            if (wasPavement) {
                out.push(this.GenerateRoad(tilesHorizontal, actualX, actualY, settings));
                wasPavement = false;
                actualY += settings.tileHeightPx;
                continue;
            }
            let isPavement = Math.random() < settings.pavementChance;
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
MapGenerator.tileGrassSrc = '../resources/tiles/grass_tile.png';
MapGenerator.tileRoadSrc = '../resources/tiles/road_tile.png';
MapGenerator.tilePavementSrc = '../resources/tiles/pavement_tile.png';
