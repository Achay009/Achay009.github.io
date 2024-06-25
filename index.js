import Dashboad from "./Dashboad.js"

const navigateTo = (url)=> {
    history.pushState(null,null, url)
    router()
}


const router = async () => {
    const routes = [
        {path: '/', view: Dashboad},
        // {path: '/posts', view: () => console.log("viewing post")},
        // {path: '/settings', view: () => console.log("viewing settings")}
    ]

    const matches = routes.map(route => {
        return {
            route : route,
            matched : route.path == location.pathname
        }
    })

    console.log(matches)

    const match = matches.find(item => item.matched)

    const view = new match.route.view()

    document.querySelector('#app').innerHTML = await view.getHtml()
}


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")){
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router()
})





export class ExtendedView {
    constructor(){

    }

    setTitle (title){
        document.title=title
    }

    async getHtml(){
        return ''
    }
}