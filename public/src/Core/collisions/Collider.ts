import { Component } from "../Component";
import { CircleCollider } from "./CircleCollider";
import { CircleCircleCollison } from "./Collisions";

export abstract class Collider extends Component{
    public OnCollision : ((other : Collider) => void) | null = null;
    public OnCollided : ((other : Collider) => void) | null = null;

    public Collided(other : Collider) : boolean {
        if(this instanceof CircleCollider && other instanceof CircleCollider)
            return CircleCircleCollison(this, other);
        return false;
    }
}