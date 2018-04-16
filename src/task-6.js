
export default class EnhancedPromise extends Promise {
    static some(promises, count) {
        return new EnhancedPromise((resolve, reject) => {
            if (promises.length === 0) {
                resolve([]);
            }
            const allowedRejects = promises.length - count;
            let rejeceted = 0;
            if (count > promises.length) {
                reject(new Error());
            }
            const resolvedPromises = [];
            promises.forEach(pr => {
                pr.then(val => {
                    resolvedPromises.push(val);
                    if (resolvedPromises.length === count) {
                        resolve(resolvedPromises);
                    }
                }).catch(() => {
                    rejeceted++;
                    if (rejeceted >= allowedRejects) {
                        reject(new Error());
                    }
                });
            });
        });
    }
}
