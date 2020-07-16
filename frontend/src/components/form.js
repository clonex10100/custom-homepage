class Form {
    constructor(adapters, logoutCallback) {
        this.adapters = adapters;
        this.logoutCallback = logoutCallback;
    }
    render() {
        this.div = this.getHTML()
        document.querySelector('.titlebar').appendChild(this.div);
    }

    reRenderButtons() {
        destroyAllChildren(this.div);
        this.div.appendChild(this.getButtonsHTML());
    }

    getHTML() {
        let div = document.createElement('div');
        div.appendChild(this.getButtonsHTML());
        div.classList.add('homepage-form');
        return div;
    }

    getButtonsHTML() {
        let div = document.createElement('div');
        div.classList.add('buttons');
        let sortButton = document.createElement('button');
        sortButton.onclick = e => this.formButtonHandler(e, this.getSortHTML);
        sortButton.textContent = 'Sort Modules';
        div.appendChild(sortButton);
        let newModuleButton = document.createElement('button');
        newModuleButton.textContent = 'Add A Module';
        newModuleButton.onclick = e => this.formButtonHandler(e, this.getModuleHTML);
        div.appendChild(newModuleButton);
        let pageSettingsButton = document.createElement('button');
        pageSettingsButton.textContent = 'Edit Page Settings';
        pageSettingsButton.onclick = e => this.formButtonHandler(e, this.getPageSettingsHTML);

        div.appendChild(pageSettingsButton);
        let logoutButton = document.createElement('button');
        logoutButton.textContent = "Logout Of Homepage";
        logoutButton.onclick = e => {
            this.adapters.homepage.logout(this.logoutCallback);
        }

        div.appendChild(logoutButton);
        return div;
    }

    formButtonHandler(e, formHTML) {
        e.preventDefault();
        let form = this.div.querySelector('form');
        form && form.remove();
        this.div.appendChild(formHTML.call(this));
    }

    getPageSettingsHTML() {
        return document.createElement('form');
    }

    getSortHTML() {
        let form = document.createElement('form');
        let slot_div = document.createElement('div');
        slot_div.style.overflow = "auto";

        for(let i = 0; i < Module.all.length; i++){
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
            p.dataset.id = Module.all[i].id;
            p.textContent = Module.all[i].name;
            p.ondragstart = e => {
                e.dataTransfer.setData('slot', e.target.parentNode.dataset.sortPriority);
            };
            slot.appendChild(p);
            slot.style.float = ("left")
            slot_div.appendChild(slot);

        }
        form.appendChild(slot_div);
        form.appendChild(document.createElement('br'));
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
                        let module = Module.all.find(module => module.id === json.id)
                        module.render()
                    });
                }, timeout);
                timeout += 50;
            });
            this.reRenderButtons();
        });
        return form;
    }

    getModuleHTML() {
        let form = document.createElement('form');
        let name_field_label = document.createElement('label');
        name_field_label.textContent = "Module Name: ";
        form.appendChild(name_field_label);
        let nameField = document.createElement('input');
        nameField.type = 'text';
        nameField.classList.add('module-name-field');
        form.appendChild(nameField);
        form.appendChild(document.createElement('br'));
        let label = document.createElement('label');
        label.textContent = "Module Type: ";
        form.appendChild(label);
        form.appendChild(document.createElement('br'));
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
            form.appendChild(document.createElement('br'));
            return radio;
        });
        let submit = document.createElement('input');
        submit.type = 'submit'
        submit.value = "Create Module"
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
                this.reRenderButtons();
            });
        });
        return form;
    }
}
