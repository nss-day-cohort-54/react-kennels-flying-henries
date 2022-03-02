// this file has the responsibility to make all requests and posts from and to the API


// function sets up a parameter for url and also sets the "method" param to "GET" for API call
// also has "body" parameter set initially to null
export const fetchIt = (url, method = "GET", body = null) => {
    // sets up the options state for the API call
    let options = {
        "method": method,
        "headers": {}
    }
    // checks if method equals "GET", if not it changes the API call method to "PUT"
    switch (method) {
        case "POST":
        case "PUT":
            options.headers = {
                "Content-Type": "application/json"
            }
            break;
            // sets up empty default?
        default:
            break;
    }
    // checks if content is inside of body variable 
    // and passes that data into options object 
    if (body !== null) {
        options.body = body
    }
    // returns fetch request with url, options object and a .then 
    return fetch(url, options).then(r => r.json())
}

// request object holds API request functions and gets options object (made above) and url as data
export const request = {
    // initial API request for data to set up application state
    init(url) {
        this.options = {}
        this.options.headers = {}
        this.url = url
    },
    
    get(url) {
        this.init(url)
        this.options.method = "GET"
        return this.send()
    },
    
    post(url) {
        this.init(url)
        this.options.method = "POST"
        this.options.headers["Content-Type"] = "application/json"
        this.options.headers["Accept"] = "application/json"
        return this
    },

    put(url) {
        this.init(url)
        this.options.method = "PUT"
        this.options.headers = {
            "Content-Type": "application/json"
        }
        return this
    },

    delete(url) {
        this.init(url)
        this.options.method = "DELETE"
        return this.send()
    },
    // sends object to api that has body 
    withBody(body) {
        if (this.options.method === "POST" || this.options.method === "PUT") {
            this.options.body = JSON.stringify(body)
        }
        return this
    },

    async send() {
        const req = await fetch(this.url, this.options)
        const parsed = await req.json()
        return parsed
    }
}