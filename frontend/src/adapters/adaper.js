class Adapter {
    constructor(homepage) {
        this.homepageId = homepage.id;
        this.jwt = homepage.jwt;
        this.url = `http://localhost:3000/homepages/${this.homepageId}/page_modules`;
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
