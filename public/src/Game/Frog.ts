import { CircleCollider } from "../Core/collisions/CircleCollider";
import { Collider } from "../Core/collisions/Collider";
import { SpriteAnimation } from "../Core/drawing/SpriteAnimation";
import { SpriteObject } from "../Core/drawing/SpriteObject";
import { Updatable } from "../Core/interfaces/Updatable";
import { Input } from "./Input";
import { Audio as GameAudio } from "./Audio";
import { Car } from "./Car";
import { MapGenerator, MapGeneratorOptions } from "./MapGenerator";
import { Options } from "./Options";
import { FroggerMapGeneratorOptions } from "./MapGeneratorOptionsConf";

export const frogImageSrc = "../resources/sprites/frog.png";
export const frogSpritesSrc = "../resources/sprites/frog-sprites.png";

export class Frog extends SpriteObject implements Updatable {
    private collider: CircleCollider;

    private lives: number = 3;
    private score: number = 0;
    private level: number = 1; //consider keeping level somewhere else
    private readonly saveScoreBackend: string = "/FroggerJS/php/api/save_score.php";

    private livesElement: HTMLElement | null = null;
    private scoreElement: HTMLElement | null = null;
    private levelElement: HTMLElement | null = null;

    private generatorOptions: MapGeneratorOptions = FroggerMapGeneratorOptions; //adjust difficulty on each level

    get Lives() { return this.lives; }
    get Score() { return this.score; }
    get Level() { return this.level; }

    private resetPosition() {
        if (!this.Canvas) return; //stop typescript crying

        this.posX = this.Canvas?.canvas.width / 2 - 16;
        this.posY = this.Canvas?.canvas.height - 32;
    }

    private FrogOnCollision(collider: Collider, other: Collider) {
        if (other.ObjectRef instanceof Car) {
            GameAudio.play("sound_frog_death");
            let obj = collider.ObjectRef as Frog;
            obj.lives--;
            obj.FrogOnLivesChange();
        }
    }

    private FrogOnLevelChange() {
        if (this.levelElement === null) return;
        this.levelElement.textContent = this.level.toString();
    }

    private FrogOnScoreChange() {
        if (this.scoreElement === null) return;
        this.scoreElement.textContent = this.score.toString();
    }

    private FrogOnLivesChange() {
        if (this.livesElement === null) return;
        this.livesElement.textContent = this.lives.toString();
    }

    /**Event fired when game is over, currently it is sending score to the backend for save*/
    private async FrogOnGameOver() {
        if (this.scoreElement === null) return;

        try {
            const response = await fetch(this.saveScoreBackend, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ "score": this.Score.toFixed() })
            });

            const data = await response.json();
            if (data.status === 'success')
                console.log('Score saved successfully');
            else
                console.error('Failed to save score:', data.message);
        }
        catch (error) {
            console.error('Error during API request:', error);
        }
    }

    public updateElements() {
        this.FrogOnLevelChange();
        this.FrogOnLivesChange();
        this.FrogOnScoreChange();
    }

    public addElements(livesElement: HTMLElement | null, scoreElement: HTMLElement | null, levelElement: HTMLElement | null) {
        this.livesElement = livesElement;
        this.scoreElement = scoreElement;
        this.levelElement = levelElement;
    }

    constructor(posX: number, posY: number, width: number, height: number) {
        super(posX, posY, width, height, frogSpritesSrc, 30, 30);

        this.name = "Frog";
        let frameLength = 200;
        //add animations
        this.addAnimation(new SpriteAnimation("MoveDown", 30, 30, 0, 0, 3, frameLength));
        this.addAnimation(new SpriteAnimation("MoveLeft", 30, 30, 1, 0, 3, frameLength));
        this.addAnimation(new SpriteAnimation("MoveRight", 30, 30, 2, 0, 3, frameLength));
        this.addAnimation(new SpriteAnimation("MoveUp", 30, 30, 3, 0, 3, frameLength));

        this.SetIdleFrame(0, 0, 30, 30);

        this.collider = new CircleCollider(10, this);
        this.collider.OnCollision = this.FrogOnCollision;  //make frog dynamic object
        this.addComponent(this.collider);

        GameAudio.addIfNotExists("../resources/audio/jump.mp3", 0.5, false, "sound_frog_jump", true);
        GameAudio.addIfNotExists("../resources/audio/death.mp3", 0.5, false, "sound_frog_death", true);
        GameAudio.addIfNotExists("../resources/audio/gameover.mp3", 1.0, false, "sound_game_over", true);
    }

    private moveUp() {
        this.fireAnimation("MoveUp");
        this.SetIdleFrame(3, 0, 30, 30);
        this.posY -= 5;
        GameAudio.play("sound_frog_jump");
    }

    private moveDown() {
        this.fireAnimation("MoveDown");
        this.SetIdleFrame(0, 0, 30, 30);
        this.posY += 5;
        GameAudio.play("sound_frog_jump");
    }

    private moveLeft() {
        this.fireAnimation("MoveLeft");
        this.SetIdleFrame(1, 1, 30, 30);
        this.posX -= 5;
        GameAudio.play("sound_frog_jump");
    }

    private moveRight() {
        this.fireAnimation("MoveRight");
        this.SetIdleFrame(2, 1, 30, 30);
        this.posX += 5;
        GameAudio.play("sound_frog_jump");
    }

    private adjustGameDifficulty() {
        //adjust difficulty for the next level
        if (this.generatorOptions.roadCarsSpeedMin < 5)
            this.generatorOptions.roadCarsSpeedMin++;
        if (this.generatorOptions.roadCarsSpeedMax < 10)
            this.generatorOptions.roadCarsSpeedMax++;
        if (this.generatorOptions.pavementChance < 0.5) {
            this.generatorOptions.pavementChance += 0.05;
            this.generatorOptions.roadChance -= 0.05;
        }
        if (this.generatorOptions.fireHydrantChance < 0.4)
            this.generatorOptions.fireHydrantChance += 0.02;
    }

    update(): void {
        if (this.Canvas === null) throw new Error("Frog: Object canvas reference is not set");

        this.prevPosX = this.posX;
        this.prevPosY = this.posY;

        if (Input.isKeyPressed('w')) this.moveUp();
        if (Input.isKeyPressed('a')) this.moveLeft();
        if (Input.isKeyPressed('s')) this.moveDown();
        if (Input.isKeyPressed('d')) this.moveRight();

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

            this.adjustGameDifficulty();
            if (this.canvas2D === null) return; //stop typescript crying      
            this.Scene?.clearScene();
            this.Scene?.addMap(new MapGenerator(this.canvas2D).GenerateMap(this.canvas2D.canvas.width / Options.TileWidth, this.canvas2D.canvas.height / Options.TileHeigth, this.generatorOptions));
            //z-index is not supported, so order matters
            this.Scene?.addObject(this);
        }

        if (this.lives < 0) { //Game over
            this.FrogOnGameOver(); //send request to the backend to save score


            this.score = 0;
            this.level = 1;
            this.lives = 3;
            this.updateElements();

            GameAudio.play("sound_game_over");

            if (this.canvas2D === null) return; //stop typescript crying      
            this.Scene?.clearScene();
            //use default generator for new game!
            this.Scene?.addMap(new MapGenerator(this.canvas2D).GenerateMap(this.canvas2D.canvas.width / Options.TileWidth, this.canvas2D.canvas.height / Options.TileHeigth, FroggerMapGeneratorOptions));
            //z-index is not supported, so order matters
            this.Scene?.addObject(this);
        }

    }
}