class App {
    start() {
        this.renderAuthentication();
    }
    renderAuthentication() {
        if (document.cookie.includes('jwt')){
            let jwt = getCookie('jwt');
            HomepageAdapter.getHomepage(jwt, json => {
                this.renderHomepage(new Homepage(json.name, json.id, jwt));
            });
        }
        else {
            let authenticator = new HomepageAuthenticator(this)
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
