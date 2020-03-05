class Homepage {
    constructor(name, id, jwt) {
        this.name = name;
        this.id = id;
        this.jwt = jwt;
        this.adapter = HomepageAdapter
    }
}
