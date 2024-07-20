import { AbstractView } from "./AbstractView.js"
// import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'
import { navigateTo } from "./index.js"

export default class extends AbstractView {
    constructor(query){
        super(query)
        this.setTitle(query.post || "Achay's")
        console.log('post...',query)
    }

    // async readFileFromServer(file){
    //     let rawFile = await fetch()
    // }

    async getMarkdownPost(){

        let response = await fetch(`./${this.query.post}.md`)
        if (!response.ok) window.location.replace('/404.html')
        let text = await response.text()
        // console.log('this is the text', text)
        // const markdown = marked.parse(text)

        const md = markdownIt()
        const result = md.render(text);


        console.log('markdown...',result)
        // return `
        // <a href="/" class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
        //     <div class="flex justify-center py-5">
        //         ${markdown}
        //     </div>
        // `

        return `<article class=" markdown-body">${result}</article>`
    }


    async getHtml(){

        const frontPage = `
        <header class="text-white lg:py-8">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav class="relative flex items-center justify-center h-16 text-white lg:rounded-md shadow-2xl lg:shadow-2xl lg:h-24 lg:px-8 lg:py-6">
                    <div class="flex-shrink-0 cursor-pointer">
                        <a href="/" title="" data-link class="text-2xl font-bold text-white transition-all duration-200 hover:text-blue-600 ${location.pathname === "/" ? "text-blue-600" : ""} focus:text-blue-600"> Home </a>
                    </div>

                    <div class="hidden ml-10 lg:flex lg:items-center lg:space-x-10">
                        <a href="/posts" title="" data-link class="text-xl font-bold text-white transition-all duration-200 hover:text-blue-600 ${location.pathname == "/posts" ? "text-blue-600" : ""} focus:text-blue-600 "> Posts </a>

                        <a href="/projects" title="" data-link class="text-xl font-bold text-white transition-all duration-200 hover:text-blue-600 ${location.pathname == "/projects" ? "text-blue-600" : ""} focus:text-blue-600"> Projects </a>
                    </div>
                </nav>
            </div>
        </header>

        <figure class="md:flex max-w-4xl mx-auto shadow-2xl  rounded-lg p-8 md:p-0 ">
            <img class="w-24 h-24 md:w-24 md:h-auto md:rounded-md rounded-full mx-auto" src="https://firebasestorage.googleapis.com/v0/b/react-my-burger-26c0d.appspot.com/o/profile.jpeg?alt=media&token=3f4ea7fb-86fe-42ad-aabd-b8f1f5137cdd" alt="" width="384" height="512">
            <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                    <p class="text-base font-medium">
                        “Hi My name is Uche and this is where I'd post things I learn about , I like to learn/build stuff I find interesting, would be posting my project and some writings on here ...cheers!! ”
                    </p>
                </blockquote>
            </div>
        </figure>
        `


        return this.query.post ? await this.getMarkdownPost() : frontPage
    }
}



















{/* <figcaption class="font-medium">
    <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
    </div>
    <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
    </div>
</figcaption> */}