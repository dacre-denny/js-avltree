import { Node } from "./node";

const nodeBalance = (node) => {

    const nodeLeft = node.left;
    const nodeRight = node.right;

    const balance = (nodeLeft ? nodeLeft.value : 0) - (nodeRight ? nodeRight.value : 0);
    return balance;
};

function nodeSetLeft(node, newLeft) {

    node.left = newLeft;
    newLeft.parent = node;

    node.height = Math.max(node.height, newLeft.height + 1);
}

function nodeSetRight(node, newRight) {

    node.right = newRight;
    newRight.parent = node;

    node.height = Math.max(node.height, newRight.height + 1);
}

function nodeRotateLeft(node) {

    const nodeParent = node.parent;
    const nodeRight = node.right;
    const nodeRightLeft = node.right.left;

    if (nodeParent.right === node) {
        nodeSetRight(nodeParent, nodeRight);
    }
    else if (nodeParent.left === node) {
        nodeSetLeft(nodeParent, nodeRight);
    }

    nodeSetLeft(nodeRight, node);
    nodeSetRight(node, nodeRightLeft);
}

function nodeRotateRight(node) {

    const nodeParent = node.parent;
    const nodeLeft = node.left;
    const nodeLeftRight = node.left.right;

    if (nodeParent.right === node) {
        nodeSetRight(nodeParent, nodeLeft);
    }
    else if (nodeParent.left === node) {
        nodeSetLeft(nodeParent, nodeLeft);
    }

    nodeSetRight(nodeLeft, node);
    nodeSetLeft(node, nodeLeftRight);
}


function nodeInsert(node, treeNode) {

    if (node.value <= treeNode.value) {

        if (treeNode.left) {
            nodeInsert(node, treeNode.left);
            treeNode.height++;
        }
        else {
            treeNode.left = node;
            node.parent = treeNode;
        }
    }
    else {

        if (treeNode.right) {
            nodeInsert(node, treeNode.right);
            treeNode.height++;
        }
        else {
            treeNode.right = node;
            node.parent = treeNode;
        }
    }

    const balance = nodeBalance(node);

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
        newNode.value = value;

        if (this.root) {
            nodeInsert(newNode, this.root);
        }
        else {
            this.root = newNode;
        }
    }

    remove(value) {

    }

    find(callback) {

    }
}