export class Node {

    constructor() {

        this.value = 0;
        this.left = "";
        this.right = "";
        this.height = 0;
        this.parent = "";
    }

    updateLevel() {

        const { left, right } = this;

        this.height = Math.max(left ? left.height : 0, right ? right.height : 0) + 1;
    }

    getBalance() {

        const { left, right } = this;

        return (right ? right.height : 0) - (left ? left.height : 0);
    }

    setLeft(node) {

        if (!node) return;

        node.parent = this;
        this.left = node;

        this.updateLevel();
    }

    setRight(node) {

        if (!node) return;

        node.parent = this;
        this.right = node;

        this.updateLevel();
    }
}