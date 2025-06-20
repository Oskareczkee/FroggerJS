export class SpriteAnimation {
    constructor(name, frameWidth, frameHeight, startRow, startCol, frameCount, frameLengthMs) {
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.startRow = 0;
        this.startCol = 0;
        this.frames = 0;
        this.frameLengthMs = 0;
        this.animationName = '';
        this.animationName = name;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.startRow = startRow;
        this.startCol = startCol;
        this.frames = frameCount;
        this.frameLengthMs = frameLengthMs;
    }
    get Name() { return this.animationName; }
    get FrameCount() { return this.frames; }
    get StartCol() { return this.startCol; }
    get StartRow() { return this.startRow; }
    get FrameWidth() { return this.frameWidth; }
    get FrameHeight() { return this.frameHeight; }
    get FrameLength() { return this.frameLengthMs; }
}
