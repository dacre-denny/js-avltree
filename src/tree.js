import { Node } from "./node";

export class Tree {

    constructor() {
        this.root = "";
    }

    insert(value) {

        if (value === undefined) return;

        const { root } = this;

        this.root = root ? root.insertValue(value) : new Node(value);
    }

    remove(value) {

        const { root } = this;

        if (root) {

            const removeResult = root.removeValue(value);
            if (removeResult !== undefined) {
                this.root = removeResult;
            }
        }
    }

    find(value) {

        const { root } = this;

        return value !== undefined && root ? root.findValue(value) : undefined;
    }
}