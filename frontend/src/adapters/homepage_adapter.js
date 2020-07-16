class HomepageAdapter extends ContentAdapter {
    logout() {
        let options = this.options();
        options.method = "POST";
        fetch(this.url + "/logout", options).then(resp => console.log(resp))
    }
}
