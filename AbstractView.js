import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

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

    async getMarkdownPost(){
        let response = await fetch(`./${this.query.post}.md`)
        if (!response.ok) window.location.replace('/404.html')
        let text = await response.text()

        const markdown = marked.parse(text)
        // const md = markdownIt()
        // const result = md.render(text);

        return `
        <header class="text-white ">
            <div class="items-center border-slate-600 border-b flex xs:flex-col justify-between flex-row mx-auto max-w-4xl sm:px-6 lg:px-8">
                <a a href="/" ><h2 class="text-3xl  font-bold text-gray-900 dark:text-white">Achay's Corner</h2></a>
                <nav class="relative flex items-center justify-center h-16 text-white  lg:h-24 lg:px-8 lg:py-6">
                    <div class="flex-shrink-0 cursor-pointer">
                        <a href="/" title="" data-link class="text-xl font-bold text-white transition-all duration-200 hover:text-blue-600 ${location.pathname === "/" ? "text-blue-600" : ""} focus:text-blue-600"> Home </a>
                    </div>

                    <div class="hidden ml-10 lg:flex lg:items-center lg:space-x-10">
                        <a href="/posts" title="" data-link class="text-xl font-bold text-white transition-all duration-200 hover:text-blue-600 ${location.pathname == "/posts" ? "text-blue-600" : ""} focus:text-blue-600 "> Posts </a>

                        <a href="/projects" title="" data-link class="text-xl font-bold text-white transition-all duration-200 hover:text-blue-600 ${location.pathname == "/projects" ? "text-blue-600" : ""} focus:text-blue-600"> Projects </a>
                    </div>
                </nav>
            </div>
        </header>
        <article class=" bg-transparent markdown-body">
            ${markdown}
        </article>

        `
    }
}