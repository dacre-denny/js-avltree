import { Node } from "./node";

const nodeUpdateLevel = (node) => {

    if (!node) { return; }

    node.updateLevel();
};

const nodeBalance = (node) => {

    if (!node) return 0;

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
                nodeSetRight(nodeParent, nodeRight);
            }
            else if (nodeParent.left === node) {
                nodeSetLeft(nodeParent, nodeRight);
            }
        }

        nodeSetLeft(nodeRight, node);
        nodeSetRight(node, nodeRightLeft);

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
        nodeSetRight(nodeLeft, node);
        nodeSetLeft(node, nodeLeftRight);

        nodeUpdateLevel(node);
        nodeUpdateLevel(nodeLeft);
        nodeUpdateLevel(nodeLeft.parent);

        return nodeLeft;
    }
    else {
        // double rotate

        const nodeLeftRightLeft = nodeLeftRight.left;
        const nodeLeftRightRight = nodeLeftRight.right;

        nodeReplace(node, nodeLeftRight);
        nodeSetLeft(nodeLeftRight, nodeLeft);
        nodeSetRight(nodeLeftRight, node);
        nodeSetLeft(nodeLeft, nodeLeftRightLeft);
        nodeSetLeft(node, nodeLeftRightRight);

        nodeUpdateLevel(nodeLeftRight);
        nodeUpdateLevel(nodeLeft);
        nodeUpdateLevel(node);
        nodeUpdateLevel(nodeLeftRight.parent);

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
            nodeSetLeft(treeNode, node);
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
            nodeSetRight(treeNode, node);
        }
    }

    nodeUpdateLevel(treeNode);

    const balance = nodeBalance(treeNode);

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
            nodeSetRight(parent, replacement);
        }
        else if (parent.left === node) {
            nodeSetLeft(parent, replacement);
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
                nodeSetLeft(nextValueNode, treeNode.left);
                nodeSetRight(nextValueNode, treeNode.right);

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

    nodeUpdateLevel(treeNode);

    const balance = nodeBalance(treeNode);

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

        const node = nodeInsert(this.root, value);

        if (!this.root) {
            this.root = node;
        }

        return node;
    }

    remove(value) {

        if (this.root) {

            this.root = nodeRemove(this.root, value);
        }
    }

    find(value) {

        if (value !== undefined) {

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
}