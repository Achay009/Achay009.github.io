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


        // ----------------------------------------------------
        // Step 1: Configure marked.js to use a custom `highlight` function.
        // This function will be called for every code block in your markdown.
        // ----------------------------------------------------
        marked.setOptions({
            highlight: function(code, lang) {
                // Check if Prism.js has a specific language component loaded.
                // This prevents errors if a language is not supported.
                const language = Prism.languages[lang];
                if (language) {
                    // Use Prism.highlight to apply syntax highlighting.
                    return Prism.highlight(code, language, lang);
                }
                // If the language is not found, return the code as is.
                return code;
            },
            // It's also a good practice to set a custom renderer to ensure
            // the output HTML structure is what Prism.js expects.
            // The default marked renderer is usually sufficient.
        });

        const markdown = marked.parse(text)
        // const md = markdownIt()
        // const result = md.render(text);

        return `
        <header class="text-white ">
            <div class="items-center  pt-6  flex xs:flex-col  justify-between flex-row mx-auto max-w-4xl sm:px-6 lg:px-8">
                <a href="/" ><span class="text-3xl  font-bold text-blue-600"> &larr; Go Back</Span></a>
            </div>
        </header>
        <article class=" bg-transparent markdown-body">
            ${markdown}
        </article>

        `
    }
}