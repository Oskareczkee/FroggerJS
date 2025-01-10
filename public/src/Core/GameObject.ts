import { Component } from "./Component";

export abstract class GameObject {
    public posX: number;
    public posY: number;

    //position in previous frame, usefull for collisions
    public prevPosX : number;
    public prevPosY : number;

    public width: number;
    public height: number;

    public components : Array<Component>;
    public name : string = ''

    protected canvas2D : CanvasRenderingContext2D | null;

    get Canvas(){return this.canvas2D;}
    set Canvas(canvas){this.canvas2D = canvas;}

    constructor(posX: number = 0, posY: number = 0, width: number = 0, height: number = 0, name : string='') {
        this.canvas2D = null; /*i don't want to deal with null values, just create temp context here and set it using set*/
        this.name = name;

        this.posX = posX;
        this.posY = posY;
        this.prevPosX = posX;
        this.prevPosY = posY;
        this.width = width;
        this.height = height;
        this.components = [];
    }

    public addComponent(component : Component){
        component.ObjectRef = this;
        this.components.push(component);
    }
}