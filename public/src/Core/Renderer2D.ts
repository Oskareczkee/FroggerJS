import type { Drawable } from "./interfaces/Drawable";

export class Renderer2D{
    private objects : Array<Drawable>;
    private renderingContext2D : CanvasRenderingContext2D;
    public fillColor : string = 'black';

    constructor(context2D : CanvasRenderingContext2D){
        this.renderingContext2D = context2D;
        
        this.objects = [];
    }

    public addObject(obj : Drawable) : void {
        this.objects.push(obj);
    }

    public removeObject(obj : Drawable) : void {
        let index = this.objects.indexOf(obj);
        if(index!==-1) this.objects.splice(index,1);
    }

    public drawObjects(){
        this.renderingContext2D.fillStyle = this.fillColor;

        /*this gets canvas width and height every frame, make on resize event that will change those only once*/
        let canvasWidth = this.renderingContext2D.canvas.width;
        let canvasHeight = this.renderingContext2D.canvas.height;

        this.renderingContext2D.fillRect(0,0,canvasWidth,canvasHeight);
        this.objects.forEach(element => {
            element.draw(this.renderingContext2D);
        });
    }
}