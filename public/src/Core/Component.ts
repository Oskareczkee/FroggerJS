import { GameObject } from "./GameObject";

export abstract class Component {
    private objectRef: GameObject | null;

    private offsetX: number = 0;
    private offsetY: number = 0;

    constructor(objectRef: GameObject | null) {
        this.objectRef = objectRef;

        //set default offset of component to be on the middle of the object
        if(objectRef!==null){
            this.offsetX = objectRef.width/2;
            this.offsetY = objectRef.height/2;
        }
    }

    get ObjectRef(): GameObject | null { return this.objectRef; }
    set ObjectRef(obj: GameObject) { this.objectRef = obj; }
    get OffsetX(){return this.offsetX;}
    get OffsetY(){return this.offsetY;}

    public SetOffset(x: number, y: number) {
        this.offsetX = x;
        this.offsetY = y;
    }
}