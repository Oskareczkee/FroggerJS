import { CircleCollider } from "../Core/collisions/CircleCollider";
import { ImageObject } from "../Core/drawing/ImageObject";
import { Frog } from "./Frog";
//do not change order of these values, they are used to get random car sprite based on direction
export var CarType;
(function (CarType) {
    CarType["StandardLeft"] = "../resources/sprites/car_left.png";
    CarType["ClassicLeft"] = "../resources/sprites/car_classic_left.png";
    CarType["SportLeft"] = "../resources/sprites/car_sport_left.png";
    CarType["StandardRight"] = "../resources/sprites/car_right.png";
    CarType["ClassicRight"] = "../resources/sprites/car_classic_right.png";
    CarType["SportRight"] = "../resources/sprites/car_sport_right.png";
})(CarType || (CarType = {}));
export var CarDirection;
(function (CarDirection) {
    CarDirection[CarDirection["Right"] = 1] = "Right";
    CarDirection[CarDirection["Left"] = -1] = "Left";
})(CarDirection || (CarDirection = {}));
export class Car extends ImageObject {
    CarOnCollided(collider, other) {
        var _a, _b;
        let canvas = (_b = (_a = other.ObjectRef) === null || _a === void 0 ? void 0 : _a.Canvas) !== null && _b !== void 0 ? _b : null; //idk why for some reason this has canvas undefined at this point
        if (canvas === null)
            return;
        if (other.ObjectRef instanceof Frog) {
            other.ObjectRef.posX = canvas.canvas.width / 2 - other.ObjectRef.width / 2;
            other.ObjectRef.posY = canvas.canvas.height - other.ObjectRef.height;
        }
    }
    constructor(posX, posY, speed, direction, type) {
        super(posX, posX, 32, 32, type);
        this.direction = CarDirection.Right; /* 1 is right, -1 is left*/
        this.speed = 0;
        this.direction = direction;
        this.speed = speed;
        this.posX = posX;
        this.posY = posY;
        this.collider = new CircleCollider(16, this);
        this.collider.OnCollided = this.CarOnCollided;
        this.addComponent(this.collider);
    }
    update() {
        if (this.Canvas === null)
            throw new Error("Car: Object canvas reference is not set");
        this.posX += this.speed * this.direction;
        //basically, when car goes out of bound teleport it to the beginning of the lane
        if (this.direction === -1 && this.posX <= 0 - this.width - 10)
            this.posX = this.Canvas.canvas.width + this.width + 10;
        else if (this.direction === 1 && this.posX >= this.Canvas.canvas.width + this.width + 10)
            this.posX = 0 - this.width - 10;
    }
    static getRandomSprite(direction) {
        if (direction === CarDirection.Left) { //left direction is first in enum
            let index = Math.floor(Math.random() * Object.keys(CarType).length / 2);
            return Object.values(CarType)[index];
        }
        else {
            let index = Math.floor(Math.random() * Object.keys(CarType).length / 2);
            return Object.values(CarType)[Object.keys(CarType).length / 2 + index]; //-1 cause zero-indexing
        }
    }
    static RandomCar(posX, posY, direction, minSpeed, maxSpeed) {
        let sprite = Car.getRandomSprite(direction);
        let speed = Math.random() * (maxSpeed - minSpeed + 1) + minSpeed; //+1 to make values inclusive
        return new Car(posX, posY, speed, direction, sprite);
    }
}
