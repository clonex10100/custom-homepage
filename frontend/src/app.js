class App {
    start() {
        this.renderAuthentication();
    }
    renderAuthentication() {
        if (document.cookie.includes('homepage-id')){
            console.log('ye');
        }
        else {
            let authenticator = new HomepageAuthenticator(this)
            authenticator.render()
        }
    }

    renderHomepage(homepage) {
        this.adapters = {
            module: new ModuleAdapter(homepage),
            note: new NoteAdapter(homepage),
            bookmark: new BookmarkAdapter(homepage)

        }
        let name, id, bm, content_type;
        this.adapters.module.getModules(json => {
            this.modules = json.map(module_hash => {
                ({name, id, content_type} = module_hash);
                bm = new Module(name, this.adapters, id, content_type);
                bm.render();
                return bm
            });
            document.querySelector('.titlebar').appendChild(this.getSortForm());
        });
        document.querySelector('main').appendChild(this.newModuleForm());
    }

    getSortForm() {
        let form = document.createElement('form');
        for(let i = 0; i < this.modules.length; i++){
            let slot = document.createElement('div');
            slot.classList.add('slot')
            slot.dataset.sortPriority = i;
            slot.ondragover = e => {
                e.preventDefault();
            };
            slot.ondrop = function(e) {
                e.preventDefault();
                let originalP = this.querySelector('p');

                let sourceSlot = this.parentNode.querySelector(`[data-sort-priority='${e.dataTransfer.getData('slot')}'`);
                let newP = sourceSlot.querySelector('p');
                if (newP !== originalP) {
                this.querySelector('p').remove();
                sourceSlot.querySelector('p').remove();

                this.appendChild(newP);
                sourceSlot.appendChild(originalP);
                }
            }
            let p = document.createElement('p');
            p.draggable = true;
            p.dataset.id = this.modules[i].id;
            p.textContent = this.modules[i].name;
            p.ondragstart = e => {
                e.dataTransfer.setData('slot', e.target.parentNode.dataset.sortPriority);
            };
            slot.appendChild(p);
            form.appendChild(slot);

        }
        let submit = document.createElement('input');
        submit.type = 'submit';
        form.appendChild(submit);
        form.addEventListener('submit', e => {
            e.preventDefault();
            destroyAllChildren(document.getElementById('module-container'));
            let slots = form.querySelectorAll('div');
            let timeout = 0;
            slots.forEach(slot => {
                let moduleId = slot.querySelector('p').dataset.id
                let sortPriority = slot.dataset.sortPriority;
                setTimeout(() => {
                    this.adapters.module.updateModule(moduleId, {sort_priority: sortPriority}, json => {
                        let module = this.modules.find(module => module.id === json.id)
                        module.render()
                    });
                }, timeout);
                timeout += 50;
            });
        });
        return form;
    }

    newModuleForm() {
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
            this.adapters.module.postModule({
                name: name,
                type: type
            },
            json => {
                let module = new Module(json.name, this.adapters, json.id, json.content_type)
                module.render();
            });
        });
        return form;
    }
}
