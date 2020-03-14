class App {
    start() {
        this.renderAuthentication();
    }
    renderAuthentication() {
        if (document.cookie.includes('homepage-id')){
            console.log('ye');
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
        console.log(Module.all);
        this.form = new Form(this.adapters);
        this.form.render();
    }
}
