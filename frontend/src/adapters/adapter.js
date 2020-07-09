class Adapter {
    constructor(homepage) {
        this.homepageId = homepage.id;
        this.jwt = homepage.jwt;
        this.url = `http://localhost:3000/homepage`;
    }

    options() {
        return {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": this.jwt
            }

        }
    }
}
