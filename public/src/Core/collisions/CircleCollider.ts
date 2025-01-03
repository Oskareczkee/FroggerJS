import { Component } from "../Component";
import { GameObject } from "../GameObject";
import { Collider } from "./Collider";

export class CircleCollider extends Collider{
    private radius = 0;

    get Radius(){return this.radius;}

    constructor(radius : number, objectRef : GameObject | null = null){
        super(objectRef);
        this.radius = radius;
    }
}