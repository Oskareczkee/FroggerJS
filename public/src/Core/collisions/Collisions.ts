import { CircleCollider } from "./CircleCollider";
import { Collider } from "./Collider";

/*Default collision functions which can be used for various colliders*/

//returns object to its previous position on collision
export function OnCollidedBlock(other : Collider){
    if(other.ObjectRef===null) return;

    other.ObjectRef.posX = other.ObjectRef.prevPosX;
    other.ObjectRef.posY = other.ObjectRef.prevPosY;
}

export function CircleCircleCollison(circle : CircleCollider, other : CircleCollider) : boolean{
    if(circle.ObjectRef===null || other.ObjectRef===null)
        return false; //references are wrong, cannot check whether these circles collide

    //circle center
    let cx = circle.ObjectRef?.posX + circle.OffsetX;
    let cy = circle.ObjectRef?.posY + circle.OffsetY;

    //other circle center
    let ox = other.ObjectRef?.posX + other.OffsetX;
    let oy = other.ObjectRef?.posY + other.OffsetY;

    //distance x, distance y
    let dx = Math.pow(cx-ox,2);
    let dy = Math.pow(cy-oy,2);

    let dist = Math.sqrt(dx+dy);

    if(dist <= circle.Radius + other.Radius)
        return true;
    return false;
}