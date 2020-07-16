class ModuleAdapter extends ContentAdapter {
    constructor(hompage) {
        super(hompage);
        this.url += '/page_modules'
    }
    getModules(callback) {
        let options = this.options()
        fetch(this.url, options).then(resp => resp.json()).then(callback);
    }

    updateModule(id, content, callback) {
        let options = this.options()
        options.method = "PATCH";
        options.body = JSON.stringify({page_module: content});
        fetch(`${this.url}/${id}`, options).then(resp => resp.json()).then(callback);
    }

    postModule(content, callback) {
        let options = this.options()
        options.method = "POST"
        options.body = JSON.stringify({page_module: content});
        fetch(this.url, options).then(resp => resp.json()).then(callback);
    }

    getContent(id, callback) {
        let options = this.options()
        fetch(`${this.url}/${id}/content`, options).then(resp => resp.json()).then(json => callback(json));
    }
}
