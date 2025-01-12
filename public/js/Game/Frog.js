import { CircleCollider } from "../Core/collisions/CircleCollider";
import { SpriteAnimation } from "../Core/drawing/SpriteAnimation";
import { SpriteObject } from "../Core/drawing/SpriteObject";
import { Input } from "./Input";
import { Audio as GameAudio } from "./Audio";
import { Car } from "./Car";
export const frogImageSrc = "../resources/sprites/frog.png";
export const frogSpritesSrc = "../resources/sprites/frog-sprites.png";
export class Frog extends SpriteObject {
    get Lives() { return this.lives; }
    get Score() { return this.score; }
    get Level() { return this.level; }
    resetPosition() {
        var _a, _b;
        if (!this.Canvas)
            return; //stop typescript crying
        this.posX = ((_a = this.Canvas) === null || _a === void 0 ? void 0 : _a.canvas.width) / 2 - 16;
        this.posY = ((_b = this.Canvas) === null || _b === void 0 ? void 0 : _b.canvas.height) - 32;
    }
    FrogOnCollision(collider, other) {
        if (other.ObjectRef instanceof Car) {
            GameAudio.play("sound_frog_death");
            let obj = collider.ObjectRef;
            obj.lives--;
            obj.FrogOnLivesChange();
        }
    }
    FrogOnLevelChange() {
        if (this.levelElement === null)
            return;
        this.levelElement.textContent = this.level.toString();
    }
    FrogOnScoreChange() {
        if (this.scoreElement === null)
            return;
        this.scoreElement.textContent = this.score.toString();
    }
    FrogOnLivesChange() {
        if (this.livesElement === null)
            return;
        this.livesElement.textContent = this.lives.toString();
    }
    updateElements() {
        this.FrogOnLevelChange();
        this.FrogOnLivesChange();
        this.FrogOnScoreChange();
    }
    addElements(livesElement, scoreElement, levelElement) {
        this.livesElement = livesElement;
        this.scoreElement = scoreElement;
        this.levelElement = levelElement;
    }
    constructor(posX, posY, width, height) {
        super(posX, posY, width, height, frogSpritesSrc, 30, 30);
        this.lives = 3;
        this.score = 0;
        this.level = 1; //consider keeping level somewhere else
        this.livesElement = null;
        this.scoreElement = null;
        this.levelElement = null;
        let frameLength = 200;
        //add animations
        this.addAnimation(new SpriteAnimation("MoveDown", 30, 30, 0, 0, 3, frameLength));
        this.addAnimation(new SpriteAnimation("MoveLeft", 30, 30, 1, 0, 3, frameLength));
        this.addAnimation(new SpriteAnimation("MoveRight", 30, 30, 2, 0, 3, frameLength));
        this.addAnimation(new SpriteAnimation("MoveUp", 30, 30, 3, 0, 3, frameLength));
        this.SetIdleFrame(0, 0, 30, 30);
        this.collider = new CircleCollider(10, this);
        this.collider.OnCollision = this.FrogOnCollision; //make frog dynamic object
        this.addComponent(this.collider);
        GameAudio.addIfNotExists("../resources/audio/jump.mp3", 0.5, false, "sound_frog_jump", true);
        GameAudio.addIfNotExists("../resources/audio/death.mp3", 0.5, false, "sound_frog_death", true);
    }
    moveUp() {
        this.fireAnimation("MoveUp");
        this.SetIdleFrame(3, 0, 30, 30);
        this.posY -= 5;
        GameAudio.play("sound_frog_jump");
    }
    moveDown() {
        this.fireAnimation("MoveDown");
        this.SetIdleFrame(0, 0, 30, 30);
        this.posY += 5;
        GameAudio.play("sound_frog_jump");
    }
    moveLeft() {
        this.fireAnimation("MoveLeft");
        this.SetIdleFrame(1, 1, 30, 30);
        this.posX -= 5;
        GameAudio.play("sound_frog_jump");
    }
    moveRight() {
        this.fireAnimation("MoveRight");
        this.SetIdleFrame(2, 1, 30, 30);
        this.posX += 5;
        GameAudio.play("sound_frog_jump");
    }
    update() {
        if (this.Canvas === null)
            throw new Error("Frog: Object canvas reference is not set");
        this.prevPosX = this.posX;
        this.prevPosY = this.posY;
        if (Input.isKeyPressed('w'))
            this.moveUp();
        if (Input.isKeyPressed('a'))
            this.moveLeft();
        if (Input.isKeyPressed('s'))
            this.moveDown();
        if (Input.isKeyPressed('d'))
            this.moveRight();
        //do not let frog go out of bound, +10 gives better effect
        if (this.posX >= (this.Canvas.canvas.width - this.width + 10) || this.posX < 0 || this.posY >= (this.Canvas.canvas.height - this.height + 10) || this.posY < 0) {
            this.posX = this.prevPosX;
            this.posY = this.prevPosY;
        }
        //check if frog reached level end, posX in our case does not matter
        if (this.posY <= 0 + 20) {
            this.resetPosition();
            this.score += 100 * this.level;
            this.level++;
            this.lives += 3;
            this.updateElements();
        }
        if (this.lives < 0) {
            this.score = 0;
            this.level = 1;
            this.lives = 3;
            this.updateElements();
        }
    }
}
