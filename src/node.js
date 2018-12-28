export function rotateRight(node) {

    const { parent, left } = node;

    if (!left) { return node; }

    // if single rotation case
    if (left.getBalance() < 0) {

        if (parent) {
            parent.replaceChild(node, left);
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
            parent.replaceChild(node, leftRight);
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

    const { parent, right } = node;

    // if single rotation case
    if (right.getBalance() > 0) {

        if (parent) {
            parent.replaceChild(node, right);
        }
        else {
            right.parent = "";
        }

        node.setRight(right.left);
        right.setLeft(node);

        // return the replacement of node in the tree
        return right;
    }
    // otherwise this is the double rotate case
    else {

        const rightLeft = right.left;

        if (parent) {
            parent.replaceChild(node, rightLeft);
        }
        else {
            rightLeft.parent = "";
        }

        right.setLeft(rightLeft.right);
        node.setRight(rightLeft.left);

        rightLeft.setRight(right);
        rightLeft.setLeft(node);

        return rightLeft;
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

    /**
     * Removes the value from the tree if it exists
     * 
     * @param {any} value value to be removed
     * @returns {Node|""} this node instance, or the instance that replaces it as a result of the remove operation
     */
    removeValue(value) {

        let result = undefined;

        if (value === this.value) {

            if (this.right) {

                let nextNode = this.right;

                // find node of next value that will replace this node
                while (nextNode.left) { nextNode = nextNode.left; }

                if (nextNode !== this.right) {

                    // Remove nextNode from it's subtree
                    nextNode.parent.replaceChild(nextNode.right, nextNode);

                    nextNode.setRight(this.right);
                }
                else {
                    nextNode.setRight(this.right.right);
                }

                nextNode.setLeft(this.left);

                if (this.parent) {
                    this.parent.replaceChild(this, nextNode);
                }
                else {
                    nextNode.parent = "";
                }

                result = rotateIfNeeded(nextNode);
            }
            else if (this.left) {

                if (this.parent) {
                    this.parent.replaceChild(this, this.left);

                    result = rotateIfNeeded(this.parent);
                }
            }
            else {

                if (this.parent) {
                    this.parent.replaceChild(this, "");

                    result = rotateIfNeeded(this.parent);
                }
                else {

                    result = "";
                }
            }
        }
        else if (value <= this.value) {

            if (this.left) {
                result = this.left.removeValue(value);
            }
        }
        else {

            if (this.right) {
                result = this.right.removeValue(value);
            }
        }

        if (result) {
            return rotateIfNeeded(this);
        }
        else {
            return result;
        }
    }

    findValue(value) {

        if (value === this.value) {
            return this;
        }
        else if (value < this.value) {
            return this.left ? this.left.findValue(value) : undefined;
        }
        else {
            return this.right ? this.right.findValue(value) : undefined;
        }
    }
}