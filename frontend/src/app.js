class App {
    static renderAuthentication() {
        if (document.cookie.includes('homepage-id')){
            console.log('ye');
        }
        else {
            let authenticator = new HomepageAuthenticator
            authenticator.render()
        }
    }

    static renderHomepage(homepage) {
        let adapters = {
            module: new ModuleAdapter(homepage),
            note: new NoteAdapter(homepage),
            bookmark: new BookmarkAdapter(homepage)

        }
        let name, id, bm, content_type;
        adapters.module.getModules(json => {
            json.forEach(module_hash => {
                console.log(module_hash);
                ({name, id, content_type} = module_hash);
                bm = new Module(name, adapters, id, content_type);
                bm.render();
            });
        });
        document.querySelector('main').appendChild(this.newModuleForm(adapters));
    }

    static newModuleForm(adapters) {
        let form = document.createElement('form');
        let nameField = document.createElement('input');
        nameField.type = 'text';
        nameField.classList.add('module-name-field');
        form.appendChild(nameField);
        let radios = ['BookmarkContainer', 'Note'].map(type => {
            let label = document.createElement('label');
            label.textContent = type;
            form.appendChild(label);
            let radio = document.createElement('input');
            radio.type = 'radio';
            radio.id = type;
            radio.value = type;
            radio.name = 'type';
            form.appendChild(radio);
            return radio;
        });
        let submit = document.createElement('input');
        submit.type = 'submit'
        form.appendChild(submit);
        form.addEventListener('submit', e => {
            e.preventDefault()
            let name = nameField.value
            let type = radios.find(r => r.checked).value;
            adapters.module.postModule({
                name: name,
                type: type
            },
            json => {
                let module = new Module(json.name, adapters, json.id, json.content_type)
                module.render();
            });
        });
        return form;
    }
}
