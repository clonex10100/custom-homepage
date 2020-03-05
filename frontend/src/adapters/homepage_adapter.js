class HomepageAdapter {
    static authenticate(name, callback) {
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              name: name
          })
        }

        fetch("http://localhost:3000/homepages/authenticate", options)
            .then(resp => resp.json())
            .then(json => callback(json))
        .catch(e => console.log('Error' + e));
    }
}
