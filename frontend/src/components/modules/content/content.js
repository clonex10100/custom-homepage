class Content {
    constructor(module, adapter, id) {
        this.module = module;
        this.adapter = adapter;
        this.id = id;
    }

    //The initial HTML that is rendered.
    get _HTML() {
        return document.createElement('p');
    }

    //Renders the element, should only be called once by its module
    render() {
        this.div = this.module.div.querySelector('.content');
        this.div.appendChild(this._HTML);
    }

    //Called when the finish editing module button is pressed, should update the content and derender the edit mode changer
    update(){
        this._derenderEdit();
    }


    //Children must define these functions
    renderEdit() {

    }

    _derenderEdit() {

    }
}
