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
        let moduleAdapter = new ModuleAdapter(homepage);
        let name, id, bm, content_type;
        moduleAdapter.getModules(json => {
            json.forEach(module_hash => {
                console.log(module_hash);
                ({name, id, content_type} = module_hash);
                bm = new Module(name, moduleAdapter, id, content_type);
                bm.render();
            });
        });
    }
}
