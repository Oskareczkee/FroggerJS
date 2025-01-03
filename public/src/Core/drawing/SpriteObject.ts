import { GameObject } from "../GameObject";
import { Drawable } from "../interfaces/Drawable";
import { SpriteAnimation } from "./SpriteAnimation";

export class SpriteObject extends GameObject implements Drawable {
    private sheetSrc: string = '';
    private sheetImg: HTMLImageElement;
    private frameWidth: number = 0;
    private frameHeight: number = 0;

    //idle frame will be cropped from actual sprite sheet
    private idleFrameCol: number = 0;
    private idleFrameRow: number = 0;
    private idleFrameWidth: number = 0;
    private idleFrameHeight: number = 0;

    private animations: { [key: string]: SpriteAnimation } = {}
    private currentAnimation: SpriteAnimation | null = null;
    private isPlaying: boolean = false;
    private currentFrame: number = 0;
    private lastFrameTime : number = 0; //when was last frame played?


    get IsPlaying(): boolean { return this.isPlaying; }
    get CurrentAnimation(): SpriteAnimation | null { return this.currentAnimation; }


    public SetIdleFrame(row: number, col: number, frameWidth: number, frameHeight: number) {
        //cannot use just set, because it requires only one argument, this solves everything
        this.idleFrameCol = col;
        this.idleFrameRow = row;
        this.idleFrameWidth = frameWidth;
        this.idleFrameHeight = frameHeight;
    }

    constructor(posX: number = 0, posY: number = 0, width: number = 0, height: number = 0,
        sheetSrc: string, frameWidth: number, frameHeight: number) {
        super(posX, posY, width, height);
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.sheetSrc = sheetSrc;
        this.sheetImg = new Image();
        this.sheetImg.src = sheetSrc;
        this.sheetImg.style.imageRendering = 'pixelated';
    }

    public addAnimation(animation: SpriteAnimation) {
        this.animations[animation.Name] = animation;
    }

    public fireAnimation(animationName: string) {
        if (this.isPlaying) return;

        this.currentAnimation = this.animations[animationName] ?? null;
        this.isPlaying = true;
    }

    public forceAnimation(animationName: string) {
        this.stopCurrentAnimation(); //this also resets frame counter
        this.currentAnimation = this.animations[animationName] ?? null;
        this.isPlaying = true;
    }

    public stopCurrentAnimation() {
        if (!this.isPlaying) return;

        this.currentAnimation = null;
        this.isPlaying = false;
        this.currentFrame = 0;
    }


    draw(Context2D: CanvasRenderingContext2D): void {
        //if nothing is playing right now, play idle animation
        if (!this.isPlaying || this.currentAnimation === null) {
            let startX = this.idleFrameCol * this.idleFrameWidth;
            let startY = this.idleFrameRow * this.idleFrameHeight;

            Context2D.drawImage(this.sheetImg, startX, startY,
                this.idleFrameWidth, this.idleFrameHeight,
                this.posX, this.posY,
                this.idleFrameWidth, this.idleFrameHeight);
                return;
        }

        //stop animation if all frames have been played
        if (this.currentFrame >= this.currentAnimation?.FrameCount - 1){
            this.stopCurrentAnimation();
            return;
        }

        
        let startX = this.currentAnimation.StartCol * this.currentAnimation.FrameWidth
                    + this.currentFrame * this.currentAnimation.FrameWidth;
        let startY = this.currentAnimation.StartRow * this.currentAnimation.FrameHeight;
        
        Context2D.drawImage(this.sheetImg, startX, startY,
            this.frameWidth, this.frameHeight,
            this.posX, this.posY,
            this.frameWidth, this.frameHeight);
            
        let actualTime = new Date().getTime();
        let timeDelta = actualTime - this.lastFrameTime;

        if(timeDelta >= this.currentAnimation.FrameLength){  //is it time to play next frame? If so, change frame
            this.currentFrame++;
            this.lastFrameTime = actualTime;
            return;
        }
    }
}   