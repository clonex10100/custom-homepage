class HomepageAuthenticator {
    constructor(renderCallback) {
        this.adapter = new HomepageAuthAdapter();
        //callback to render homepage on authentication
        this.renderHomepageCallback = renderCallback;
        this.authenticating = false;
    }

    authenticate() {
        this.adapter.getHomepage(json =>{
            //If the json contains an error the jwt token doesn't exist or isn't valid, so render the auth form, otherwise we're done with auth and ready to render the app
            json.error ? this._render() : this.renderHomepageCallback()
        });
    }

    _login(e) {
        if (!this.authenticating) {
            e.preventDefault();

            this.authenticating = true;

            let name = e.target.querySelector('#loginName').value;
            let password = e.target.querySelector('#loginPassword').value;

            this.adapter.login(name, password, this._authCallback);
        }
        else {
            console.log('DENIED!');
        }
    }

    _create(e) {
        if (!this.authenticating) {
            e.preventDefault();

            this.authenticating = true;

            let name = e.target.querySelector('#createName').value;
            let password = e.target.querySelector('#createPassword').value;
            let password_conf = e.target.querySelector('#createPasswordConf').value;

            this.adapter.create(name, password, password_conf, this._authCallback);
        }
    }

    _authCallback = json => {
        if(json.error) {
            this._renderError(json.error);
            this.authenticating = false;
        } else {
            this._deRender();
            this.renderHomepageCallback();
        }
    }

    //Rendering methods
    _render() {
        document.querySelector('.titlebar').appendChild(this._formHTML);
    }

    _deRender() {
        this.formDiv.remove();
    }

    _renderError(error) {
       this.formDiv.querySelector('.errors').textContent = error;
    }

    //Generates the html for the create homepage form
    get _creationFormHtml() {
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

        form.addEventListener('submit', this._create.bind(this));

        return form;
    }

    //Generates the html for the login form
    get _loginFormHtml() {
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

        form.addEventListener('submit', this._login.bind(this));

        return form;
    }

    //Gets the full auth form html
    get  _formHTML() {
        this.formDiv = document.createElement('div');
        let errors = document.createElement('p');
        errors.classList.add('errors');
        this.formDiv.appendChild(errors);
        this.formDiv.appendChild(this._loginFormHtml);
        this.formDiv.appendChild(this._creationFormHtml);
        return this.formDiv;
    }
}
