var { assert } = require("chai");
var { createNode } = require("./helpers");
var { getBalance, updateHeight } = require("../src/node");

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

            assert.isUndefined(updateHeight(""));
            assert.isUndefined(updateHeight(null));
            assert.isUndefined(updateHeight());
        });

        it("should update nodes height to 1 if node is leaf node", () => {

            const node = createNode(2);

            updateHeight(node);

            assert.equal(node.height, 1);
        });

        it("should update nodes height to right child plus 1 if node has right child and no left child", () => {

            const right = createNode(2);
            const node = createNode(1);

            node.right = right;

            right.parent = node;
            right.height = 3;

            updateHeight(node);

            assert.equal(node.height, 4);
        });

        it("should update nodes height to left child plus 1 if node has left child and no right child", () => {

            const left = createNode(2);
            const node = createNode(1);

            node.left = left;

            left.parent = node;
            left.height = 5;

            updateHeight(node);

            assert.equal(node.height, 6);
        });

        it("should update nodes height to maximum child height plus 1 if node has left child and right child", () => {

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
});