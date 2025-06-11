import { AbstractView } from "./AbstractView.js"
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'
// import { navigateTo } from "./index.js"

export default class extends AbstractView {
    constructor(query){
        super(query)
        this.setTitle(query.post || `Achay's | ${location.pathname}`)
        // console.log('post...',query)
    }


// shadow-2xl lg:shadow-2xl
    async getHtml(){

        const frontPage = `
        <header class="text-white ">
            <div class="items-center border-slate-600 border-b flex xs:flex-col justify-between flex-row mx-auto max-w-4xl sm:px-6 lg:px-8">
            <a href="/"  ><h2 class="text-3xl  font-bold text-gray-900 dark:text-white">Achay's Corner</h2></a>
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

        <main class="mt-20">
            <div class="flex flex-col space-y-10 justify-between px-4 mx-auto max-w-screen-xl ">
                <div class="flex flex-col w-full items-center">
                    <p class="text-3xl mb-5 font-bold text-white">Projects</p>

                    <div class="flex flex-row space-x-4">

                        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img class="rounded-t-lg w-full" src="https://raw.githubusercontent.com/Achay009/latch_go/refs/heads/main/screen2.png" alt="" />
                            </a>
                            <div class="p-5">
                                <a href="#">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Latch Go</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">An Interpreter in Go Language </p>
                                <a href="https://github.com/Achay009/latch_go" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                   check it out 
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </a>
                            </div>
                        </div>


                        

                        
                    </div>
                </div>
            </div>
        </main>
        `

// // pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased
        return this.query.post ? await this.getMarkdownPost() : frontPage
    }
}


{/* <article class="flex text-gray-300 dark:text-gray-200 text-base flex-col text-white items-start justify-between">
                        <div class="flex items-center gap-x-4 text-base">
                            <time datetime="2020-03-16" class="text-gray-400"><i>Nov 21, 2024</i></time>
                        </div>
                        <div class="group relative">
                            <h3 class="mt-3 text-lg/6 font-semibold text-blue-400  group-hover:text-blue-600">
                                <a href="/?post=hello">
                                    <span class="absolute inset-0"></span>
                                    Hello world !!
                                </a>
                            </h3>
                            <p class="mt-5 line-clamp-3">This is the first post on this blog i hope i get to do more and more !!</p>
                        </div>
                    </article> */}


                    // <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    //     <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt="">
                    //     <div class="flex flex-col justify-between p-4 leading-normal">
                    //         <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    //         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    //     </div>
                    // </a>



