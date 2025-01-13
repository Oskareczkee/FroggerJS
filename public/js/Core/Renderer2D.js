export class Renderer2D {
    get Context() { return this.renderingContext2D; }
    constructor(context2D) {
        this.fillColor = 'black';
        this.renderingContext2D = context2D;
        this.objects = [];
        this.backgroundObjects = [];
    }
    addObject(obj) {
        this.objects.push(obj);
    }
    addObjects(obj) {
        this.objects.push(...obj);
    }
    addBackgroundObject(obj) {
        this.backgroundObjects.push(obj);
    }
    addBackgroundObjects(obj) {
        this.backgroundObjects.push(...obj);
    }
    removeObject(obj) {
        let index = this.objects.indexOf(obj);
        if (index !== -1)
            this.objects.splice(index, 1);
    }
    drawObjects() {
        this.renderingContext2D.fillStyle = this.fillColor;
        /*this gets canvas width and height every frame, make on resize event that will change those only once*/
        let canvasWidth = this.renderingContext2D.canvas.width;
        let canvasHeight = this.renderingContext2D.canvas.height;
        this.renderingContext2D.fillRect(0, 0, canvasWidth, canvasHeight);
        //draw background objects first
        this.backgroundObjects.forEach(element => {
            element.draw(this.renderingContext2D);
        });
        this.objects.forEach(element => {
            element.draw(this.renderingContext2D);
        });
    }
}
