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

    /**
     * Inserts the specified value into the tree
     * 
     * @param {any} value to be inserted
     * @returns {Node} node for the inserted value
     */
    insertValue(value) {

        var newNode = new Node(value);
        var node = this;
        for (; ;) {

            if (value <= node.value) {
                if (node.left) {
                    node = node.left;
                }
                else {
                    node.setLeft(newNode);
                    break;
                }
            }
            else {

                if (node.right) {
                    node = node.right;
                }
                else {
                    node.setRight(newNode);
                    break;
                }
            }
        }

        // Traverse up the tree to root, applying rotations as needed
        for (; node;) {
            node = rotateIfNeeded(node);
            node = node.parent;
        }

        return newNode;
    }

    /**
     * Removes the value from the tree if it exists
     * 
     * @param {any} value value to be removed
     * @returns {Node|""} this node instance, or the instance that replaces it as a result of the remove operation
     */
    removeValue(value) {

        for (var node = this; ;) {

            if (value === node.value) {

                const { right, left, parent } = node;

                if (right) {

                    let nextNode = right;

                    // find node of next value that will replace this node
                    while (nextNode.left) { nextNode = nextNode.left; }

                    if (nextNode !== right) {

                        // Remove nextNode from it's subtree
                        nextNode.parent.replaceChild(nextNode.right, nextNode);

                        nextNode.setRight(right);
                    }
                    else {
                        nextNode.setRight(right.right);
                    }

                    nextNode.setLeft(left);

                    if (parent) {
                        parent.replaceChild(this, nextNode);
                    }
                    else {
                        nextNode.parent = "";
                    }
                }
                else if (left) {

                    if (parent) {
                        parent.replaceChild(this, left);
                    }
                }
                else {

                    if (parent) {
                        parent.replaceChild(node, "");
                    }
                }

                // Traverse up the tree to root, applying rotations as needed
                for (; node;) {
                    node = rotateIfNeeded(node);
                    node = node.parent;
                }

                // Return root, current or replaced
                return node;
            }
            else if (value < node.value) {
                node = node.left;
            }
            else {
                node = node.right;
            }
        }
    }

    /**
     * Searchs tree for node with matching value
     * @param {any} value value to match node on
     * @returns {Node|undefined} the node instance with matching value or undefined if no match found
     */
    findValue(value) {

        for (var node = this; node;) {

            if (node.value === this.value) {
                return node;
            }
            else if (value < this.value) {
                node = node.left;
            }
            else {
                node = node.right;
            }
        }
    }
}