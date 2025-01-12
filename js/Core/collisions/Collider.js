import { Component } from "../Component";
import { CircleCollider } from "./CircleCollider";
import { CircleCircleCollison } from "./Collisions";
export class Collider extends Component {
    constructor() {
        super(...arguments);
        this.OnCollision = null;
        this.OnCollided = null;
    }
    Collided(other) {
        if (this instanceof CircleCollider && other instanceof CircleCollider)
            return CircleCircleCollison(this, other);
        return false;
    }
}
