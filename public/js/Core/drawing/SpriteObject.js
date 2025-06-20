import { GameObject } from "../GameObject";
export class SpriteObject extends GameObject {
    constructor(posX = 0, posY = 0, width = 0, height = 0, sheetSrc, frameWidth, frameHeight) {
        super(posX, posY, width, height);
        this.sheetSrc = '';
        this.frameWidth = 0;
        this.frameHeight = 0;
        //idle frame will be cropped from actual sprite sheet
        this.idleFrameCol = 0;
        this.idleFrameRow = 0;
        this.idleFrameWidth = 0;
        this.idleFrameHeight = 0;
        this.animations = {};
        this.currentAnimation = null;
        this.isPlaying = false;
        this.currentFrame = 0;
        this.lastFrameTime = 0; //when was last frame played?
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.sheetSrc = sheetSrc;
        this.sheetImg = new Image();
        this.sheetImg.src = sheetSrc;
        this.sheetImg.style.imageRendering = 'pixelated';
    }
    get IsPlaying() { return this.isPlaying; }
    get CurrentAnimation() { return this.currentAnimation; }
    SetIdleFrame(row, col, frameWidth, frameHeight) {
        //cannot use just set, because it requires only one argument, this solves everything
        this.idleFrameCol = col;
        this.idleFrameRow = row;
        this.idleFrameWidth = frameWidth;
        this.idleFrameHeight = frameHeight;
    }
    addAnimation(animation) {
        this.animations[animation.Name] = animation;
    }
    fireAnimation(animationName) {
        var _a;
        if (this.isPlaying)
            return;
        this.currentAnimation = (_a = this.animations[animationName]) !== null && _a !== void 0 ? _a : null;
        this.isPlaying = true;
    }
    forceAnimation(animationName) {
        var _a;
        this.stopCurrentAnimation(); //this also resets frame counter
        this.currentAnimation = (_a = this.animations[animationName]) !== null && _a !== void 0 ? _a : null;
        this.isPlaying = true;
    }
    stopCurrentAnimation() {
        if (!this.isPlaying)
            return;
        this.currentAnimation = null;
        this.isPlaying = false;
        this.currentFrame = 0;
    }
    draw(Context2D) {
        var _a;
        //if nothing is playing right now, play idle animation
        if (!this.isPlaying || this.currentAnimation === null) {
            let startX = this.idleFrameCol * this.idleFrameWidth;
            let startY = this.idleFrameRow * this.idleFrameHeight;
            Context2D.drawImage(this.sheetImg, startX, startY, this.idleFrameWidth, this.idleFrameHeight, this.posX, this.posY, this.idleFrameWidth, this.idleFrameHeight);
            return;
        }
        //stop animation if all frames have been played
        if (this.currentFrame >= ((_a = this.currentAnimation) === null || _a === void 0 ? void 0 : _a.FrameCount) - 1) {
            this.stopCurrentAnimation();
            return;
        }
        let startX = this.currentAnimation.StartCol * this.currentAnimation.FrameWidth
            + this.currentFrame * this.currentAnimation.FrameWidth;
        let startY = this.currentAnimation.StartRow * this.currentAnimation.FrameHeight;
        Context2D.drawImage(this.sheetImg, startX, startY, this.frameWidth, this.frameHeight, this.posX, this.posY, this.frameWidth, this.frameHeight);
        let actualTime = new Date().getTime();
        let timeDelta = actualTime - this.lastFrameTime;
        if (timeDelta >= this.currentAnimation.FrameLength) { //is it time to play next frame? If so, change frame
            this.currentFrame++;
            this.lastFrameTime = actualTime;
            return;
        }
    }
}
