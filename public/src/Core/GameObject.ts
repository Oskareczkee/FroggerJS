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

    constructor(posX: number = 0, posY: number = 0, width: number = 0, height: number = 0) {
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