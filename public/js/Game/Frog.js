import { CircleCollider } from "../Core/collisions/CircleCollider";
import { SpriteAnimation } from "../Core/drawing/SpriteAnimation";
import { SpriteObject } from "../Core/drawing/SpriteObject";
import { Input } from "./Input";
export const frogImageSrc = "../resources/sprites/frog.png";
export const frogSpritesSrc = "../resources/sprites/frog-sprites.png";
export class Frog extends SpriteObject {
    FrogOnCollision(other) { }
    constructor() {
        super(0, 0, 32, 32, frogSpritesSrc, 30, 30);
        let frameLength = 200;
        //add animations
        this.addAnimation(new SpriteAnimation("MoveDown", 30, 30, 0, 0, 3, frameLength));
        this.addAnimation(new SpriteAnimation("MoveLeft", 30, 30, 1, 0, 3, frameLength));
        this.addAnimation(new SpriteAnimation("MoveRight", 30, 30, 2, 0, 3, frameLength));
        this.addAnimation(new SpriteAnimation("MoveUp", 30, 30, 3, 0, 3, frameLength));
        this.SetIdleFrame(0, 0, 30, 30);
        this.collider = new CircleCollider(10, this);
        this.collider.OnCollision = this.FrogOnCollision;
        this.addComponent(this.collider);
    }
    update() {
        this.prevPosX = this.posX;
        this.prevPosY = this.posY;
        if (Input.isKeyPressed('w')) {
            this.fireAnimation("MoveUp");
            this.SetIdleFrame(3, 0, 30, 30);
            this.posY -= 5;
        }
        if (Input.isKeyPressed('a')) {
            this.fireAnimation("MoveLeft");
            this.SetIdleFrame(1, 1, 30, 30);
            this.posX -= 5;
        }
        if (Input.isKeyPressed('s')) {
            this.fireAnimation("MoveDown");
            this.SetIdleFrame(0, 0, 30, 30);
            this.posY += 5;
        }
        if (Input.isKeyPressed('d')) {
            this.fireAnimation("MoveRight");
            this.SetIdleFrame(2, 1, 30, 30);
            this.posX += 5;
        }
    }
}
