import { AbstractView } from "./AbstractView.js"
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'
// import { navigateTo } from "./index.js"

export default class extends AbstractView {
    constructor(query){
        super(query)
        this.setTitle(query.post || "Achay's")
        // console.log('post...',query)
    }


// shadow-2xl lg:shadow-2xl
    async getHtml(){

        const frontPage = `
        <header class="text-white ">
            <div class="items-center border-slate-600 border-b flex xs:flex-col justify-between flex-row mx-auto max-w-4xl sm:px-6 lg:px-6">
            <a href="/"  ><h3 class="text-xl  font-bold text-gray-900 dark:text-white">Achay's Corner</h3></a>
                <nav class="relative flex items-center justify-center h-16 text-white  lg:h-16 lg:px-6 lg:py-6">
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

        <main class="mt-20">
            <div class="flex flex-col space-y-10 justify-between px-4 mx-auto max-w-screen-xl ">
                <div class=" mx-auto ">
                    <p class="text-2xl mb-5 text-center font-bold text-white">Featured</p>

                    <article class="flex text-gray-300 max-w-[600px] dark:text-gray-200 text-base mb-5 flex-col text-white items-start justify-between">
                        <div class="flex items-center gap-x-4 text-base">
                            <time datetime="2025-02-22" class="text-gray-400"><i>March 31, 2025</i></time>
                        </div>
                        <div class="group relative">
                            <h3 class="mt-1 text-lg/6 font-semibold text-blue-400  group-hover:text-blue-600">
                                <a href="/?post=tcp-server">
                                    <span class="absolute inset-0"></span>
                                    Understanding TCP Protocol/Server by building one in Golang
                                </a>
                            </h3>
                            <p class="mt-1 line-clamp-3">Let's Understand TCP Server/Protocol by building one in Go, 
                            which is the foundation for how HTTP Server/Protocol is built..</p>
                        </div>
                    </article>

                    <article class="flex text-gray-300 max-w-[600px]  dark:text-gray-200 mb-5 text-base flex-col text-white items-start justify-between">
                        <div class="flex items-center gap-x-4 text-base">
                            <time datetime="2025-02-22" class="text-gray-400"><i>Feb 22, 2025</i></time>
                        </div>
                        <div class="group relative">
                            <h3 class="mt-1 text-lg/6 font-semibold text-blue-400  group-hover:text-blue-600">
                                <a href="/?post=payment-system-design">
                                    <span class="absolute inset-0"></span>
                                    System Design Study 01 - Payment System 
                                </a>
                            </h3>
                            <p class="mt-1 line-clamp-3">Let's talk about a payment system design for interviews</p>
                        </div>
                    </article>
            </div>
            </div>
        </main>
        `

// // pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased
        return this.query.post ? await this.getMarkdownPost() : frontPage
    }
}






