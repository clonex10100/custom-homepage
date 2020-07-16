class App {
    start() {
        //Attempts to get the homepage. If a jwt cookie is in the httpOnly header it will succeed and login, else authenticator will render login
        let authenticator = new HomepageAuthenticator(this.renderHomepage.bind(this))
        authenticator.authenticate();
    }

    renderHomepage() {
        //Bind api adapters
        this.adapters = {
            module: new ModuleAdapter(),
            note: new NoteAdapter(),
            bookmark: new BookmarkAdapter(),
            homepage: new HomepageAdapter()

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
