import { Node } from "./node";

const nodeLevel = (node) => {

    const heightLeft = node.left ? node.left.height : 0;
    const heightRight = node.right ? node.right.height : 0;
    const height = Math.max(heightLeft, heightRight) + 1;

    return height;
};

const nodeBalance = (node) => {

    const nodeLeft = node.left;
    const nodeRight = node.right;

    const balance = (nodeRight ? nodeRight.height : 0) - (nodeLeft ? nodeLeft.height : 0);
    return balance;
};

function nodeSetLeft(node, newLeft) {

    if (!node) return;

    if (newLeft) {
        newLeft.parent = node;
    }

    node.left = newLeft;
}

function nodeSetRight(node, newRight) {

    if (!node) return;

    if (newRight) {
        newRight.parent = node;
    }

    node.right = newRight;
}

function nodeRotateLeft(node) {

    const nodeParent = node.parent;
    const nodeRight = node.right;
    const nodeRightLeft = nodeRight ? nodeRight.left : "";

    if (nodeRightLeft) {

        // double rotation case

        if (nodeParent) {
            if (nodeParent.right === node) {
                nodeSetRight(nodeParent, nodeRightLeft);
            }
            else if (nodeParent.left === node) {
                nodeSetLeft(nodeParent, nodeRightLeft);
            }
        }

        nodeSetRight(node, nodeRightLeft.left);
        nodeSetLeft(nodeRight, nodeRightLeft.right);

        nodeSetLeft(nodeRightLeft, node);
        nodeSetRight(nodeRightLeft, nodeRight);

        node.height = nodeLevel(node);
        nodeRight.height = nodeLevel(nodeRight);
        nodeRightLeft.height = nodeLevel(nodeRightLeft);

        nodeRightLeft.parent = nodeParent;
    }
    else {

        // single rotation case

        if (nodeParent) {
            if (nodeParent.right === node) {
                nodeSetRight(nodeParent, nodeRight);
            }
            else if (nodeParent.left === node) {
                nodeSetLeft(nodeParent, nodeRight);
            }
        }

        nodeSetLeft(nodeRight, node);
        nodeSetRight(node, nodeRightLeft);

        node.height = nodeLevel(node);
        nodeRight.height = nodeLevel(nodeRight);

        nodeRight.parent = nodeParent;
    }

}

function nodeRotateRight(node) {

    const nodeParent = node.parent;
    const nodeLeft = node.left;
    const nodeLeftRight = nodeLeft ? nodeLeft.right : "";

    if (nodeLeftRight) {

        // double rotation case

        if (nodeParent) {
            if (nodeParent.right === node) {
                nodeSetRight(nodeParent, nodeLeftRight);
            }
            else if (nodeParent.left === node) {
                nodeSetLeft(nodeParent, nodeLeftRight);
            }
        }

        nodeSetRight(nodeLeft, nodeLeftRight.left);
        nodeSetLeft(node, nodeLeftRight.right);

        nodeSetRight(nodeLeftRight, node);
        nodeSetLeft(nodeLeftRight, nodeLeft);

        nodeLeft.height = nodeLevel(nodeLeft);
        node.height = nodeLevel(node);
        nodeLeftRight.height = nodeLevel(nodeLeftRight);

        nodeLeftRight.parent = nodeParent;
    }
    else {

        // single rotation case

        if (nodeParent) {
            if (nodeParent.right === node) {
                nodeSetRight(nodeParent, nodeLeft);
            }
            else if (nodeParent.left === node) {
                nodeSetLeft(nodeParent, nodeLeft);
            }
        }

        nodeSetRight(nodeLeft, node);
        nodeSetLeft(node, nodeLeftRight);

        node.height = nodeLevel(node);
        nodeLeft.height = nodeLevel(nodeLeft);

        nodeLeft.parent = nodeParent;
    }

}

function nodeInsert(node, treeNode) {

    if (node.value <= treeNode.value) {

        if (treeNode.left) {
            nodeInsert(node, treeNode.left);
        }
        else {
            nodeSetLeft(treeNode, node);
        }
    }
    else {

        if (treeNode.right) {
            nodeInsert(node, treeNode.right);
        }
        else {
            nodeSetRight(treeNode, node);
        }
    }

    treeNode.height = nodeLevel(treeNode);

    const balance = nodeBalance(treeNode);

    if (balance < -1) {
        nodeRotateRight(treeNode);
    }
    else if (balance > 1) {
        nodeRotateLeft(treeNode);
    }
}

function nodeReplace(node, replacement) {

    if (!node) return;

    const { parent } = node;

    if (parent) {

        if (parent.right === node) {
            nodeSetRight(parent, replacement);
        }
        else if (parent.left === node) {
            nodeSetLeft(parent, replacement);
        }

        if (replacement) {
            replacement.parent = parent;
        }
    }
}

function nodeRemove(node) {

    if (node.right) {

        // find next value node which will replace this, search till last left most child
        // from node right
        let nextValueNode = node.right;
        for (; nextValueNode !== ""; nextValueNode = nextValueNode.left) { continue; }

        // set right node of nextValueNode if it exists as left child of nvn parent
        nodeReplace(nextValueNode, nextValueNode.right);

        // repace node being removed with next value node
        nodeReplace(node, nextValueNode);

        // left left/right children of replacement node to those of node being replaced
        nodeSetLeft(nextValueNode, node.left);
        nodeSetRight(nextValueNode, node.right);
    }
    else if (node.left) {

        nodeReplace(node, node.left);
    }
    else {

        nodeReplace(node, "");
    }
}

export class Tree {

    constructor() {
        this.root = "";
    }

    insert(value) {

        const newNode = new Node();
        newNode.height = 1;
        newNode.value = value;

        if (this.root) {
            nodeInsert(newNode, this.root);

            for (; this.root.parent; this.root = this.root.parent) {
                continue;
            }
        }
        else {
            this.root = newNode;
        }

        return newNode;
    }

    remove(value) {

        const node = this.find(value);

        if (this.root === node) {
            if (!node.left && !node.right) {
                this.root = "";
                return;
            }
        }
        else {

            nodeRemove(node);
        }
    }

    find(value) {

        if (value === undefined) {
            return;
        }

        for (let node = this.root; node !== "";) {

            if (node.value === value) {
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
}