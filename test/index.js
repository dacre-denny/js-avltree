var { assert } = require("chai");
var { Tree } = require("../src/tree");

describe("Tree module", () => {

    describe("insert behaviour", () => {

        it("should insert first node into an empty tree at root", () => {

            const tree = new Tree();

            const node1 = tree.insert(1);

            assert.equal(node1, tree.root);
            assert.equal(node1.parent, "");
        });

        it("should insert node to right of empty root node if value greater than root value", () => {

            const tree = new Tree();
            const root = tree.insert(1);

            const node2 = tree.insert(2);

            assert.equal(node2, root.right);
            assert.equal(node2.parent, root);
        });

        it("should insert node to left of empty root node if value less than root value", () => {

            const tree = new Tree();
            const root = tree.insert(2);

            const node1 = tree.insert(1);

            assert.equal(node1, root.left);
            assert.equal(node1.parent, root);
        });

        it("should perform rebalance on left-left insert into left subtree", () => {

            const tree = new Tree();
            const root = tree.insert(5);
            const node4 = tree.insert(4);
            tree.insert(6);

            const node3 = tree.insert(3);
            const node2 = tree.insert(2);

            assert.equal(node3, root.left);
            assert.equal(node3.parent, root);

            assert.equal(node2, node3.left);
            assert.equal(node2.parent, node3);

            assert.equal(node4, node3.right);
            assert.equal(node4.parent, node3);
        });

        it("should perform rebalance on left-right insert into left subtree", () => {

            const tree = new Tree();
            const root = tree.insert(5);
            const node4 = tree.insert(4);
            tree.insert(6);

            const node2 = tree.insert(2);
            const node3 = tree.insert(3);

            assert.equal(node2, root.left);
            assert.equal(node2.parent, root);

            assert.equal(node4, node2.right);
            assert.equal(node4.parent, node2);

            assert.equal(node3, node2.left);
            assert.equal(node3.parent, node2);
        });

        /*
        it("should ", () => {

            const tree = new Tree();
            const root = tree.insert(1);

            tree.insert(2);
            tree.insert(3);
            tree.insert(4);
            tree.insert(5);
            tree.insert(6);
            tree.insert(7);
            tree.insert(8);
            tree.insert(9);
            tree.insert(10);

            tree.insert(7.5);
        });
        */

        it("should insert node to left and node to right of empty root node if root node value between inserted node values", () => {

            const tree = new Tree();
            const root = tree.insert(2);

            const node1 = tree.insert(1);
            const node3 = tree.insert(3);

            assert.equal(node1, root.left);
            assert.equal(node1.parent, root);

            assert.equal(node3, root.right);
            assert.equal(node3.parent, root);
        });

        it("should insert multiple nodes and rebalance with single rotation if inbalanced to right of empty root node", () => {

            const tree = new Tree();
            const root = tree.insert(1);

            const node2 = tree.insert(2);
            const node3 = tree.insert(3);

            assert.equal(node2, tree.root);
            assert.equal(node2.parent, "");

            assert.equal(node2.left, root);
            assert.equal(root.parent, node2);

            assert.equal(node2.right, node3);
            assert.equal(node3.parent, node2);
        });

        it("should insert multiple nodes and rebalance with single rotation if inbalanced to left of empty root node", () => {

            const tree = new Tree();
            const root = tree.insert(3);

            const node2 = tree.insert(2);
            const node1 = tree.insert(1);

            assert.equal(node2, tree.root);
            assert.equal(node2.parent, "");

            assert.equal(node2.left, node1);
            assert.equal(node1.parent, node2);

            assert.equal(node2.right, root);
            assert.equal(root.parent, node2);
        });

    });
});