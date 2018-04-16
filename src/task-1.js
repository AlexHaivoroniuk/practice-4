
function status(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

function json(response) {
    return response.json();
}

function getJSON(url) {
    return new Promise((resolve, reject) => {
        fetch(url, { method: "GET" })
            .then(response => {
                status(response);
                resolve(json(response));
            })
            .catch(err => {
                reject(err);
            });
    });
    /*
    return window.fetch(url)
                .then(status)
                .then(json)
    */
}

export { status, json, getJSON };
