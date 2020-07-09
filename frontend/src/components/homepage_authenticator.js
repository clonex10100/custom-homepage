class HomepageAuthenticator {
    constructor(app) {
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

        form.addEventListener('submit', e => {
            e.preventDefault();
            this.authenticate(e.target.querySelector('#homepagename').value);
        }
        );

        this.form = form;

        return form;
    }

    render() {
        document.querySelector('.titlebar').appendChild(this.getAuthenticationFormHTML());
        this.rendered = true;
    }

    deRender() {
        this.form.remove();
    }

    authenticate(homepageName) {
        this.adapter.authenticate(homepageName, json => {
            if(json.error) {
                this.renderError(json.error);
            } else {
                if (this.rendered) this.deRender();
                this.app.renderHomepage(new Homepage(json.name, json.id, json.jwt));
                document.cookie = `homepage-name=${json.name}`
            }
        });
    }

    renderError(error) {
       this.form.querySelector('.errors').textContent = error;
    }
}
