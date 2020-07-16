class HomepageAuthAdapter extends Adapter {
    authenticate(name, password, callback) {
        let options = this.options();
          options.method = "POST";
          options.body = JSON.stringify({
              name: name,
              password: password
          })
        fetch(this.url + "/authenticate", options)
            .then(resp => resp.json())
            .then(json => callback(json))
            .catch(e => console.log(e));
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
            .then(resp => resp.json())
            .then(json => callback(json)).catch(e => console.log(e));
    }

    getHomepage(callback) {
        let options = this.options();
        console.log(this.url);

        fetch(this.url, options)
            .then(resp => {console.log(resp); return resp.json()})
            .then(json => callback(json)).catch(e => console.log(e));
    }
}
