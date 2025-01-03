export class SpriteAnimation {
    private frameWidth: number = 0;
    private frameHeight: number = 0;
    private startRow: number = 0;
    private startCol: number = 0;
    private frames: number = 0;
    private frameLengthMs = 0;
    private animationName: string = '';

    get Name() { return this.animationName; }
    get FrameCount() { return this.frames; }
    get StartCol() { return this.startCol; }
    get StartRow() { return this.startRow; }
    get FrameWidth() { return this.frameWidth; }
    get FrameHeight() { return this.frameHeight;}
    get FrameLength(){return this.frameLengthMs;}

    constructor(name: string, frameWidth: number, frameHeight: number,
        startRow: number, startCol: number, frameCount: number, frameLengthMs : number) {
        this.animationName = name;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.startRow = startRow;
        this.startCol = startCol;
        this.frames = frameCount;
        this.frameLengthMs = frameLengthMs;
    }


}