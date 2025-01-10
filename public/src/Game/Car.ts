import { CircleCollider } from "../Core/collisions/CircleCollider";
import { Collider } from "../Core/collisions/Collider";
import { ImageObject } from "../Core/drawing/ImageObject";
import Updatable from "../Core/interfaces/Updatable";
import { Frog } from "./Frog";


//do not change order of these values, they are used to get random car sprite based on direction
export enum CarType {
    StandardLeft = '../resources/sprites/car_left.png',
    ClassicLeft = '../resources/sprites/car_classic_left.png',
    SportLeft = '../resources/sprites/car_sport_left.png',
    StandardRight = '../resources/sprites/car_right.png',
    ClassicRight = '../resources/sprites/car_classic_right.png',
    SportRight = '../resources/sprites/car_sport_right.png'
}

export enum CarDirection {
    Right = 1,
    Left = -1
}

export class Car extends ImageObject implements Updatable {
    private direction: CarDirection = CarDirection.Right; /* 1 is right, -1 is left*/
    private speed: number = 0;
    private collider: CircleCollider;
    private CarOnCollided(collider : Collider, other: Collider) {
        let canvas = other.ObjectRef?.Canvas ?? null; //idk why for some reason this has canvas undefined at this point
        if(canvas===null) return;

        if (other.ObjectRef instanceof Frog) {
            other.ObjectRef.posX = canvas.canvas.width/2 - other.ObjectRef.width/2;
            other.ObjectRef.posY = canvas.canvas.height - other.ObjectRef.height;
        }
    }

    constructor(posX: number, posY: number, speed: number, direction : CarDirection, type: CarType) {
        super(posX, posX, 32, 32, type);
        this.direction = direction;
        this.speed = speed;
        this.posX = posX;
        this.posY = posY;

        this.collider = new CircleCollider(16, this);
        this.collider.OnCollided = this.CarOnCollided;
        this.addComponent(this.collider);
    }

    update(): void {
        if(this.Canvas === null) throw new Error("Car: Object canvas reference is not set");

        this.posX += this.speed * this.direction;

        //basically, when car goes out of bound teleport it to the beginning of the lane
        if (this.direction === -1 && this.posX <= 0 - this.width - 10)
            this.posX = this.Canvas.canvas.width + this.width + 10;

        else if (this.direction === 1 && this.posX >= this.Canvas.canvas.width + this.width + 10)
            this.posX = 0 - this.width - 10;
    }

    private static getRandomSprite(direction: number): CarType {
        if (direction === CarDirection.Left) { //left direction is first in enum
            let index = Math.floor(Math.random() * Object.keys(CarType).length / 2);
            return Object.values(CarType)[index];
        }
        else {
            let index = Math.floor(Math.random() * Object.keys(CarType).length / 2);
            return Object.values(CarType)[Object.keys(CarType).length / 2 + index]; //-1 cause zero-indexing
        }
    }

    static RandomCar(posX: number, posY: number,
        direction: CarDirection, minSpeed: number, maxSpeed: number): Car {
        let sprite = Car.getRandomSprite(direction);
        let speed = Math.random() * (maxSpeed - minSpeed + 1) + minSpeed; //+1 to make values inclusive
        return new Car(posX,posY,speed,direction,sprite);
    }
}