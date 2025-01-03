export class GameObject {
    constructor(posX = 0, posY = 0, width = 0, height = 0) {
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
