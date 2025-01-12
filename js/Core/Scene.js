import { Renderer2D } from "./Renderer2D";
export class Scene {
    static get FPS() { return 60.0; }
    static get UPDATE_INTERVAL() { return 1000 / this.FPS; } /*update interval is in ms*/
    constructor(context2D) {
        this.lastUpdate = 0;
        this.deltaT = 0;
        this.renderer = new Renderer2D(context2D);
        this.objects = [];
        this.updatableObjects = [];
        this.staticColliders = [];
        this.dynamicColliders = [];
        this.colliders = [];
    }
    isDrawable(obj) {
        return obj.draw ? true : false;
    }
    isUpdatable(obj) {
        return obj.update ? true : false;
    }
    isStaticCollider(obj) {
        return obj.OnCollision === null;
    }
    isDynamicCollider(obj) {
        return obj.OnCollision !== null;
    }
    isCollider(obj) {
        return obj.Collided ? true : false;
    }
    addObject(obj, name = '') {
        obj.Canvas = this.renderer.Context;
        obj.name = name;
        this.objects.push(obj);
        if (this.isDrawable(obj)) /*object implements drawable*/
            this.renderer.addObject(obj);
        if (this.isUpdatable(obj)) /*object implements updatable*/
            this.updatableObjects.push(obj);
        obj.components.forEach(comp => {
            if (this.isCollider(comp)) {
                this.colliders.push(comp);
                this.isDynamicCollider(comp) ? this.dynamicColliders.push(comp) : this.staticColliders.push(comp);
            }
        });
    }
    addObjects(obj) {
        for (let o of obj)
            this.addObject(o);
    }
    addMap(map) {
        for (let arr of map) {
            for (let obj of arr)
                this.addObject(obj);
        }
    }
    findByName(name) {
        let out = this.objects.find(obj => obj.name === name);
        if (!out)
            return null;
        return out;
    }
    setup() { } //when creating your own scene, you can put objects here
    loop() {
        /*canvas makes things a little bit messy, but genereally this is how it is adviced to make updates*/
        const update = () => {
            let actualTime = 0;
            actualTime = new Date().getTime();
            this.deltaT = actualTime - this.lastUpdate;
            if (this.deltaT >= Scene.UPDATE_INTERVAL) {
                //collisions
                this.dynamicColliders.forEach(collider => {
                    this.colliders.forEach(c => {
                        if (Object.is(collider, c))
                            return; //do not resolve collision with itself
                        if (collider.Collided(c)) {
                            //invoke on collision / on collided if function exists (!=null)
                            collider.OnCollision !== null ? collider.OnCollision(collider, c) : {};
                            c.OnCollided != null ? c.OnCollided(c, collider) : {};
                        }
                    });
                });
                //update
                this.updatableObjects.forEach(obj => {
                    obj.update();
                });
                //draw
                this.renderer.drawObjects();
                this.lastUpdate = actualTime;
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
}
