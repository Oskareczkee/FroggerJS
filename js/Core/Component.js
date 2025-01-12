export class Component {
    constructor(objectRef) {
        this.offsetX = 0;
        this.offsetY = 0;
        this.objectRef = objectRef;
        //set default offset of component to be on the middle of the object
        if (objectRef !== null) {
            this.offsetX = objectRef.width / 2;
            this.offsetY = objectRef.height / 2;
        }
    }
    get ObjectRef() { return this.objectRef; }
    set ObjectRef(obj) { this.objectRef = obj; }
    get OffsetX() { return this.offsetX; }
    get OffsetY() { return this.offsetY; }
    SetOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
    }
}
