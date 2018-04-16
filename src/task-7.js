import { getJSON } from "./task-1.js";

export default function getSequential(urls) {

    // return new Promise((resolve, reject) => {
    //     const endArr = [];
    //     let idx = 0;
    //     Promise.all(
    //         urls.map(url => (getJSON(url)
    //             .then(val => {
    //                 endArr[idx] = val;
    //                 ++idx;
    //             })
    //             .catch(() => {
    //                 reject(new Error(`failed to fetch ${url}`));
    //             })
    //         ))
    //     ).then(() => {
    //         resolve(endArr);
    //     });

    return urls.reduce((promise, url) => promise.then(result => getJSON(url)
        .catch(() => Promise.reject(new Error(`failed to fetch ${url}`)))
        .then(json => result.concat(json))
    ), Promise.resolve([]));
}
