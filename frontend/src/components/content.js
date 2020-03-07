class Content {
    constructor(module, adapter, id) {
        this.module = module;
        this.adapter = adapter;
        this.id = id;
    }

    //The initial HTML that is rendered.
    getHTML() {
        return document.createElement('p');
    }

    //Renders the element, should only be called once
    render() {
        this.div = this.module.div.querySelector('.content');
        this.div.appendChild(this.getHTML());
    }

    update(){
        this.derenderEdit();
    }


    //Should put the content into editing mode E.G. Adds a form to add new bookmarks for the bookmark container
    renderEdit() {

    }

    derenderEdit() {

    }
}
