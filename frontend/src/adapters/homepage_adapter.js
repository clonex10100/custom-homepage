class HomepageAdapter {
    static authenticate(name, password, callback) {
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              name: name,
              password: password
          })
        }

        fetch("http://localhost:3000/homepage/authenticate", options)
            .then(resp => resp.json())
            .then(json => callback(json)).catch(e => console.log(e));
    }

    static create(name, password, password_confirmation, callback) {
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              homepage: {
                  name: name,
                  password: password,
                  password_confirmation: password_confirmation
              }
          })
        }

        fetch("http://localhost:3000/homepage", options)
            .then(resp => resp.json())
            .then(json => callback(json)).catch(e => console.log(e));
    }

    static getHomepage(jwt, callback) {
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": jwt
            }
        }

        fetch("http://localhost:3000/homepage", options)
            .then(resp => resp.json())
            .then(json => callback(json)).catch(e => console.log(e));
    }
}
