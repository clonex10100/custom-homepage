class App {
    static renderAuthentication() {
        if (document.cookie.includes('homepage-id')){
            console.log('ye');
        }
        else {
            let authenticator = new HomepageAuthenticator
            document.querySelector('header').appendChild(authenticator.getAuthenticationFormHTML());
        }
    }

    static renderHomepage(homepage) {
        console.log(homepage);
    }
}
