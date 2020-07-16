class HomepageAdapter extends Adapter {
    logout(callback) {
        let options = this.options();
        options.method = "POST";

        fetch(this.url + "/logout", options).then(resp => callback());
    }
}
