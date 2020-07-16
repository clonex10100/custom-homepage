class Adapter {
    constructor() {
        this.url = `http://localhost:3000/homepage`;
    }

    options() {
        return {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }

        }
    }
}
