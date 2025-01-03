import { Collider } from "./collisions/Collider";
import { Component } from "./Component";
import type { GameObject } from "./GameObject";
import type { Drawable } from "./interfaces/Drawable";
import type { Updatable } from "./interfaces/Updatable";
import { Renderer2D } from "./Renderer2D";

export class Scene {
    private renderer: Renderer2D;
    private objects: Array<GameObject>;
    private updatableObjects: Array<Updatable>
    private staticColliders: Array<Collider> //colliders that have not OnCollision implemented
    private dynamicColliders: Array<Collider> //colliders with OnCollision implemented, objects with those colliders propably moves, and need to be checked each frame if they collided with something
    private colliders: Array<Collider> //array of all colliders to iterate through

    private lastUpdate = 0;
    private deltaT = 0;

    get FPS() { return 60.0; }
    get UPDATE_INTERVAL() { return 1000 / this.FPS; } /*update interval is in ms*/

    constructor(context2D: CanvasRenderingContext2D) {
        this.renderer = new Renderer2D(context2D);
        this.objects = [];
        this.updatableObjects = [];
        this.staticColliders = [];
        this.dynamicColliders = [];
        this.colliders = [];
    }

    private isDrawable(obj: Drawable | GameObject): obj is Drawable {
        return (<Drawable>obj).draw ? true : false;
    }

    private isUpdatable(obj: Updatable | GameObject): obj is Updatable {
        return (<Updatable>obj).update ? true : false;
    }

    private isStaticCollider(obj : Collider): boolean {
        return obj.OnCollision===null;
    }

    private isDynamicCollider(obj : Collider): boolean{
        return obj.OnCollision!==null;
    }

    private isCollider(obj: Collider | Component): obj is Collider{
        return (<Collider>obj).Collided ? true : false;
    }

    public addObject(obj: GameObject) {
        this.objects.push(obj);

        if (this.isDrawable(obj)) /*object implements drawable*/
            this.renderer.addObject(obj);

        if (this.isUpdatable(obj)) /*object implements updatable*/
            this.updatableObjects.push(obj);

        obj.components.forEach(comp => {
            if(this.isCollider(comp)){
                this.colliders.push(comp);
                this.isDynamicCollider(comp) ? this.dynamicColliders.push(comp) : this.staticColliders.push(comp);
            }
        });
    }

    public loop() {
        /*canvas makes things a little bit messy, but genereally this is how it is adviced to make updates*/
        const update = () => {
            let actualTime = 0;
            actualTime = new Date().getTime();
            this.deltaT = actualTime - this.lastUpdate;

            if (this.deltaT >= this.UPDATE_INTERVAL) {
                //collisions
                this.dynamicColliders.forEach(collider => {
                    this.colliders.forEach(c => {
                        if(Object.is(collider,c)) return; //do not resolve collision with itself

                        if(collider.Collided(c)){
                            //invoke on collision / on collided if function exists (!=null)
                            collider.OnCollision!==null ? collider.OnCollision(c) : {}
                            c.OnCollided!=null ? c.OnCollided(collider) : {}
                        }
                    })
                })

                //update
                this.updatableObjects.forEach(obj => {
                    obj.update();
                });
                

                //draw
                this.renderer.drawObjects();
                this.lastUpdate = actualTime;
            }
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update)
    }
}