class App {
    start() {
        this.renderAuthentication();
    }
    renderAuthentication() {
        let authenticator = new HomepageAuthenticator(this)
        if (document.cookie.includes('homepage-name')){
            authenticator.authenticate(getCookie('homepage-name'))
        }
        else {
            authenticator.render()
        }
    }

    renderHomepage(homepage) {
        this.adapters = {
            module: new ModuleAdapter(homepage),
            note: new NoteAdapter(homepage),
            bookmark: new BookmarkAdapter(homepage)

        }
        let name, id, bm, content_type;
        this.adapters.module.getModules(json => {
            json.forEach(module_hash => {
                ({name, id, content_type} = module_hash);
                bm = new Module(name, this.adapters, id, content_type);
                bm.render();
            });
        });
        this.form = new Form(this.adapters);
        this.form.render();
    }
}
