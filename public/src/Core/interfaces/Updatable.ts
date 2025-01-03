interface Updatable{
    /*earlyUpdate() : void*/
    update() : void;
    /*lateUpdate() : void*/
}

/*export only after definition, otherwise typescript will raise errors*/
export default Updatable;
export {
    Updatable
}
