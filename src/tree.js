import { insertValue, removeValue, findValue } from "./node";

export class Tree {

    constructor() {
        this.root = "";
    }

    insert(value) {

        if (value === undefined) return;

        const { root } = this;

        this.root = insertValue(root, value);
    }

    remove(value) {

        const { root } = this;

        this.root = removeValue(root, value);
    }

    find(value) {

        const { root } = this;

        return findValue(root, value);
    }
}