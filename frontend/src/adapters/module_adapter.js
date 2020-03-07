class ModuleAdapter {
    constructor(homepage) {
        this.homepageId = homepage.id;
        this.jwt = homepage.jwt;
        this.url = `http://localhost:3000/homepages/${this.homepageId}/page_modules`;
    }

    getModules(callback) {
        let options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": this.jwt
          }
        }
        fetch(this.url, options).then(resp => resp.json()).then(callback);
    }

    updateModule(module, callback) {
        let options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": this.jwt
          },
            body: JSON.stringify({name: module.name})
        }
        fetch(`${this.url}/${module.id}`, options).then(resp => resp.json()).then(callback);
    }

    getContent(module, callback) {
        let options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": this.jwt
          }
        }
        fetch(`${this.url}/${module.id}/content`, options).then(resp => resp.json()).then(json => callback(json));
    }
}
