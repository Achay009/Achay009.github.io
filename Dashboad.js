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

        <div class="max-w-4xl mx-auto px-10 my-2 py-6  rounded-lg shadow-2xl">
            <div class="mt-2">
                <p class="font-bold text-2xl ">Hi My name is Uche and this is where I'd post things I learn about , I like to build stuff I find interesting, would be posting my project and article on here ...cheers!! </p>
            </div>
        </div>
        `
    }
}

