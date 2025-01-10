export class AudioObject {
    constructor(audio, volume) {
        this.playing = false;
        this.audio = audio;
        this.audio.volume = volume;
        this.volume = volume;
    }
    get Volume() { return this.volume; }
    set Volume(val) { this.volume = val; }
    get AudioElement() { return this.audio; }
    get IsPlaying() { return this.playing; }
    set IsPlaying(isItReallyPlaying) { this.playing = isItReallyPlaying; }
}
export class AudioManager {
    get GlobalVolume() { return this.globalVolume; }
    set GlobalVolume(volume) {
        this.globalVolume = volume;
        this.playlist.forEach((element) => {
            element.AudioElement.volume = element.Volume * this.globalVolume;
        });
    }
    constructor(canvas) {
        this.globalVolume = 1;
        this.playlist = [];
        this.canvas = canvas;
        let instance = this;
        canvas.addEventListener("focus", () => {
            instance.recalculateVolume(); //just in case
            instance.playlist.forEach(sound => sound.IsPlaying ? sound.AudioElement.play() : {});
        });
        canvas.addEventListener("blur", () => instance.playlist.forEach(sound => sound.AudioElement.pause()));
    }
    playAll() {
        this.recalculateVolume(); //just in case
        this.playlist.forEach(sound => sound.IsPlaying ? sound.AudioElement.play() : {});
    }
    stopAll() {
        this.playlist.forEach(sound => sound.AudioElement.pause());
    }
    addAndPlay(src, initialVolume = 1.0, loop = false, name = '', keepInMemory = false) {
        let obj = this.add(src, initialVolume, loop, name, keepInMemory);
        if (obj === undefined)
            return;
        obj.IsPlaying = true;
        obj.AudioElement.play();
    }
    //adds HTML audio element
    addElement(element, volume) {
        this.playlist.push(new AudioObject(element, volume));
    }
    //when using keepInMemory, name has to be set, otherwise it won't be kept in memory. Returns added object
    add(src, initalVolume = 1.0, loop = false, name = '', keepInMemory = false) {
        let a = new Audio(src);
        a.src = src;
        a.loop = loop;
        a.id = name;
        if (name !== '' && this.find(name) !== null)
            return; //music already exists in the memory
        let obj = new AudioObject(a, initalVolume);
        if (!loop && (!keepInMemory || (keepInMemory && name === ''))) { //remove element if it is not ment to be kept in memory
            let audioInstance = this;
            a.addEventListener('ended', function () {
                let idx = audioInstance.playlist.indexOf(obj);
                audioInstance.playlist.splice(idx, 1);
            });
        }
        else { //set is playing to false when elements end to play
            let audioInstance = this;
            a.addEventListener('ended', function () {
                let idx = audioInstance.playlist.indexOf(obj);
                audioInstance.playlist[idx].IsPlaying = false;
            });
        }
        this.playlist.push(obj);
        return obj;
    }
    //when using keepInMemory, name has to be set, otherwise it won't be kept in memory
    addIfNotExists(src, initialVolume = 1.0, loop, name = '', keepInMemory = false) {
        if (this.playlist.findIndex((elem) => elem.AudioElement.id === name) !== -1)
            return; //element already exists
        this.add(src, initialVolume, loop, name, keepInMemory);
    }
    rewind(name) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1)
            return;
        this.playlist[idx].AudioElement.currentTime = 0;
    }
    play(name) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1)
            return;
        if (this.playlist[idx].IsPlaying)
            return; //id element is already playing, do not replay it
        this.playlist[idx].AudioElement.play();
        this.playlist[idx].IsPlaying = true;
    }
    stop(name) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1)
            return;
        this.playlist[idx].AudioElement.pause();
        this.playlist[idx].IsPlaying = false;
    }
    remove(name) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1)
            return; //element has not been found
        this.playlist[idx].AudioElement.remove();
        this.playlist.splice(idx, 1);
    }
    find(name) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1)
            return null;
        return this.playlist[idx];
    }
    setVolume(name, volume) {
        let idx = this.playlist.findIndex((elem) => elem.AudioElement.id === name);
        if (idx === -1)
            return;
        this.playlist[idx].Volume = volume;
        this.playlist[idx].AudioElement.volume = volume * this.globalVolume;
    }
    //recalculates total volume on all elements
    recalculateVolume() {
        this.playlist.forEach((element) => {
            element.AudioElement.volume = element.Volume * this.globalVolume;
        });
    }
}
