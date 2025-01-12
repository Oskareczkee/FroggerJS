import { CircleCollider } from "../Core/collisions/CircleCollider";
import { OnCollidedBlock } from "../Core/collisions/Collisions";
import { ImageObject } from "../Core/drawing/ImageObject";
export const fireHydrantImageSrc = "../resources/sprites/fire-hydrant.png";
export class FireHydrant extends ImageObject {
    constructor(posX, posY, width, height) {
        super(posX, posY, width, height, fireHydrantImageSrc);
        this.collider = new CircleCollider(10, this);
        this.collider.OnCollided = OnCollidedBlock;
        this.components.push(this.collider);
    }
}
