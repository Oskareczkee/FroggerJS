import { GameObject } from "../GameObject";
import type { Drawable } from "../interfaces/Drawable";

export class ImageObject extends GameObject implements Drawable {
    protected imageSrc = '';
    protected img: HTMLImageElement;

    constructor(posX: number = 0, posY: number = 0, width: number = 0, height: number = 0, imageSrc: string) {
        super(posX, posY, width, height);
        this.imageSrc = imageSrc;

        this.img = new Image(this.width, this.height);
        this.img.style.imageRendering = 'pixelated'; /*when image is small it gets blurry, this repairs it*/
        this.img.src = this.imageSrc;
    }

    draw(Context2D: CanvasRenderingContext2D): void {
        Context2D.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
}

type Tile = ImageObject; //tile is pretty much the same thing as image object, add alias to it