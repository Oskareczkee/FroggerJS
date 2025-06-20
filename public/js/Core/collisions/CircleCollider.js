import { Collider } from "./Collider";
export class CircleCollider extends Collider {
    constructor(radius, objectRef = null) {
        super(objectRef);
        this.radius = 0;
        this.radius = radius;
    }
    get Radius() { return this.radius; }
}
