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

        it("should perform single rotation on left-left insert into left subtree", () => {

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

        it("should perform double rotation on left-right insert into left subtree", () => {

            const tree = new Tree();
            const root = tree.insert(5);
            const node4 = tree.insert(4);
            tree.insert(6);

            const node2 = tree.insert(2);
            const node3 = tree.insert(3);

            assert.equal(node3, root.left);
            assert.equal(node3.parent, root);

            assert.equal(node4, node3.right);
            assert.equal(node4.parent, node3);

            assert.equal(node2, node3.left);
            assert.equal(node2.parent, node3);
        });

        it("should perform single rotation on right-right insert into right subtree", () => {

            const tree = new Tree();
            const root = tree.insert(5);
            const node6 = tree.insert(6);
            tree.insert(4);

            const node7 = tree.insert(7);
            const node8 = tree.insert(8);

            assert.equal(node7, root.right);
            assert.equal(node7.parent, root);

            assert.equal(node6, node7.left);
            assert.equal(node6.parent, node7);

            assert.equal(node8, node7.right);
            assert.equal(node8.parent, node7);
        });

        it("should perform double rotation on left-right insert into left subtree", () => {

            const tree = new Tree();
            const root = tree.insert(5);
            tree.insert(4);
            const node6 = tree.insert(6);

            const node8 = tree.insert(8);
            const node7 = tree.insert(7);

            assert.equal(node7, root.right);
            assert.equal(node7.parent, root);

            assert.equal(node8, node7.right);
            assert.equal(node8.parent, node7);

            assert.equal(node6, node7.left);
            assert.equal(node6.parent, node7);
        });

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