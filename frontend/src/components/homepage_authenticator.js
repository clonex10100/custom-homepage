class HomepageAuthenticator {
    constructor(app) {
        this.adapter = HomepageAdapter;
        this.app = app;
    }
    get loginFormHtml() {
        let form = document.createElement('form');

        let title = document.createElement('h3');
        title.textContent = "Login to A Homepage";
        form.appendChild(title);

        form.appendChild(document.createElement('br'));

        let name_label = document.createElement('label');
        name_label.textContent = "Homepage Name: ";
        form.appendChild(name_label);

        let name = document.createElement('input');
        name.type = 'text';
        name.id = 'loginName';
        form.appendChild(name);

        form.appendChild(document.createElement('br'));

        let password_label = document.createElement('label');
        password_label.textContent = "Homepage Password: ";
        form.appendChild(password_label);

        let password = document.createElement('input');
        password.type = 'password';
        password.id = 'loginPassword'
        form.appendChild(password);

        form.appendChild(document.createElement('br'));

        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Login to a Homepage';
        form.appendChild(submit);

        form.addEventListener('submit', this.authenticate.bind(this));

        return form;
    }

    authenticate(e) {
        e.preventDefault();
        let name = e.target.querySelector('#loginName').value;
        let password = e.target.querySelector('#loginPassword').value;
        this.adapter.authenticate(name, password, json => {
            if(json.error) {
                this.renderError(json.error);
            } else {
                this.deRender();
                this.app.renderHomepage(new Homepage(json.name, json.id, json.jwt));
                document.cookie = `jwt=${json.jwt}`
            }
        });
    }

    get creationFormHtml() {
        let form = document.createElement('form');

        let title = document.createElement('h3');
        title.textContent = "Create A Homepage";
        form.appendChild(title);

        form.appendChild(document.createElement('br'));

        let name_label = document.createElement('label');
        name_label.textContent = "Homepage Name: ";
        form.appendChild(name_label);

        let name = document.createElement('input');
        name.type = 'text';
        name.id = 'createName'
        form.appendChild(name);

        form.appendChild(document.createElement('br'));

        let password_label = document.createElement('label');
        password_label.textContent = "Homepage Password: ";
        form.appendChild(password_label);

        let password = document.createElement('input');
        password.type = 'password';
        password.id = 'createPassword'
        form.appendChild(password);

        form.appendChild(document.createElement('br'));

        let password_conf_label = document.createElement('label');
        password_conf_label.textContent = "Homepage Password Confirmation: ";
        form.appendChild(password_conf_label);

        let password_conf = document.createElement('input');
        password_conf.type = 'password';
        password_conf.id = 'createPasswordConf'
        form.appendChild(password_conf);

        form.appendChild(document.createElement('br'));

        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Create A Homepage';
        form.appendChild(submit);

        form.addEventListener('submit', this.create.bind(this));

        return form;
    }

    create(e) {
        e.preventDefault();
        let name = e.target.querySelector('#createName').value;
        let password = e.target.querySelector('#createPassword').value;
        let password_conf = e.target.querySelector('#createPasswordConf').value;

        this.adapter.create(name, password, password_conf, json => {
                console.log(json)
            if(json.error) {
                this.renderError(json.error);
            } else {
                this.deRender();
                this.app.renderHomepage(new Homepage(json.name, json.id, json.jwt));
                document.cookie = `jwt=${json.jwt}`
            }
        });
    }
    getAuthenticationFormHTML() {
        this.formDiv = document.createElement('div');
        let errors = document.createElement('p');
        errors.classList.add('errors');
        this.formDiv.appendChild(errors);
        this.formDiv.appendChild(this.loginFormHtml);
        this.formDiv.appendChild(this.creationFormHtml);
        return this.formDiv;
    }

    render() {
        document.querySelector('.titlebar').appendChild(this.getAuthenticationFormHTML());
    }

    deRender() {
        this.formDiv.remove();
    }


    renderError(error) {
       this.formDiv.querySelector('.errors').textContent = error;
    }
}
