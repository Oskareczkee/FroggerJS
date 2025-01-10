export class GameObject {
    get Canvas() { return this.canvas2D; }
    set Canvas(canvas) { this.canvas2D = canvas; }
    constructor(posX = 0, posY = 0, width = 0, height = 0, name = '') {
        this.name = '';
        this.canvas2D = null; /*i don't want to deal with null values, just create temp context here and set it using set*/
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.prevPosX = posX;
        this.prevPosY = posY;
        this.width = width;
        this.height = height;
        this.components = [];
    }
    addComponent(component) {
        component.ObjectRef = this;
        this.components.push(component);
    }
}
