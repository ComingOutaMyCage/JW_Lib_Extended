// create document click that watches the nav links only
document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a")) {
        return;
    }
    e.preventDefault();
    route();
});
const routes = {
    404: {
        template: "/templates/404.html",
        title: "404",
        description: "Page not found",
    },
    "/": {
        template: "/templates/index.html",
        title: "Home",
        description: "This is the home page",
    },
    "/about": {
        template: "/templates/about.html",
        title: "About Us",
        description: "This is the about page",
    },
    "/contact": {
        template: "/templates/contact.html",
        title: "Contact Us",
        description: "This is the contact page",
    },
};
const route = (event) => {
    event = event || window.event; // get window.event if event argument not provided
    event.preventDefault();
    // window.history.pushState(state, unused, target link);
    window.history.pushState({}, "", event.target.href);
    locationHandler();
};
const locationHandler = async () => {
    let location = window.location.pathname; // get the url path
    // if the path length is 0, set it to primary page route
    if (location.length === 0) {
        location = "/";
    }
    // get the route object from the urlRoutes object
    const route = routes[location] || routes["404"];
    // get the html from the template
    const html = await fetch(route.template).then((response) => response.text());
    // set the content of the content div to the html
    document.getElementById("content").innerHTML = html;
    // set the title of the document to the title of the route
    document.title = route.title;
    // set the description of the document to the description of the route
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
};
// add an event listener to the window that watches for url changes
window.onpopstate = locationHandler;
window.route = route;
// call the urlLocationHandler function to handle the initial url
locationHandler();