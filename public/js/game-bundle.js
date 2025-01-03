(()=>{"use strict";class t{constructor(t){this.fillColor="black",this.renderingContext2D=t,this.objects=[]}addObject(t){this.objects.push(t)}removeObject(t){let e=this.objects.indexOf(t);-1!==e&&this.objects.splice(e,1)}drawObjects(){this.renderingContext2D.fillStyle=this.fillColor;let t=this.renderingContext2D.canvas.width,e=this.renderingContext2D.canvas.height;this.renderingContext2D.fillRect(0,0,t,e),this.objects.forEach((t=>{t.draw(this.renderingContext2D)}))}}class e{get FPS(){return 60}get UPDATE_INTERVAL(){return 1e3/this.FPS}constructor(e){this.lastUpdate=0,this.deltaT=0,this.renderer=new t(e),this.objects=[],this.updatableObjects=[],this.staticColliders=[],this.dynamicColliders=[],this.colliders=[]}isDrawable(t){return!!t.draw}isUpdatable(t){return!!t.update}isStaticCollider(t){return null===t.OnCollision}isDynamicCollider(t){return null!==t.OnCollision}isCollider(t){return!!t.Collided}addObject(t){this.objects.push(t),this.isDrawable(t)&&this.renderer.addObject(t),this.isUpdatable(t)&&this.updatableObjects.push(t),t.components.forEach((t=>{this.isCollider(t)&&(this.colliders.push(t),this.isDynamicCollider(t)?this.dynamicColliders.push(t):this.staticColliders.push(t))}))}loop(){const t=()=>{let e=0;e=(new Date).getTime(),this.deltaT=e-this.lastUpdate,this.deltaT>=this.UPDATE_INTERVAL&&(this.dynamicColliders.forEach((t=>{this.colliders.forEach((e=>{Object.is(t,e)||t.Collided(e)&&(null===t.OnCollision||t.OnCollision(e),null==e.OnCollided||e.OnCollided(t))}))})),this.updatableObjects.forEach((t=>{t.update()})),this.renderer.drawObjects(),this.lastUpdate=e),requestAnimationFrame(t)};requestAnimationFrame(t)}}class i{constructor(t){this.offsetX=0,this.offsetY=0,this.objectRef=t,null!==t&&(this.offsetX=t.width/2,this.offsetY=t.height/2)}get ObjectRef(){return this.objectRef}set ObjectRef(t){this.objectRef=t}get OffsetX(){return this.offsetX}get OffsetY(){return this.offsetY}SetOffset(t,e){this.offsetX=t,this.offsetY=e}}function s(t){null!==t.ObjectRef&&(t.ObjectRef.posX=t.ObjectRef.prevPosX,t.ObjectRef.posY=t.ObjectRef.prevPosY)}class r extends i{constructor(){super(...arguments),this.OnCollision=null,this.OnCollided=null}Collided(t){return this instanceof n&&t instanceof n&&function(t,e){var i,s,r,n;if(null===t.ObjectRef||null===e.ObjectRef)return!1;let h=(null===(i=t.ObjectRef)||void 0===i?void 0:i.posX)+t.OffsetX,a=(null===(s=t.ObjectRef)||void 0===s?void 0:s.posY)+t.OffsetY,o=(null===(r=e.ObjectRef)||void 0===r?void 0:r.posX)+e.OffsetX,l=(null===(n=e.ObjectRef)||void 0===n?void 0:n.posY)+e.OffsetY,d=Math.pow(h-o,2),c=Math.pow(a-l,2);return Math.sqrt(d+c)<=t.Radius+e.Radius}(this,t)}}class n extends r{get Radius(){return this.radius}constructor(t,e=null){super(e),this.radius=0,this.radius=t}}class h{constructor(t=0,e=0,i=0,s=0){this.posX=t,this.posY=e,this.prevPosX=t,this.prevPosY=e,this.width=i,this.height=s,this.components=[]}addComponent(t){t.ObjectRef=this,this.components.push(t)}}class a extends h{constructor(t=0,e=0,i=0,s=0,r){super(t,e,i,s),this.imageSrc="",this.imageSrc=r,this.img=new Image(this.width,this.height),this.img.style.imageRendering="pixelated",this.img.src=this.imageSrc}draw(t){t.drawImage(this.img,this.posX,this.posY,this.width,this.height)}}class o extends a{constructor(t,e,i,r){super(t,e,i,r,"../resources/sprites/fire-hydrant.png"),this.collider=new n(10,this),this.collider.OnCollided=s,this.components.push(this.collider)}}class l{get Name(){return this.animationName}get FrameCount(){return this.frames}get StartCol(){return this.startCol}get StartRow(){return this.startRow}get FrameWidth(){return this.frameWidth}get FrameHeight(){return this.frameHeight}get FrameLength(){return this.frameLengthMs}constructor(t,e,i,s,r,n,h){this.frameWidth=0,this.frameHeight=0,this.startRow=0,this.startCol=0,this.frames=0,this.frameLengthMs=0,this.animationName="",this.animationName=t,this.frameWidth=e,this.frameHeight=i,this.startRow=s,this.startCol=r,this.frames=n,this.frameLengthMs=h}}class d extends h{get IsPlaying(){return this.isPlaying}get CurrentAnimation(){return this.currentAnimation}SetIdleFrame(t,e,i,s){this.idleFrameCol=e,this.idleFrameRow=t,this.idleFrameWidth=i,this.idleFrameHeight=s}constructor(t=0,e=0,i=0,s=0,r,n,h){super(t,e,i,s),this.sheetSrc="",this.frameWidth=0,this.frameHeight=0,this.idleFrameCol=0,this.idleFrameRow=0,this.idleFrameWidth=0,this.idleFrameHeight=0,this.animations={},this.currentAnimation=null,this.isPlaying=!1,this.currentFrame=0,this.lastFrameTime=0,this.frameWidth=n,this.frameHeight=h,this.sheetSrc=r,this.sheetImg=new Image,this.sheetImg.src=r,this.sheetImg.style.imageRendering="pixelated"}addAnimation(t){this.animations[t.Name]=t}fireAnimation(t){var e;this.isPlaying||(this.currentAnimation=null!==(e=this.animations[t])&&void 0!==e?e:null,this.isPlaying=!0)}forceAnimation(t){var e;this.stopCurrentAnimation(),this.currentAnimation=null!==(e=this.animations[t])&&void 0!==e?e:null,this.isPlaying=!0}stopCurrentAnimation(){this.isPlaying&&(this.currentAnimation=null,this.isPlaying=!1,this.currentFrame=0)}draw(t){var e;if(!this.isPlaying||null===this.currentAnimation){let e=this.idleFrameCol*this.idleFrameWidth,i=this.idleFrameRow*this.idleFrameHeight;return void t.drawImage(this.sheetImg,e,i,this.idleFrameWidth,this.idleFrameHeight,this.posX,this.posY,this.idleFrameWidth,this.idleFrameHeight)}if(this.currentFrame>=(null===(e=this.currentAnimation)||void 0===e?void 0:e.FrameCount)-1)return void this.stopCurrentAnimation();let i=this.currentAnimation.StartCol*this.currentAnimation.FrameWidth+this.currentFrame*this.currentAnimation.FrameWidth,s=this.currentAnimation.StartRow*this.currentAnimation.FrameHeight;t.drawImage(this.sheetImg,i,s,this.frameWidth,this.frameHeight,this.posX,this.posY,this.frameWidth,this.frameHeight);let r=(new Date).getTime();return r-this.lastFrameTime>=this.currentAnimation.FrameLength?(this.currentFrame++,void(this.lastFrameTime=r)):void 0}}class c{constructor(t){this.keymap=new Set,this.canvas=t;let e=this;this.canvas.addEventListener("keydown",(function(t){e.keymap.add(t.key)})),this.canvas.addEventListener("keyup",(function(t){e.keymap.delete(t.key)}))}isKeyPressed(t){return!!this.keymap.has(t)}}var m;class u extends d{FrogOnCollision(t){}constructor(){super(0,0,32,32,"../resources/sprites/frog-sprites.png",30,30);let t=200;this.addAnimation(new l("MoveDown",30,30,0,0,3,t)),this.addAnimation(new l("MoveLeft",30,30,1,0,3,t)),this.addAnimation(new l("MoveRight",30,30,2,0,3,t)),this.addAnimation(new l("MoveUp",30,30,3,0,3,t)),this.SetIdleFrame(0,0,30,30),this.collider=new n(10,this),this.collider.OnCollision=this.FrogOnCollision,this.addComponent(this.collider)}update(){this.prevPosX=this.posX,this.prevPosY=this.posY,m.isKeyPressed("w")&&(this.fireAnimation("MoveUp"),this.SetIdleFrame(3,0,30,30),this.posY-=5),m.isKeyPressed("a")&&(this.fireAnimation("MoveLeft"),this.SetIdleFrame(1,1,30,30),this.posX-=5),m.isKeyPressed("s")&&(this.fireAnimation("MoveDown"),this.SetIdleFrame(0,0,30,30),this.posY+=5),m.isKeyPressed("d")&&(this.fireAnimation("MoveRight"),this.SetIdleFrame(2,1,30,30),this.posX+=5)}}const f=document.getElementById("game-canvas").getContext("2d");f.imageSmoothingEnabled=!1;new class{constructor(t){if(null===t)throw new Error("Game: Rendering context was null!");var i;i=t.canvas,m=new c(i),this.context2D=t,this.actualScene=new e(t),this.setup()}setup(){this.actualScene.addObject(new u),this.actualScene.addObject(new o(200,200,50,50))}run(){this.actualScene.loop()}}(f).run()})();