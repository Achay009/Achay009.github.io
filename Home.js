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
            <div class="items-center border-slate-600 border-b flex xs:flex-col justify-between flex-row mx-auto max-w-4xl sm:px-6 lg:px-8">
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

        <main class="mt-10">
            <div class="flex flex-col space-y-10 justify-between px-4 mx-auto max-w-screen-xl ">
                <article class="mx-auto border-slate-600 border-b w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header class="mb-4 lg:mb-6 not-format">
                        <address class="flex items-center mb-6 not-italic">
                            <div class=" mr-3 text-sm text-gray-900 dark:text-white">
                                <img class=" w-40 h-40 mx-auto rounded-full" src="./profile.jpeg" alt="">
                                <div class="flex flex-col mt-4 space-y-4 justify-center">
                                    <h1 class="text-4xl mx-auto font-bold text-gray-900 dark:text-white">Hello, I am Uche😅 !!</h1>
                                    <p class="text-xl text-gray-500 dark:text-gray-400 font-medium">
                                    Hi My name is Uche and I am A full-stack developer this is where I'd post things I learn about , I like to learn/build stuff I find interesting, would be posting my project and some writings on here ...cheers!!
                                </p>
                                </div>
                            </div>

                        </address>
                        <span class="text-xl text-gray-500 dark:text-gray-400 font-medium"> Social :   
                            <a href="https://github.com/achay009" target="_blank" rel="noopener noreferrer" class="cursor-pointer">
                                <i class="fab fa-github fa-fw  text-2xl transition-transform duration-300"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/uche-echesurum-570815184/" target="_blank" rel="noopener noreferrer" class="cursor-pointer">
                                <i class="fab fa-linkedin-in fa-fw text-2xl transition-transform duration-300"></i>
                            </a>

                            <a href="/resume.html" target="_blank" class="font-semibold text-indigo-400 hover:underline">View Resume &rarr;</a>
                            
                        </span>
                    </header>
                </article>
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







{/* <a href="/resume.html" target="_blank" rel="noopener noreferrer"
                            class="cursor-pointer">
                                <i class="fas fa-file-alt fa-fw mr-3 text-2xl transition-transform duration-300"></i>
                            </a> */}







{/* <figure class="md:flex max-w-4xl mx-auto shadow-2xl  rounded-lg p-8 md:p-0 ">
<img class="w-24 h-24 md:w-24 md:h-auto md:rounded-md rounded-full mx-auto" src="https://firebasestorage.googleapis.com/v0/b/react-my-burger-26c0d.appspot.com/o/profile.jpeg?alt=media&token=3f4ea7fb-86fe-42ad-aabd-b8f1f5137cdd" alt="" width="384" height="512">
<div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
        <p class="text-base font-medium">
            “Hi My name is Uche and this is where I'd post things I learn about , I like to learn/build stuff I find interesting, would be posting my project and some writings on here ...cheers!! ”
        </p>
    </blockquote>
</div>
</figure> */}




{/* <figcaption class="font-medium">
    <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
    </div>
    <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
    </div>
</figcaption> */}



