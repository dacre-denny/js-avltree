import { Node } from "./node";

function nodeRotateLeft(node) {

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

function nodeRotateRight(node) {

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

function nodeInsert(treeNode, value) {

    if (!treeNode) {

        const node = new Node();
        node.height = 1;
        node.value = value;
        return node;
    }

    let node;

    if (value <= treeNode.value) {

        if (treeNode.left) {
            node = nodeInsert(treeNode.left, value);
        }
        else {
            node = new Node();
            node.height = 1;
            node.value = value;
            treeNode.setLeft(node);
        }
    }
    else {

        if (treeNode.right) {
            node = nodeInsert(treeNode.right, value);
        }
        else {
            node = new Node();
            node.height = 1;
            node.value = value;
            treeNode.setRight(node);
        }
    }

    treeNode.updateLevel();

    const balance = treeNode.getBalance();

    if (balance < -1) {
        nodeRotateRight(treeNode);
    }
    else if (balance > 1) {
        nodeRotateLeft(treeNode);
    }

    return node;
}

function nodeReplace(node, replacement) {

    if (!node) return;

    const { parent } = node;

    if (parent) {

        if (parent.right === node) {
            parent.setRight(replacement);
        }
        else if (parent.left === node) {
            parent.setLeft(replacement);
        }
    }

    if (replacement) {
        replacement.parent = parent;
    }
}

function nodeRemove(treeNode, value) {

    if (treeNode) {

        if (treeNode.value === value) {

            if (treeNode.right) {

                // find next value node which will replace this, search till last left most child
                // from node right
                let nextValueNode = treeNode.right;

                for (; nextValueNode.left; nextValueNode = nextValueNode.left) { continue; }

                // set right node of nextValueNode if it exists as left child of nvn parent
                if (nextValueNode) {
                    nodeReplace(nextValueNode, nextValueNode.right);
                }

                // repace node being removed with next value node
                nodeReplace(treeNode, nextValueNode);

                // left left/right children of replacement node to those of node being replaced
                nextValueNode.setLeft(treeNode.left);
                nextValueNode.setLeft(treeNode.right);

                treeNode = nextValueNode;
            }
            else if (treeNode.left) {

                nodeReplace(treeNode, treeNode.left);
            }
            else {

                nodeReplace(treeNode, "");
                treeNode = "";
            }
        }
        else if (value <= treeNode.value) {
            nodeRemove(treeNode.left, value);
        }
        else {
            nodeRemove(treeNode.right, value);
        }
    }

    treeNode.updateLevel();

    const balance = treeNode.getBalance();

    if (balance < -1) {
        return nodeRotateRight(treeNode);
    }
    else if (balance > 1) {
        return nodeRotateLeft(treeNode);
    }
    else {
        return treeNode;
    }
}

export class Tree {

    constructor() {
        this.root = "";
    }

    insert(value) {

        const { root } = this;

        this.root = root ? root.insert(value) : new Node(value);
    }

    remove(value) {

        const { root } = this;

        this.root = root ? root.remove(value) : "";
    }

    find(value) {

        const { root } = this;

        return value !== undefined && root ? root.findValue(value) : "";
    }
}