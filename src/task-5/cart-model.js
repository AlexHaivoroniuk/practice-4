import Subject from "./subject.js";
import { status } from "../task-1.js";

export default class Cart {
    constructor() {
        this.baseUrl = "http://localhost:3001/cart/items/";
        this.subject = new Subject();
        this.items = [];
        this.loading = false;
    }

    _ajax(url, method = "GET", data = null, middleware = () => {}) {

        const params = {
            method,
            mode: "cors",
            headers: { "Content-type": "application/json" }
        };
        if (data) {
            params.body = JSON.stringify(data);
        }

        this.ajaxMiddleware(true);

        return window.fetch(url, params)
            .then(status)
            .then(response => response.status === 200 ? response.json() : null)
            .then(d => { middleware(d); this.ajaxMiddleware(false); })
            .catch(err => {
                this.loading = false;
                throw new Error(err);
            });
    }

    _notify() {
        this.subject.notifyObservers();
    }

    register(...args) {
        this.subject.add(...args);
    }

    getItems() {
        return this.items;
    }

    getTotalQuantity() {
        return this.items.reduce((acc, item) => {
            acc = acc + item.quantity;
            return acc;
        }, 0);
    }

    getTotalPrice() {
        return this.items.reduce((acc, item) => {
            acc = acc + item.price;
            return acc;
        }, 0);
    }

    ajaxMiddleware(bool) {
        this.loading = bool;
        this._notify();
    }

    load() {
        this._ajax(this.baseUrl, "GET", null, data => {
            this.items = data;
        });
    }

    addItem(item) {
        this._ajax(this.baseUrl, "POST", item, () => { this.items.push(item); });
    }
    
    updateItem(itemId, item) {
        this._ajax(`${this.baseUrl}${itemId}`, "PUT", item, () => {
            this.items = this.items.map(elem => {
                if (elem.id === itemId) {
                    elem = item;
                }
                return elem;
            });
        });
    }
    
    removeItem(itemId) {
        this._ajax(`${this.baseUrl}${itemId}`, "DELETE", null, () => {
            this.items = this.items.filter(elem => {
                if (elem.id === itemId) {
                    return false;
                }
                return true;
            });
        });
    }
    
    removeAll() {
        this._ajax(`${this.baseUrl}`, "DELETE", null, () => { this.items = []; });
    }
}
