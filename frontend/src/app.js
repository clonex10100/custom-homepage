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
        console.log(homepage);
    }
}
