(()=>{"use strict";class t{get Context(){return this.renderingContext2D}constructor(t){this.fillColor="black",this.renderingContext2D=t,this.objects=[],this.backgroundObjects=[]}addObject(t){this.objects.push(t)}addObjects(t){this.objects.push(...t)}addBackgroundObject(t){this.backgroundObjects.push(t)}addBackgroundObjects(t){this.backgroundObjects.push(...t)}removeObject(t){let e=this.objects.indexOf(t);-1!==e&&this.objects.splice(e,1)}drawObjects(){this.renderingContext2D.fillStyle=this.fillColor;let t=this.renderingContext2D.canvas.width,e=this.renderingContext2D.canvas.height;this.renderingContext2D.fillRect(0,0,t,e),this.backgroundObjects.forEach((t=>{t.draw(this.renderingContext2D)})),this.objects.forEach((t=>{t.draw(this.renderingContext2D)}))}}class e{static get FPS(){return 60}static get UPDATE_INTERVAL(){return 1e3/this.FPS}constructor(e){this.lastUpdate=0,this.deltaT=0,this.renderer=new t(e),this.objects=[],this.updatableObjects=[],this.staticColliders=[],this.dynamicColliders=[],this.colliders=[]}isDrawable(t){return!!t.draw}isUpdatable(t){return!!t.update}isStaticCollider(t){return null===t.OnCollision}isDynamicCollider(t){return null!==t.OnCollision}isCollider(t){return!!t.Collided}addObject(t,e="",i=!1){t.Canvas=this.renderer.Context,t.name=e,t.Scene=this,this.objects.push(t),this.isDrawable(t)&&(i?this.renderer.addBackgroundObject(t):this.renderer.addObject(t)),this.isUpdatable(t)&&this.updatableObjects.push(t),t.components.forEach((t=>{this.isCollider(t)&&(this.colliders.push(t),this.isDynamicCollider(t)?this.dynamicColliders.push(t):this.staticColliders.push(t))}))}addObjects(t,e=!1){for(let i of t)this.addObject(i,"",e)}addMap(t){for(let e of t)for(let t of e)this.addObject(t,"__map_object__",!0)}clearScene(){this.objects=[],this.updatableObjects=[],this.staticColliders=[],this.dynamicColliders=[],this.colliders=[]}findByName(t){return this.objects.find((e=>e.name===t))||null}removeByName(t){let e=this.objects.findIndex((e=>e.name===t));-1===e||this.objects.splice(e,1)}setup(){}loop(){const t=()=>{let i=0;i=(new Date).getTime(),this.deltaT=i-this.lastUpdate,this.deltaT>=e.UPDATE_INTERVAL&&(this.dynamicColliders.forEach((t=>{this.colliders.forEach((e=>{Object.is(t,e)||t.Collided(e)&&(null===t.OnCollision||t.OnCollision(t,e),null==e.OnCollided||e.OnCollided(e,t))}))})),this.updatableObjects.forEach((t=>{t.update()})),this.renderer.drawObjects(),this.lastUpdate=i),requestAnimationFrame(t)};requestAnimationFrame(t)}}class i{constructor(t,e){this.playing=!1,this.audio=t,this.audio.volume=e,this.volume=e}get Volume(){return this.volume}set Volume(t){this.volume=t}get AudioElement(){return this.audio}get IsPlaying(){return this.playing}set IsPlaying(t){this.playing=t}}class s{get GlobalVolume(){return this.globalVolume}set GlobalVolume(t){this.globalVolume=t,this.playlist.forEach((t=>{t.AudioElement.volume=t.Volume*this.globalVolume}))}constructor(t){this.globalVolume=1,this.playlist=[],this.canvas=t;let e=this;t.addEventListener("focus",(()=>{e.recalculateVolume(),e.playlist.forEach((t=>t.IsPlaying?t.AudioElement.play():{}))})),t.addEventListener("blur",(()=>e.playlist.forEach((t=>t.AudioElement.pause()))))}playAll(){this.recalculateVolume(),this.playlist.forEach((t=>t.IsPlaying?t.AudioElement.play():{}))}stopAll(){this.playlist.forEach((t=>t.AudioElement.pause()))}addAndPlay(t,e=1,i=!1,s="",n=!1){let a=this.add(t,e,i,s,n);void 0!==a&&(a.IsPlaying=!0,a.AudioElement.play())}addElement(t,e){this.playlist.push(new i(t,e))}add(t,e=1,s=!1,n="",a=!1){let l=new Audio(t);if(l.src=t,l.loop=s,l.id=n,""!==n&&null!==this.find(n))return;let r=new i(l,e);if(s||a&&(!a||""!==n)){let t=this;l.addEventListener("ended",(function(){let e=t.playlist.indexOf(r);t.playlist[e].IsPlaying=!1}))}else{let t=this;l.addEventListener("ended",(function(){let e=t.playlist.indexOf(r);t.playlist.splice(e,1)}))}return this.playlist.push(r),r}addIfNotExists(t,e=1,i,s="",n=!1){-1===this.playlist.findIndex((t=>t.AudioElement.id===s))&&this.add(t,e,i,s,n)}rewind(t){let e=this.playlist.findIndex((e=>e.AudioElement.id===t));-1!==e&&(this.playlist[e].AudioElement.currentTime=0)}play(t){let e=this.playlist.findIndex((e=>e.AudioElement.id===t));-1!==e&&(this.playlist[e].IsPlaying||(this.playlist[e].AudioElement.play(),this.playlist[e].IsPlaying=!0))}stop(t){let e=this.playlist.findIndex((e=>e.AudioElement.id===t));-1!==e&&(this.playlist[e].AudioElement.pause(),this.playlist[e].IsPlaying=!1)}remove(t){let e=this.playlist.findIndex((e=>e.AudioElement.id===t));-1!==e&&(this.playlist[e].AudioElement.remove(),this.playlist.splice(e,1))}find(t){let e=this.playlist.findIndex((e=>e.AudioElement.id===t));return-1===e?null:this.playlist[e]}setVolume(t,e){let i=this.playlist.findIndex((e=>e.AudioElement.id===t));-1!==i&&(this.playlist[i].Volume=e,this.playlist[i].AudioElement.volume=e*this.globalVolume)}recalculateVolume(){this.playlist.forEach((t=>{t.AudioElement.volume=t.Volume*this.globalVolume}))}}var n,a,l,r;class h{constructor(t){this.offsetX=0,this.offsetY=0,this.objectRef=t,null!==t&&(this.offsetX=t.width/2,this.offsetY=t.height/2)}get ObjectRef(){return this.objectRef}set ObjectRef(t){this.objectRef=t}get OffsetX(){return this.offsetX}get OffsetY(){return this.offsetY}SetOffset(t,e){this.offsetX=t,this.offsetY=e}}function o(t){null!==t.ObjectRef&&(t.ObjectRef.posX=t.ObjectRef.prevPosX,t.ObjectRef.posY=t.ObjectRef.prevPosY)}class d extends h{constructor(){super(...arguments),this.OnCollision=null,this.OnCollided=null}Collided(t){return this instanceof c&&t instanceof c&&function(t,e){var i,s,n,a;if(null===t.ObjectRef||null===e.ObjectRef)return!1;let l=(null===(i=t.ObjectRef)||void 0===i?void 0:i.posX)+t.OffsetX,r=(null===(s=t.ObjectRef)||void 0===s?void 0:s.posY)+t.OffsetY,h=(null===(n=e.ObjectRef)||void 0===n?void 0:n.posX)+e.OffsetX,o=(null===(a=e.ObjectRef)||void 0===a?void 0:a.posY)+e.OffsetY,d=Math.pow(l-h,2),c=Math.pow(r-o,2);return Math.sqrt(d+c)<=t.Radius+e.Radius}(this,t)}}class c extends d{get Radius(){return this.radius}constructor(t,e=null){super(e),this.radius=0,this.radius=t}}class u{get Name(){return this.animationName}get FrameCount(){return this.frames}get StartCol(){return this.startCol}get StartRow(){return this.startRow}get FrameWidth(){return this.frameWidth}get FrameHeight(){return this.frameHeight}get FrameLength(){return this.frameLengthMs}constructor(t,e,i,s,n,a,l){this.frameWidth=0,this.frameHeight=0,this.startRow=0,this.startCol=0,this.frames=0,this.frameLengthMs=0,this.animationName="",this.animationName=t,this.frameWidth=e,this.frameHeight=i,this.startRow=s,this.startCol=n,this.frames=a,this.frameLengthMs=l}}class m{get Canvas(){return this.canvas2D}set Canvas(t){this.canvas2D=t}get Scene(){return this.scene}set Scene(t){this.scene=t}constructor(t=0,e=0,i=0,s=0,n=""){this.name="",this.scene=null,this.canvas2D=null,this.name=n,this.posX=t,this.posY=e,this.prevPosX=t,this.prevPosY=e,this.width=i,this.height=s,this.components=[]}addComponent(t){t.ObjectRef=this,this.components.push(t)}}class p extends m{get IsPlaying(){return this.isPlaying}get CurrentAnimation(){return this.currentAnimation}SetIdleFrame(t,e,i,s){this.idleFrameCol=e,this.idleFrameRow=t,this.idleFrameWidth=i,this.idleFrameHeight=s}constructor(t=0,e=0,i=0,s=0,n,a,l){super(t,e,i,s),this.sheetSrc="",this.frameWidth=0,this.frameHeight=0,this.idleFrameCol=0,this.idleFrameRow=0,this.idleFrameWidth=0,this.idleFrameHeight=0,this.animations={},this.currentAnimation=null,this.isPlaying=!1,this.currentFrame=0,this.lastFrameTime=0,this.frameWidth=a,this.frameHeight=l,this.sheetSrc=n,this.sheetImg=new Image,this.sheetImg.src=n,this.sheetImg.style.imageRendering="pixelated"}addAnimation(t){this.animations[t.Name]=t}fireAnimation(t){var e;this.isPlaying||(this.currentAnimation=null!==(e=this.animations[t])&&void 0!==e?e:null,this.isPlaying=!0)}forceAnimation(t){var e;this.stopCurrentAnimation(),this.currentAnimation=null!==(e=this.animations[t])&&void 0!==e?e:null,this.isPlaying=!0}stopCurrentAnimation(){this.isPlaying&&(this.currentAnimation=null,this.isPlaying=!1,this.currentFrame=0)}draw(t){var e;if(!this.isPlaying||null===this.currentAnimation){let e=this.idleFrameCol*this.idleFrameWidth,i=this.idleFrameRow*this.idleFrameHeight;return void t.drawImage(this.sheetImg,e,i,this.idleFrameWidth,this.idleFrameHeight,this.posX,this.posY,this.idleFrameWidth,this.idleFrameHeight)}if(this.currentFrame>=(null===(e=this.currentAnimation)||void 0===e?void 0:e.FrameCount)-1)return void this.stopCurrentAnimation();let i=this.currentAnimation.StartCol*this.currentAnimation.FrameWidth+this.currentFrame*this.currentAnimation.FrameWidth,s=this.currentAnimation.StartRow*this.currentAnimation.FrameHeight;t.drawImage(this.sheetImg,i,s,this.frameWidth,this.frameHeight,this.posX,this.posY,this.frameWidth,this.frameHeight);let n=(new Date).getTime();return n-this.lastFrameTime>=this.currentAnimation.FrameLength?(this.currentFrame++,void(this.lastFrameTime=n)):void 0}}class g{constructor(t){this.keymap=new Set,this.canvas=t;let e=this;this.canvas.addEventListener("keydown",(function(t){e.keymap.add(t.key)})),this.canvas.addEventListener("keyup",(function(t){e.keymap.delete(t.key)}))}addKeyPressed(t){this.keymap.has(t)||this.keymap.add(t)}removeKeyPressed(t){this.keymap.has(t)&&this.keymap.delete(t)}isKeyPressed(t){return!!this.keymap.has(t)}}class v extends m{constructor(t=0,e=0,i=0,s=0,n){super(t,e,i,s),this.imageSrc="",this.imageSrc=n,this.img=new Image(this.width,this.height),this.img.style.imageRendering="pixelated",this.img.src=this.imageSrc}draw(t){t.drawImage(this.img,this.posX,this.posY,this.width,this.height)}}!function(t){t.StandardLeft="resources/sprites/car_left.png",t.ClassicLeft="resources/sprites/car_classic_left.png",t.SportLeft="resources/sprites/car_sport_left.png",t.StandardRight="resources/sprites/car_right.png",t.ClassicRight="resources/sprites/car_classic_right.png",t.SportRight="resources/sprites/car_sport_right.png"}(l||(l={})),function(t){t[t.Right=1]="Right",t[t.Left=-1]="Left"}(r||(r={}));class f extends v{CarOnCollided(t,e){var i,s;let n=null!==(s=null===(i=e.ObjectRef)||void 0===i?void 0:i.Canvas)&&void 0!==s?s:null;null!==n&&e.ObjectRef instanceof O&&(e.ObjectRef.posX=n.canvas.width/2-e.ObjectRef.width/2,e.ObjectRef.posY=n.canvas.height-e.ObjectRef.height)}constructor(t,e,i,s,n){super(t,t,32,32,n),this.direction=r.Right,this.speed=0,this.direction=s,this.speed=i,this.posX=t,this.posY=e,this.collider=new c(16,this),this.collider.OnCollided=this.CarOnCollided,this.addComponent(this.collider)}update(){if(null===this.Canvas)throw new Error("Car: Object canvas reference is not set");this.posX+=this.speed*this.direction,-1===this.direction&&this.posX<=0-this.width-10?this.posX=this.Canvas.canvas.width+this.width+10:1===this.direction&&this.posX>=this.Canvas.canvas.width+this.width+10&&(this.posX=0-this.width-10)}static getRandomSprite(t){if(t===r.Left){let t=Math.floor(Math.random()*Object.keys(l).length/2);return Object.values(l)[t]}{let t=Math.floor(Math.random()*Object.keys(l).length/2);return Object.values(l)[Object.keys(l).length/2+t]}}static RandomCar(t,e,i,s,n){let a=f.getRandomSprite(i),l=Math.random()*(n-s+1)+s;return new f(t,e,l,i,a)}}class y extends v{}class b extends v{constructor(t,e,i,s){super(t,e,i,s,"resources/sprites/fire-hydrant.png"),this.collider=new c(10,this),this.collider.OnCollided=o,this.components.push(this.collider)}}class C{constructor(){this.startX=0,this.startY=0,this.tileWidthPx=50,this.tileHeightPx=50,this.tilesHorizontal=20,this.tilesVertical=20,this.fillScreen=!0,this.screenPaddingX=0,this.screenPaddingY=0,this.pavementChance=.1,this.fireHydrantChance=.2,this.maxFireHydrants=this.tilesHorizontal/4*3,this.roadCarsMin=2,this.roadCarsMax=5,this.roadCarsSpeedMin=3,this.roadCarsSpeedMax=8,this.roadChance=.9}}class w{constructor(t){this.context2D=t}GenerateRoad(t,e,i,s){let n=[],a=e;for(let e=0;e<t;e++)n.push(new y(a,i,s.tileWidthPx,s.tileHeightPx,w.tileRoadSrc)),a+=s.tileWidthPx;let l=Math.floor(Math.random()*(s.roadCarsMax-s.roadCarsMin+1)+s.roadCarsMin),h=Math.random()>=.5?r.Right:r.Left,o=this.context2D.canvas.width/l;for(let t=0;t<l;t++){let e=f.RandomCar(o*t,i,h,s.roadCarsSpeedMin,s.roadCarsSpeedMax);n.push(e)}return n}GeneratePavement(t,e,i,s){let n=[],a=0,l=e;for(let e=0;e<t;e++){let t=Math.random()<s.fireHydrantChance;n.push(new y(l,i,s.tileWidthPx,s.tileHeightPx,w.tilePavementSrc)),t&&a<s.maxFireHydrants&&(n.push(new b(l,i,s.tileWidthPx,s.tileHeightPx)),a++),l+=s.tileWidthPx}return n}GenerateGrass(t,e,i,s){let n=[],a=e;for(let e=0;e<t;e++)n.push(new y(a,i,s.tileWidthPx,s.tileHeightPx,w.tileGrassSrc)),a+=s.tileWidthPx;return n}GenerateMap(t,e,i){let s=[[]];if(i.tilesHorizontal=t,i.tilesVertical=e,i.fillScreen){let t=this.context2D.canvas.width-2*i.screenPaddingX,e=this.context2D.canvas.height-2*i.screenPaddingY;i.startX=i.screenPaddingX,i.startY=i.screenPaddingY,i.tileWidthPx=t/i.tilesHorizontal,i.tileHeightPx=e/i.tilesVertical}let n=i.startX,a=i.startY;s.push(this.GenerateGrass(t,n,a,i)),a+=i.tileHeightPx;let l=!1;for(let e=0;e<i.tilesVertical-2;e++)l?(s.push(this.GenerateRoad(t,n,a,i)),l=!1,a+=i.tileHeightPx):Math.random()<i.pavementChance?(s.push(this.GeneratePavement(t,n,a,i)),l=!0,a+=i.tileHeightPx):(s.push(this.GenerateRoad(t,n,a,i)),a+=i.tileHeightPx);return s.push(this.GenerateGrass(t,n,a,i)),s}}w.tileGrassSrc="resources/tiles/grass_tile.png",w.tileRoadSrc="resources/tiles/road_tile.png",w.tilePavementSrc="resources/tiles/pavement_tile.png";class E{}E.TileWidth=48,E.TileHeigth=48;class O extends p{get Lives(){return this.lives}get Score(){return this.score}get Level(){return this.level}resetPosition(){var t,e;this.Canvas&&(this.posX=(null===(t=this.Canvas)||void 0===t?void 0:t.canvas.width)/2-16,this.posY=(null===(e=this.Canvas)||void 0===e?void 0:e.canvas.height)-32)}FrogOnCollision(t,e){if(e.ObjectRef instanceof f){n.play("sound_frog_death");let e=t.ObjectRef;e.lives--,e.FrogOnLivesChange()}}FrogOnLevelChange(){null!==this.levelElement&&(this.levelElement.textContent=this.level.toString())}FrogOnScoreChange(){null!==this.scoreElement&&(this.scoreElement.textContent=this.score.toString())}FrogOnLivesChange(){null!==this.livesElement&&(this.livesElement.textContent=this.lives.toString())}updateElements(){this.FrogOnLevelChange(),this.FrogOnLivesChange(),this.FrogOnScoreChange()}addElements(t,e,i){this.livesElement=t,this.scoreElement=e,this.levelElement=i}constructor(t,e,i,s){super(t,e,i,s,"resources/sprites/frog-sprites.png",30,30),this.lives=3,this.score=0,this.level=1,this.livesElement=null,this.scoreElement=null,this.levelElement=null,this.name="Frog";let a=200;this.addAnimation(new u("MoveDown",30,30,0,0,3,a)),this.addAnimation(new u("MoveLeft",30,30,1,0,3,a)),this.addAnimation(new u("MoveRight",30,30,2,0,3,a)),this.addAnimation(new u("MoveUp",30,30,3,0,3,a)),this.SetIdleFrame(0,0,30,30),this.collider=new c(10,this),this.collider.OnCollision=this.FrogOnCollision,this.addComponent(this.collider),n.addIfNotExists("resources/audio/jump.mp3",.5,!1,"sound_frog_jump",!0),n.addIfNotExists("resources/audio/death.mp3",.5,!1,"sound_frog_death",!0),n.addIfNotExists("resources/audio/gameover.mp3",1,!1,"sound_game_over",!0)}moveUp(){this.fireAnimation("MoveUp"),this.SetIdleFrame(3,0,30,30),this.posY-=5,n.play("sound_frog_jump")}moveDown(){this.fireAnimation("MoveDown"),this.SetIdleFrame(0,0,30,30),this.posY+=5,n.play("sound_frog_jump")}moveLeft(){this.fireAnimation("MoveLeft"),this.SetIdleFrame(1,1,30,30),this.posX-=5,n.play("sound_frog_jump")}moveRight(){this.fireAnimation("MoveRight"),this.SetIdleFrame(2,1,30,30),this.posX+=5,n.play("sound_frog_jump")}update(){var t,e,i,s,l,r;if(null===this.Canvas)throw new Error("Frog: Object canvas reference is not set");if(this.prevPosX=this.posX,this.prevPosY=this.posY,a.isKeyPressed("w")&&this.moveUp(),a.isKeyPressed("a")&&this.moveLeft(),a.isKeyPressed("s")&&this.moveDown(),a.isKeyPressed("d")&&this.moveRight(),(this.posX>=this.Canvas.canvas.width-this.width+10||this.posX<0||this.posY>=this.Canvas.canvas.height-this.height+10||this.posY<0)&&(this.posX=this.prevPosX,this.posY=this.prevPosY),this.posY<=20){if(this.resetPosition(),this.score+=100*this.level,this.level++,this.lives+=3,this.updateElements(),null===this.canvas2D)return;null===(t=this.Scene)||void 0===t||t.clearScene(),null===(e=this.Scene)||void 0===e||e.addMap(new w(this.canvas2D).GenerateMap(this.canvas2D.canvas.width/E.TileWidth,this.canvas2D.canvas.height/E.TileHeigth,new C)),null===(i=this.Scene)||void 0===i||i.addObject(this)}if(this.lives<0){if(this.score=0,this.level=1,this.lives=3,this.updateElements(),n.play("sound_game_over"),null===this.canvas2D)return;null===(s=this.Scene)||void 0===s||s.clearScene(),null===(l=this.Scene)||void 0===l||l.addMap(new w(this.canvas2D).GenerateMap(this.canvas2D.canvas.width/E.TileWidth,this.canvas2D.canvas.height/E.TileHeigth,new C)),null===(r=this.Scene)||void 0===r||r.addObject(this)}}}var P=!0;const j=document.getElementById("game-canvas"),x=document.getElementById("game-canvas-error"),A=j.getContext("2d");A.imageSmoothingEnabled=!1;const R=new class{constructor(t){if(this.map=null,null===t)throw new Error("Game: Rendering context was null!");!function(t){a=new g(t)}(t.canvas),function(t){n=new s(t)}(t.canvas),this.context2D=t,this.actualScene=new e(t),this.setup()}get Scene(){return this.actualScene}setup(){n.GlobalVolume=.1,this.map=new w(this.context2D).GenerateMap(this.context2D.canvas.width/E.TileWidth,this.context2D.canvas.height/E.TileHeigth,new C),this.actualScene.addMap(this.map),this.actualScene.addObject(new O(this.context2D.canvas.width/2-16,this.context2D.canvas.height-32,32,32),"Frog"),n.addAndPlay("resources/audio/background.mp3",.5,!0,"background")}run(){this.actualScene.loop()}}(A),S=R.Scene.findByName("Frog");S.addElements(document.getElementById("game-lives"),document.getElementById("game-score"),document.getElementById("game-level")),S.updateElements(),R.run(),window.addEventListener("load",(function(){var t;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(null===(t=this.document.getElementById("game-buttons"))||void 0===t||t.classList.remove("d-none")),P&&this.window.innerWidth<576?(j.classList.add("d-none"),x.classList.remove("d-none"),P=!1):(j.classList.remove("d-none"),x.classList.add("d-none"),P=!0)})),window.addEventListener("resize",(function(){P&&this.window.innerWidth<576?(j.classList.add("d-none"),x.classList.remove("d-none"),P=!1):(j.classList.remove("d-none"),x.classList.add("d-none"),P=!0)}));var I=null,F=null,L=null,D=null,M=document.getElementById("game-button-up"),_=document.getElementById("game-button-down"),X=document.getElementById("game-button-left"),H=document.getElementById("game-button-right"),Y=document.getElementById("game-buttons");null==Y||Y.addEventListener("touchstart",(function(){n.playAll()})),null==M||M.addEventListener("touchstart",(function(){I=setInterval((function(){a.addKeyPressed("w")}),e.UPDATE_INTERVAL)})),null==_||_.addEventListener("touchstart",(function(){F=setInterval((function(){a.addKeyPressed("s")}),e.UPDATE_INTERVAL)})),null==X||X.addEventListener("touchstart",(function(){D=setInterval((function(){a.addKeyPressed("a")}),e.UPDATE_INTERVAL)})),null==H||H.addEventListener("touchstart",(function(){L=setInterval((function(){a.addKeyPressed("d")}),e.UPDATE_INTERVAL)})),null==M||M.addEventListener("touchend",(function(){I&&(a.removeKeyPressed("w"),clearInterval(I))})),null==_||_.addEventListener("touchend",(function(){F&&(a.removeKeyPressed("s"),clearInterval(F))})),null==X||X.addEventListener("touchend",(function(){D&&(a.removeKeyPressed("a"),clearInterval(D))})),null==H||H.addEventListener("touchend",(function(){L&&(a.removeKeyPressed("d"),clearInterval(L))}))})();