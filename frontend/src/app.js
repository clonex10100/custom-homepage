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
        let bookmarkModuleAdapter = new BookmarkModuleAdapter(homepage);
        let name, id, bm;
        bookmarkModuleAdapter.getBookmarkModules(json => {
            json.forEach(module_hash => {
                console.log(module_hash);
                ({name, id} = module_hash);
                bm = new BookmarkModule(name, bookmarkModuleAdapter, id);
                bm.render();
            });
        });
    }
}
