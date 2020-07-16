class HomepageAuthAdapter extends Adapter {
    login(name, password, callback) {
        let options = this.options();
        options.method = "POST";
        options.body = JSON.stringify({
            name: name,
            password: password
        })

        fetch(this.url + "/login", options)
            .then(
                resp => resp.json()
            ).then(
                json => callback(json)
        );
    }

    create(name, password, password_confirmation, callback) {
        let options = this.options();
        options.method = "POST",
        options.body = JSON.stringify({
              homepage: {
                  name: name,
                  password: password,
                  password_confirmation: password_confirmation
              }
        })

        fetch(this.url, options)
            .then(
                resp => resp.json()
            ).then(
                json => callback(json)
        );
    }

    getHomepage(callback) {
        let options = this.options();
        console.log(this.url);

        fetch(this.url, options)
            .then(
                resp => {console.log(resp); return resp.json()}
            ).then(
                json => callback(json)
            );
    }
}
