class App {
    static renderAuthentication() {
        if (document.cookie.includes('homepage-id')){
            console.log('ye');
        }
        else {
            let authenticator = new HomepageAuthenticator
            authenticator.render()
        }
    }

    static renderHomepage(homepage) {
        let adapters = {
            module: new ModuleAdapter(homepage),
            note: new NoteAdapter(homepage),
            bookmark: new BookmarkAdapter(homepage)

        }
        let name, id, bm, content_type;
        adapters.module.getModules(json => {
            json.forEach(module_hash => {
                console.log(module_hash);
                ({name, id, content_type} = module_hash);
                bm = new Module(name, adapters, id, content_type);
                bm.render();
            });
        });
    }
}
