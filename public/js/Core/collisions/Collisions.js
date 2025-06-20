/*Default collision functions which can be used for various colliders*/
//returns object to its previous position on collision
export function OnCollidedBlock(collider, other) {
    if (other.ObjectRef === null)
        return;
    other.ObjectRef.posX = other.ObjectRef.prevPosX;
    other.ObjectRef.posY = other.ObjectRef.prevPosY;
}
export function CircleCircleCollison(circle, other) {
    var _a, _b, _c, _d;
    if (circle.ObjectRef === null || other.ObjectRef === null)
        return false; //references are wrong, cannot check whether these circles collide
    //circle center
    let cx = ((_a = circle.ObjectRef) === null || _a === void 0 ? void 0 : _a.posX) + circle.OffsetX;
    let cy = ((_b = circle.ObjectRef) === null || _b === void 0 ? void 0 : _b.posY) + circle.OffsetY;
    //other circle center
    let ox = ((_c = other.ObjectRef) === null || _c === void 0 ? void 0 : _c.posX) + other.OffsetX;
    let oy = ((_d = other.ObjectRef) === null || _d === void 0 ? void 0 : _d.posY) + other.OffsetY;
    //distance x, distance y
    let dx = Math.pow(cx - ox, 2);
    let dy = Math.pow(cy - oy, 2);
    let dist = Math.sqrt(dx + dy);
    if (dist <= circle.Radius + other.Radius)
        return true;
    return false;
}
