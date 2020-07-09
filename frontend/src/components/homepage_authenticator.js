class HomepageAuthenticator {
    constructor(app, adapter) {
        this.adapter = HomepageAdapter;
        this.app = app;
    }
    getAuthenticationFormHTML() {
        let form = document.createElement('form');
        let name = document.createElement('input');
        name.type = 'text';
        name.id = 'homepagename'
        form.appendChild(name);
        let submit = document.createElement('input');
        submit.type = 'submit';
        form.appendChild(submit);
        let p = document.createElement('p');
        p.classList.add('errors');
        form.appendChild(p);

        form.addEventListener('submit', this.authenticate.bind(this));

        this.form = form;

        return form;
    }

    render() {
        document.querySelector('.titlebar').appendChild(this.getAuthenticationFormHTML());
    }

    deRender() {
        this.form.remove();
    }

    authenticate(e) {
        e.preventDefault();
        this.adapter.authenticate(e.target.querySelector('#homepagename').value, json => {
            if(json.error) {
                this.renderError(json.error);
            } else {
                this.deRender();
                this.app.renderHomepage(new Homepage(json.name, json.id, json.jwt));
                document.cookie = `jwt=${json.jwt}`
            }
        });
    }

    renderError(error) {
       this.form.querySelector('.errors').textContent = error;
    }
}
