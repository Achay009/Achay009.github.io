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
                    


                        <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="bg-gray-800 rounded-lg p-6 shadow-xl flex flex-col">
                                    <h3 class="text-lg font-bold mb-2 text-white">Tunnelsh</h3>
                                    <p class="text-sm text-gray-200 flex-grow"> Built and Deployed on a VPS A Reverse tunneling application with a client and server component that lets aids in exposing local applications to the web by providing public URLs to localhost applications</p>
                                    <div class="mt-4">
                                        <div class="flex flex-wrap gap-2 mb-4">
                                            <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Go</span>
                                            <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">NextJS</span>
                                            <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Nginx</span>
                                            <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Docker</span>
                                        </div>
                                        <a href="https://tunnelsh.top" target="_blank" class="font-semibold text-indigo-400 hover:underline">View Project &rarr;</a>
                                    </div>
                                </div>

                                <div class="bg-gray-800 rounded-lg p-6 shadow-xl flex flex-col">
                                    <h3 class="text-lg font-bold mb-2 text-white">Tunnelshd</h3>
                                    <p class="text-sm text-gray-200 flex-grow">Client Application to Tunnelsh used to create secure https tunnels to expose local applications to the web </p>
                                    <div class="mt-4">
                                        <div class="flex flex-wrap gap-2 mb-4">
                                            <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Go</span>
                                        </div>
                                        <a href="https://github.com/Achay009/tunnelshd" target="_blank" class="font-semibold text-indigo-400 hover:underline">View Project &rarr;</a>
                                    </div>
                                </div>

                                <div class="bg-gray-800 rounded-lg p-6 shadow-xl flex flex-col">
                                    <h3 class="text-lg font-bold mb-2 text-white">Latch Go</h3>
                                    <p class="text-sm text-gray-200 flex-grow">Developed a REPL around an Abstract Syntax Tree (AST) based interpreter for a custom C-style language, demonstrating deep understanding of compiler design.</p>
                                    <div class="mt-4">
                                        <div class="flex flex-wrap gap-2 mb-4">
                                            <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Go</span>
                                        </div>
                                        <a href="https://github.com/Achay009/latch_go" target="_blank" class="font-semibold text-indigo-400 hover:underline">View Project &rarr;</a>
                                    </div>
                                </div>

                                <div class="bg-gray-800 rounded-lg p-6 shadow-xl flex flex-col">
                                    <h3 class="text-lg font-bold mb-2 text-white">Codr</h3>
                                    <p class="text-sm text-gray-200 flex-grow">A cutting-edge frontend project that leverages AI (LLM integration) to generate web project scaffolding on demand, accelerating initial development phases.</p>
                                    <div class="mt-4">
                                        <div class="flex flex-wrap gap-2 mb-4">
                                            <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">NextJS</span>
                                            <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Docker</span>
                                        </div>
                                        <a href="https://codr-prod.civai.co/" target="_blank" class="font-semibold text-indigo-400 hover:underline">View Project &rarr;</a>
                                    </div>
                                </div>
                                <div class="bg-gray-800 rounded-lg p-6 shadow-xl flex flex-col">
                                    <h3 class="text-lg font-bold mb-2 text-white">My Website</h3>
                                    <p class="text-sm text-gray-200 flex-grow">This entire website is a SPA(Single page Application) built with just HTML/CSS and JS</p>
                                    <div class="mt-4">
                                        <div class="flex flex-wrap gap-2 mb-4">
                                            <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">HTML/CSS</span>
                                            <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">JS</span>
                                        </div>
                                        <a href="https://github.com/Achay009/Achay009.github.io" target="_blank" class="font-semibold text-indigo-400 hover:underline">View Project &rarr;</a>
                                    </div>
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



