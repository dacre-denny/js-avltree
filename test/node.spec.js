var { assert } = require("chai");
var { createNode } = require("./helpers");
var { getBalance, updateHeight, setLeftChild, setRightChild } = require("../src/node");

describe("Node module", () => {

    describe("getBalance", () => {

        it("should return undefined if invalid node passed", () => {

            assert.isUndefined(getBalance(""));
            assert.isUndefined(getBalance(null));
            assert.isUndefined(getBalance());
        });

        it("should return node's height if node is leaf node", () => {

            const node = createNode(2);

            assert.equal(getBalance(node), 0);
        });

        it("should return right child height if node has right child and no left child", () => {

            const right = createNode(2);
            const node = createNode(1);

            node.right = right;
            right.parent = node;

            assert.equal(getBalance(node), 1);
        });

        it("should return negative left child height if node has left child and no right child", () => {

            const left = createNode(2);
            const node = createNode(1);

            node.left = left;
            left.parent = node;

            assert.equal(getBalance(node), -1);
        });

        it("should return right child height minus left child height if node has left child node and right child node", () => {

            const left = createNode(2);
            const right = createNode(3);
            const node = createNode(1);

            node.left = left;
            node.right = right;

            left.parent = node;
            left.height = 2;

            right.parent = node;
            right.height = 4;

            assert.equal(getBalance(node), 2);
        });
    });

    describe("updateHeight", () => {

        it("should do nothing if invalid node passed", () => {

            updateHeight("");
            updateHeight(null);
            updateHeight();
        });

        it("should update node's height to 1 if node is leaf node", () => {

            const node = createNode(2);

            updateHeight(node);

            assert.equal(node.height, 1);
        });

        it("should update node's height to right child plus 1 if node has right child and no left child", () => {

            const right = createNode(2);
            const node = createNode(1);

            node.right = right;

            right.parent = node;
            right.height = 3;

            updateHeight(node);

            assert.equal(node.height, 4);
        });

        it("should update node's height to left child plus 1 if node has left child and no right child", () => {

            const left = createNode(2);
            const node = createNode(1);

            node.left = left;

            left.parent = node;
            left.height = 5;

            updateHeight(node);

            assert.equal(node.height, 6);
        });

        it("should update node's height to maximum child height plus 1 if node has left child and right child", () => {

            const left = createNode(2);
            const right = createNode(3);
            const node = createNode(1);

            node.left = left;
            node.right = right;

            left.parent = node;
            right.parent = node;

            left.height = 7;
            right.height = 3;

            updateHeight(node);

            assert.equal(node.height, 8);

            left.height = 2;
            right.height = 9;

            updateHeight(node);

            assert.equal(node.height, 10);
        });
    });

    describe("setLeftChild", () => {

        it("should do nothing if invalid node passed", () => {

            setLeftChild("");
            setLeftChild(null);
            setLeftChild();
        });

        it("should clear node's left child when invalid left child supplied", () => {

            const node = createNode(2);
            const left = createNode(1);

            node.left = left;
            node.height = 1;
            left.parent = node;

            setLeftChild(node, "");

            assert.equal(node.right, "");
            assert.equal(node.left, "");
            assert.equal(node.height, 1);
        });

        it("should replace node's left child when valid left child supplied", () => {

            const node = createNode(2);
            const left = createNode(1);
            const leftReplacment = createNode(0);

            node.left = left;
            node.height = 2;
            left.parent = node;
            leftReplacment.height = 4;

            setLeftChild(node, leftReplacment);

            assert.equal(node.right, "");
            assert.equal(node.left, leftReplacment);
            assert.equal(node.height, 5);

            assert.equal(leftReplacment.parent, node);
        });
    });

    describe("setRightChild", () => {

        it("should do nothing if invalid node passed", () => {

            setRightChild("");
            setRightChild(null);
            setRightChild();
        });

        it("should clear node's right child when invalid right child supplied", () => {

            const node = createNode(2);
            const right = createNode(1);

            node.right = right;
            node.height = 1;
            right.parent = node;

            setRightChild(node, "");

            assert.equal(node.left, "");
            assert.equal(node.right, "");
            assert.equal(node.height, 1);
        });

        it("should replace node's right child when valid right child supplied", () => {

            const node = createNode(1);
            const right = createNode(2);
            const rightReplacement = createNode(3);

            node.right = right;
            node.height = 3;
            right.parent = node;
            rightReplacement.height = 8;

            setRightChild(node, rightReplacement);

            assert.equal(node.left, "");
            assert.equal(node.right, rightReplacement);
            assert.equal(node.height, 9);

            assert.equal(rightReplacement.parent, node);
        });
    });
});