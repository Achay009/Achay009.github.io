export class AbstractView {
    constructor(query) {
        this.query = query;
    }

    setTitle (title){
        document.title=title
    }

    async getHtml(){
        return ''
    }
}