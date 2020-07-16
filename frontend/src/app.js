class App {
    start() {
        //Attempts to get the homepage. If a jwt cookie is in the httpOnly header it will suceed and login, else authenticator will render login
        let authenticator = new HomepageAuthenticator(this)
        authenticator.getHomepage();
    }

    renderHomepage(homepage) {
        //Bind api adapters
        this.adapters = {
            module: new ModuleAdapter(homepage),
            note: new NoteAdapter(homepage),
            bookmark: new BookmarkAdapter(homepage),
            homepage: new HomepageAdapter(homepage)

        }
        let module, name, id, content_type;
        //Fetch modules from api, create and render them.
        this.adapters.module.getModules(json => {
            json.forEach(module_hash => {
                ({name, id, content_type} = module_hash);
                module = new Module(name, this.adapters, id, content_type);
                module.render();
            });
        });
        //Render the page settings form
        this.form = new Form(this.adapters, this.logout.bind(this));
        this.form.render();
    }

    logout() {
        document.querySelector('.buttons').remove();
        destroyAllChildren(document.getElementById('module-container'));
        this.start();
    }
}
