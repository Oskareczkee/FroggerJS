import { Collider } from "./Collider";
export class CircleCollider extends Collider {
    get Radius() { return this.radius; }
    constructor(radius, objectRef = null) {
        super(objectRef);
        this.radius = 0;
        this.radius = radius;
    }
}
