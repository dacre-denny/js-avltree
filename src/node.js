export function rotateRight(node) {

    const { parent, left } = node;

    if (!left) { return node; }

    // if single rotation case
    if (left.getBalance() < 0) {

        if (parent) {
            parent.replaceChild(left, node);
        }
        else {
            left.parent = "";
        }

        node.setLeft(left.right);
        left.setRight(node);

        // return the replacement of node in the tree
        return left;
    }
    // otherwise this is the double rotate case
    else {

        const leftRight = left.right;

        if (parent) {
            parent.replaceChild(leftRight, node);
        }
        else {
            leftRight.parent = "";
        }

        left.setRight(leftRight.left);
        node.setLeft(leftRight.right);

        leftRight.setLeft(left);
        leftRight.setRight(node);


        return leftRight;
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

export function rotateIfNeeded(node) {

    const balance = node.getBalance();

    if (balance < -1) {
        return rotateRight(node);
    }
    else if (balance > 1) {
        return rotateLeft(node);
    }
    else {
        return node;
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

        if (node) {
            node.parent = this;
        }

        this.left = node;

        this.updateLevel();
    }

    setRight(node) {

        if (node) {
            node.parent = this;
        }

        this.right = node;

        this.updateLevel();
    }

    replaceChild(currentChild, newChild) {

        if (currentChild === undefined) { return; }

        if (this.left === currentChild) {
            this.setLeft(newChild);
        }

        if (this.right === currentChild) {
            this.setRight(newChild);
        }
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

        this.updateLevel();

        return rotateIfNeeded(this);
    }

    removeValue(value) {

        if (value === this.value) {

            if (this.right) {

                let nextNode = this.right;
                // find node of next value that will replace this node
                while (nextNode.left) { nextNode = nextNode.left; }

                // This nextNode has not left child. If nextNode has defined  xxxxxx
                // or undefined right, set it as left of nextNode parent 
                if (nextNode !== this.right) {
                    nextNode.parent.setLeft(nextNode.right);
                }

                if (this.parent) {
                    this.parent.replaceChild(nextNode, this);
                }

                nextNode.setLeft(this.left);
                nextNode.setRight(this.right);
            }
            else if (this.left) {

                if (this.parent) {
                    this.parent.replaceChild(this.left, this);
                }
            }
            else {

                if (this.parent) {
                    this.parent.replaceChild("", this);
                }
            }
        }
        else if (value <= this.value) {

            if (this.left) {
                this.left.removeValue(value);
            }
        }
        else {

            if (this.right) {
                this.right.removeValue(value);
            }
        }

        return rotateIfNeeded(this);
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