import Home from "./Home.js"
import NotFound from "./NotFound.js"
import Posts from "./Posts.js"
import Projects from "./Projects.js"

export const navigateTo = (url)=> {
    history.pushState(null,null, url)
    router()
}

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getQuery = href => {
    // console.log('matching....:',href.split('?'))

    const string = href.split('?')[1]
    const query = new Map()

    if (string) {
        const pairs = string.split('&');
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            query[key] = decodeURIComponent(value.replace(/\+/g, ' '));
        }
    }
    // console.log('this are the params....:', query)
    return query
    // console.log('this are the params....:', query)
};

const router = async () => {
    const routes = [
        {path: '/', view: Home},
        {path: '/posts', view: Posts},
        {path: '/projects', view: Projects}
    ]

    const matches = routes.map(route => {
        console.log(pathToRegex(route.path))
        return {
            route : route,
            matched : route.path == location.pathname.match(pathToRegex(route.path))
        }
    })

    // console.log(matches)

    const match = matches.find(item => item.matched)
    // console.log("match : ", getParams(match))

    const view = new match.route.view(getQuery(location.href))

    if (!match){
        view = new NotFound()
    }

    document.querySelector('#app').innerHTML = await view.getHtml()

    Prism.highlightAll();
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

window.addEventListener("popstate", router);
