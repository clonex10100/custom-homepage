class Module {
    constructor(name) {
        this.name = name;
        this.content = content;
        this.container = document.getElementById('module-container')
    }

    getHeaderHTML() {
        let header = document.createElement('header');

        let title = document.createElement('h3');
        title.classList.add('module-title');
        title.innerText = this.name;
        header.appendChild(title);

        return header;
    }
    

    getHTML() {
        let div = document.createElement('div');
        div.classList.add('module');
        
        div.appendChild(this.getHeaderHTML());

        div.appendChild(document.createElement('hr'));

        div.appendChild(this.getContentHTML());

        div.appendChild(document.createElement('hr'));

        div.appendChild(this.getFooterHTML());

        return div;
    }

    render() {
        this.div = this.getHTML();
        this.rendered = true
        this.container.appendChild(this.div);
    }
}
