var { assert } = require("chai");
var { createNode } = require("./helpers");
var { getBalance } = require("../src/node");

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
});