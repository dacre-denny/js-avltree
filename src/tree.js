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

    nodeRight.parent = nodeParent;
}

function nodeRotateRight(node) {

    const nodeParent = node.parent;
    const nodeLeft = node.left;
    const nodeLeftRight = nodeLeft ? nodeLeft.right : "";

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

    nodeLeft.parent = nodeParent;
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

    }

    find(callback) {

    }
}