import { getJSON } from "./task-1.js";

export default function getSeries(url1, url2) {
    return new Promise((resolve, reject) => {
        getJSON(url1)
            .then(res1 => {
                getJSON(url2)
                    .then(res2 => {
                        resolve([res1, res2]);
                    })
                    .catch(() => {
                        reject(Error("Second fetch failed"));
                    });
            })
            .catch(() => {
                reject(Error("First fetch failed"));
            });
    });
}
