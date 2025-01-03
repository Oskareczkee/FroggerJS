import { GameObject } from "../GameObject";
export class ImageObject extends GameObject {
    constructor(posX = 0, posY = 0, width = 0, height = 0, imageSrc) {
        super(posX, posY, width, height);
        this.imageSrc = '';
        this.imageSrc = imageSrc;
        this.img = new Image(this.width, this.height);
        this.img.style.imageRendering = 'pixelated'; /*when image is small it gets blurry, this repairs it*/
        this.img.src = this.imageSrc;
    }
    draw(Context2D) {
        Context2D.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
}
