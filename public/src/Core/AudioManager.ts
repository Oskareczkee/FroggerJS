export class AudioObject {
    private audio: HTMLAudioElement;
    private volume: number;
    private playing : boolean = false;

    constructor(audio: HTMLAudioElement, volume: number) {
        this.audio = audio;
        this.audio.volume = volume;
        this.volume = volume;
    }

    get Volume(): number { return this.volume; }
    set Volume(val: number) { this.volume = val; }

    get AudioElement(): HTMLAudioElement { return this.audio; }
    get IsPlaying() : boolean {return this.playing;}
    set IsPlaying(isItReallyPlaying : boolean) {this.playing = isItReallyPlaying;}
}


export class AudioManager {

    /*Audio file can be kept in memory in 2 ways:
      - Audio is looped
      - Keep in memory can be set if you wish to keep that audio in memory, name has to be set then to find it
      For now music is kept in array, we can change it to hashmap, when playlist will get big enough
    */

    private canvas: HTMLCanvasElement;
    private playlist: Array<AudioObject>;
    private globalVolume: number = 1;

    get GlobalVolume() { return this.globalVolume; }
    set GlobalVolume(volume: number) {
        this.globalVolume = volume;
        this.playlist.forEach((element) => {
            element.AudioElement.volume = element.Volume * this.globalVolume;
        })
    }

    constructor(canvas: HTMLCanvasElement) {
        this.playlist = [];
        this.canvas = canvas;

        let instance = this;
        canvas.addEventListener("focus", () => {
            instance.recalculateVolume(); //just in case
            instance.playlist.forEach(sound => sound.IsPlaying ? sound.AudioElement.play(): {}); 
        });
        canvas.addEventListener("blur", () => instance.playlist.forEach(sound => sound.AudioElement.pause()) );
    }

    public playAll(){
        this.recalculateVolume(); //just in case
        this.playlist.forEach(sound => sound.IsPlaying ? sound.AudioElement.play(): {}); 
    }

    public stopAll(){
        this.playlist.forEach(sound => sound.AudioElement.pause());
    }


    public addAndPlay(src: string, initialVolume : number = 1.0, loop: boolean = false, name: string = '', keepInMemory : boolean = false) {
        let obj = this.add(src, initialVolume, loop, name, keepInMemory);
        if(obj === undefined) return;

        obj.IsPlaying = true;
        obj.AudioElement.play();
    }

    //adds HTML audio element
    public addElement(element: HTMLAudioElement, volume: number) {
        this.playlist.push(new AudioObject(element, volume));
    }
    
    //when using keepInMemory, name has to be set, otherwise it won't be kept in memory. Returns added object
    public add(src: string, initalVolume : number = 1.0, loop: boolean = false, name: string = '', keepInMemory = false){
        let a = new Audio(src);
        a.src = src;
        a.loop = loop;
        a.id = name; 

        if(name!=='' && this.find(name)!==null) return; //music already exists in the memory
        
        let obj = new AudioObject(a, initalVolume);
        if (!loop && (!keepInMemory || (keepInMemory && name===''))) { //remove element if it is not ment to be kept in memory
            let audioInstance = this;
            a.addEventListener('ended', function () {
                let idx = audioInstance.playlist.indexOf(obj);
                audioInstance.playlist.splice(idx, 1);
            })
        }
        else{ //set is playing to false when elements end to play
            let audioInstance = this;
            a.addEventListener('ended', function () {
                let idx = audioInstance.playlist.indexOf(obj);
                audioInstance.playlist[idx].IsPlaying=false;
            })
        }
        
        this.playlist.push(obj);
        return obj;
    }

    //when using keepInMemory, name has to be set, otherwise it won't be kept in memory
    public addIfNotExists(src: string, initialVolume : number = 1.0, loop : boolean, name: string = '', keepInMemory = false){
        if(this.playlist.findIndex((elem) => elem.AudioElement.id === name)!==-1) 
            return; //element already exists

        this.add(src,initialVolume, loop, name, keepInMemory);
    }

    public rewind(name: string) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1) return;

        this.playlist[idx].AudioElement.currentTime = 0;
    }

    public play(name: string) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1) return;

        if(this.playlist[idx].IsPlaying) return; //id element is already playing, do not replay it

        this.playlist[idx].AudioElement.play();
        this.playlist[idx].IsPlaying = true;
    }

    public stop(name: string) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1) return;

        this.playlist[idx].AudioElement.pause();
        this.playlist[idx].IsPlaying = false;
    }
    
    public remove(name: string) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1) return; //element has not been found
        this.playlist[idx].AudioElement.remove();
        this.playlist.splice(idx, 1);
    }

    public find(name: string): AudioObject | null {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1) return null;

        return this.playlist[idx];
    }

    public setVolume(name: string, volume: number) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1) return;

        this.playlist[idx].Volume = volume;
        this.playlist[idx].AudioElement.volume = volume * this.globalVolume;
    }

    //recalculates total volume on all elements
    public recalculateVolume() {
        this.playlist.forEach((element) => {
            element.AudioElement.volume = element.Volume * this.globalVolume;
        })
    }
}