class Content {
    constructor(module, id) {
        this.module = module;
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

    }


    //Should put the content into editing mode E.G. Adds a form to add new bookmarks for the bookmark container
    renderEdit() {

    }

    finishEditing(){
        this.update();
        this.derenderEdit();
    }

    derenderEdit() {

    }
}
