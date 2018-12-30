/**
 * Returns the balance metric of the subtree at the specified node
 * 
 * @param {Node} node the node to calculate balance of
 * @return {number} balance of the supplied node
 */
export function getBalance(node) {

    if (!node) { return; }

    const { left, right } = node;

    return (right ? right.height : 0) - (left ? left.height : 0);
}

/**
 * Recalculates and updates the height of the specified node based on left and right child heights
 * 
 * @param {Node} node the node to update the height of
 */
export function updateHeight(node) {

    if (!node) { return; }

    const { left, right } = node;

    node.height = Math.max(left ? left.height : 0, right ? right.height : 0) + 1;
}

/**
 * Sets the left child of node to the node supplied.
 * 
 * @param {Node} node the target node to have left child assigned
 * @param {Node|''} leftChild the node to become the left child or empty value to clear
 */
export function setLeftChild(node, leftChild) {

    if (!node) { return; }

    if (leftChild) {
        leftChild.parent = node;
    }

    node.left = leftChild;

    updateHeight(node);
}

/**
 * Sets the right child of node to the node supplied.
 * 
 * @param {Node} node the target node to have right child assigned
 * @param {Node|''} rightChild the node to become the right child or empty value to clear
 */
export function setRightChild(node, rightChild) {

    if (!node) { return; }

    if (rightChild) {
        rightChild.parent = node;
    }

    node.right = rightChild;

    updateHeight(node);
}

export function replaceChild(node, currentChild, newChild) {

    // An ambiguous case that cannot be resolved
    if (!currentChild) { return; }

    if (node.left === currentChild) {
        setLeftChild(node, newChild);
    }

    if (node.right === currentChild) {
        setRightChild(node, newChild);
    }
}

export function rotateRight(node) {

    const { parent, left } = node;

    if (!left) { return node; }

    // if single rotation case
    if (getBalance(left) < 0) {

        if (parent) {
            replaceChild(parent, node, left);
        }
        else {
            left.parent = "";
        }

        setLeftChild(node, left.right);
        setRightChild(left, node);

        // return the replacement of node in the tree
        return left;
    }
    // otherwise this is the double rotate case
    else {

        const leftRight = left.right;

        if (parent) {
            replaceChild(parent, node, leftRight);
        }
        else {
            leftRight.parent = "";
        }

        setRightChild(left, leftRight.left);
        setLeftChild(node, leftRight.right);

        setLeftChild(leftRight, left);
        setRightChild(leftRight, node);

        return leftRight;
    }
}

export function rotateLeft(node) {

    const { parent, right } = node;

    // if single rotation case
    if (getBalance(right) > 0) {

        if (parent) {
            replaceChild(parent, node, right);
        }
        else {
            right.parent = "";
        }

        setRightChild(node, right.left);
        setLeftChild(right, node);

        // return the replacement of node in the tree
        return right;
    }
    // otherwise this is the double rotate case
    else {

        const rightLeft = right.left;

        if (parent) {
            replaceChild(parent, node, rightLeft);
        }
        else {
            rightLeft.parent = "";
        }

        setLeftChild(right, rightLeft.right);
        setRightChild(node, rightLeft.left);

        setRightChild(rightLeft, right);
        setLeftChild(rightLeft, node);

        return rightLeft;
    }
}

export function rotateIfNeeded(node) {

    const balance = getBalance(node);

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

/**
 * Inserts the specified value into the tree
 * 
 * @param {Node} root root of the tree if it exists
 * @param {any} value to be inserted
 * @returns {Node} tree root
 */
export function insertValue(root, value) {

    if (typeof value !== "number") { return root; }

    var newNode = {
        value,
        left: "",
        right: "",
        height: 1,
        parent: ""
    };

    if (!root) {
        return newNode;
    }

    var node = root;
    for (; ;) {

        if (value <= node.value) {
            if (node.left) {
                node = node.left;
            }
            else {
                setLeftChild(node, newNode);
                break;
            }
        }
        else {

            if (node.right) {
                node = node.right;
            }
            else {
                setRightChild(node, newNode);
                break;
            }
        }
    }

    // Traverse up the tree to root, applying rotations as needed
    for (node = newNode; node;) {

        updateHeight(node);
        node = rotateIfNeeded(node);

        if (node.parent) {
            node = node.parent;
        }
        else {
            break;
        }
    }

    return node;
}

/**
 * Removes the value from the tree if it exists
 * 
 * @param {Node} root root of the tree if it exists
 * @param {any} value value to be removed
 * @returns {Node|""} this node instance, or the instance that replaces it as a result of the remove operation
 */
export function removeValue(root, value) {

    if (!root) {
        return "";
    }

    for (var node = root; node;) {

        if (value === node.value) {

            const { right, left, parent } = node;

            if (right) {

                let nextNode = right;

                // find node of next value that will replace this node
                while (nextNode.left) { nextNode = nextNode.left; }

                if (nextNode !== right) {

                    // Remove nextNode from it's subtree
                    replaceChild(nextNode.parent, nextNode.right, nextNode);

                    setRightChild(nextNode, right);
                }
                else {
                    setRightChild(nextNode, right.right);
                }

                setLeftChild(nextNode, left);

                if (parent) {
                    replaceChild(parent, node, nextNode);
                }
                else {
                    nextNode.parent = "";
                }

                // Walk back up tree on replacement node (nextNode)
                node = nextNode;
            }
            else if (left) {

                if (parent) {
                    replaceChild(parent, node, left);
                    node = parent;
                }
                else {

                    // no parent, so left becomes new root for tree
                    node = left;
                    node.parent = "";
                }
            }
            else {

                if (parent) {
                    replaceChild(parent, node, "");
                    node = parent;
                }
                else {
                    // node is the root existing on it's own so clear it
                    node = "";
                }
            }

            // Traverse up the tree to root, applying rotations as needed
            for (; node;) {
                updateHeight(node);
                node = rotateIfNeeded(node);

                if (node.parent) {
                    node = node.parent;
                }
                else {
                    break;
                }
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

    //return root node
    return root;
}

/**
 * Searchs tree for node with matching value
 * 
 * @param {Node} root root of the tree if it exists
 * @param {any} value value to match node on
 * @returns {Node|undefined} the node instance with matching value or undefined if no match found
 */
export function findValue(root, value) {

    if (!root || typeof value === "undefined") {
        return;
    }

    for (var node = root; node;) {

        if (value === node.value) {
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
