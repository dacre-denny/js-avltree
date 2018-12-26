export function rotateRight(node) {

    const nodeLeft = node.left;

    if (!nodeLeft) return;

    const nodeLeftRight = nodeLeft.right;
    const nodeLeftLeft = nodeLeft.left;

    if (nodeLeftLeft.height >= nodeLeftRight.height) {
        // single rotate

        nodeReplace(node, nodeLeft);
        nodeLeft.setRight(node);
        node.setLeft(nodeLeftRight);

        // nodeUpdateLevel(node);
        // nodeUpdateLevel(nodeLeft);
        // nodeUpdateLevel(nodeLeft.parent);

        return nodeLeft;
    }
    else {
        // double rotate

        const nodeLeftRightLeft = nodeLeftRight.left;
        const nodeLeftRightRight = nodeLeftRight.right;

        nodeReplace(node, nodeLeftRight);
        nodeLeftRight.setLeft(nodeLeft);
        nodeLeftRight.setRight(node);
        nodeLeft.setLeft(nodeLeftRightLeft);
        node.setLeft(nodeLeftRightRight);

        // nodeUpdateLevel(nodeLeftRight);
        // nodeUpdateLevel(nodeLeft);
        // nodeUpdateLevel(node);
        // nodeUpdateLevel(nodeLeftRight.parent);

        return nodeLeftRight;
    }
}

export function rotateLeft(node) {

    const nodeParent = node.parent;
    const nodeRight = node.right;
    const nodeRightLeft = nodeRight ? nodeRight.left : "";

    if (nodeRightLeft) {

        // double rotation case

        if (nodeParent) {
            if (nodeParent.right === node) {
                nodeParent.setRight(nodeParent, nodeRightLeft);
            }
            else if (nodeParent.left === node) {
                nodeParent.setLeft(nodeRightLeft);
            }
        }

        node.setRight(nodeRightLeft.left);
        nodeRight.setLeft(nodeRightLeft.right);

        nodeRightLeft.setLeft(node);
        nodeRightLeft.setRight(nodeRight);

        node.updateLevel();
        nodeRight.updateLevel();
        nodeRightLeft.updateLevel();

        nodeRightLeft.parent = nodeParent;

        return nodeRightLeft;
    }
    else {

        // single rotation case

        if (nodeParent) {
            if (nodeParent.right === node) {
                nodeParent.setRight(nodeRight);
            }
            else if (nodeParent.left === node) {
                nodeParent.setLeft(nodeRight);
            }
        }

        nodeRight.setLeft(node);
        node.setRight(nodeRightLeft);

        node.updateLevel();
        nodeRight.updateLevel();

        nodeRight.parent = nodeParent;

        return nodeRight;
    }

}

export class Node {

    constructor(value) {

        this.value = value;
        this.left = "";
        this.right = "";
        this.height = 1;
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

    insertValue(value) {

        if (value <= this.value) {

            if (this.left) {
                this.left.insertValue(value);
            }
            else {
                this.setLeft(new Node(value));
            }
        }
        else {

            if (this.right) {
                this.right.insertValue(value);
            }
            else {
                this.setRight(new Node(value));
            }
        }

        const balance = this.getBalance();

        if (balance < -1) {
            return rotateRight(this);
        }
        else if (balance > 1) {
            return rotateLeft(this);
        }
        else {
            return this;
        }
    }

    removeValue(value) {

    }

    findValue(value) {

        if (value === this.value) {
            return this;
        }
        else if (value < this.value) {
            return this.left.findValue(value);
        }
        else {
            return this.right.findValue(value);
        }
    }
}