import { ExtendedView } from "./ExtendedView.js"

export default class extends ExtendedView {
    constructor(){
        super()
        this.setTitle("Achay | Corner")
    }


    async getHtml(){
        return `
        <header class="text-white lg:py-8">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav class="relative flex items-center justify-center h-16 text-white lg:rounded-md shadow-2xl lg:shadow-2xl lg:h-24 lg:px-8 lg:py-6">
                    <div class="flex-shrink-0 cursor-pointer">
                        <p class=" font-bold text-2xl">Achay</p>
                    </div>

                    <div class="hidden ml-10 lg:flex lg:items-center lg:space-x-10">
                        <a href="#" title="" class="text-xl font-bold text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Posts </a>

                        <a href="#" title="" class="text-xl font-bold text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Projects </a>
                    </div>
                </nav>
            </div>
        </header>

        <figure class="md:flex max-w-4xl mx-auto shadow-2xl bg-slate-100 rounded-lg p-8 md:p-0 dark:bg-slate-800">
            <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-md rounded-full mx-auto" src="./profile.jpeg" alt="" width="384" height="512">
            <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                    <p class="text-lg font-medium">
                        “Hi My name is Uche and this is where I'd post things I learn about , I like to learn/build stuff I find interesting, would be posting my project and article on here ...cheers!! ”
                    </p>
                </blockquote>
            </div>
        </figure>
        `
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