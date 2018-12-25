var { assert } = require("chai");
var { Tree } = require("../src/tree");

describe("Tree module", () => {

    describe("insert", () => {

        it("should insert first value at root of empty tree", () => {

            const tree = new Tree();

            const root = tree.insert(1);

            assert.equal(root, tree.root);
            assert.equal(root.parent, "");
            assert.equal(tree.root.height, 1);
        });

        it("should insert into right subtree if value greater than first value", () => {

            const tree = new Tree();
            tree.insert(1);

            const right = tree.insert(2);

            assert.equal(right, tree.root.right);
            assert.equal(right.parent, tree.root);
            assert.equal(tree.root.height, 2);
        });

        it("should insert into left subtree if value less than first value", () => {

            const tree = new Tree();
            tree.insert(2);

            const left = tree.insert(1);

            assert.equal(left, tree.root.left);
            assert.equal(left.parent, tree.root);
            assert.equal(tree.root.height, 2);
        });

        it("should insert into left subtree if value less than first value and insert to right subtree if value greater than first value", () => {

            const tree = new Tree();
            tree.insert(2);

            const left = tree.insert(1);
            const right = tree.insert(3);

            assert.equal(left, tree.root.left);
            assert.equal(left.parent, tree.root);

            assert.equal(right, tree.root.right);
            assert.equal(right.parent, tree.root);
            assert.equal(tree.root.height, 2);
        });

        it("should insert into left-left subtree and perform single rotation", () => {

            const tree = new Tree();
            tree.insert(5);
            const left = tree.insert(4);
            tree.insert(6);

            const leftRight = tree.insert(3);
            const leftLeft = tree.insert(2);

            assert.equal(leftRight, tree.root.left);
            assert.equal(leftRight.parent, tree.root);

            assert.equal(leftLeft, leftRight.left);
            assert.equal(leftLeft.parent, leftRight);

            assert.equal(left, leftRight.right);
            assert.equal(left.parent, leftRight);
            assert.equal(tree.root.height, 3);
        });

        it("should insert into left-right subtree and perform double rotation", () => {

            const tree = new Tree();
            tree.insert(5);
            const left = tree.insert(4);
            tree.insert(6);

            const leftLeft = tree.insert(2);
            const leftRight = tree.insert(3);

            assert.equal(leftRight, tree.root.left);
            assert.equal(leftRight.parent, tree.root);

            assert.equal(left, leftRight.right);
            assert.equal(left.parent, leftRight);

            assert.equal(leftLeft, leftRight.left);
            assert.equal(leftLeft.parent, leftRight);
            assert.equal(tree.root.height, 3);
        });

        it("should insert into right-right subtree and perform single rotation", () => {

            const tree = new Tree();
            tree.insert(5);
            const right = tree.insert(6);
            tree.insert(4);

            const rightRight = tree.insert(7);
            const rightRightRight = tree.insert(8);

            assert.equal(rightRight, tree.root.right);
            assert.equal(rightRight.parent, tree.root);

            assert.equal(right, rightRight.left);
            assert.equal(right.parent, rightRight);

            assert.equal(rightRightRight, rightRight.right);
            assert.equal(rightRightRight.parent, rightRight);
            assert.equal(tree.root.height, 3);
        });

        it("should insert into right-left subtree and perform double rotation", () => {

            const tree = new Tree();
            tree.insert(5);
            tree.insert(4);
            const right = tree.insert(6);

            const rightRight = tree.insert(8);
            const rightRightLeft = tree.insert(7);

            assert.equal(rightRightLeft, tree.root.right);
            assert.equal(rightRightLeft.parent, tree.root);

            assert.equal(rightRight, rightRightLeft.right);
            assert.equal(rightRight.parent, rightRightLeft);

            assert.equal(right, rightRightLeft.left);
            assert.equal(right.parent, rightRightLeft);
            assert.equal(tree.root.height, 3);
        });
    });

    describe("find", () => {

        it("should return undefined if no value provided", () => {

            const tree = new Tree();

            tree.insert(1);
            tree.insert(2);
            tree.insert(3);
            tree.insert(4);
            tree.insert(5);
            tree.insert(6);

            assert.isUndefined(tree.find());
        });

        it("should return undefined if tree empty", () => {

            const tree = new Tree();

            assert.isUndefined(tree.find(1));
        });

        it("should return undefined if value not present", () => {

            const tree = new Tree();

            tree.insert(1);
            tree.insert(2);
            tree.insert(3);
            tree.insert(4);
            tree.insert(5);
            tree.insert(6);

            assert.isUndefined(tree.find(7));
        });

        it("should return node if value present", () => {

            const tree = new Tree();

            tree.insert(1);
            tree.insert(2);
            tree.insert(3);
            tree.insert(4);
            tree.insert(5);
            tree.insert(6);

            assert.isDefined(tree.find(1));
            assert.isDefined(tree.find(2));
            assert.isDefined(tree.find(3));
            assert.isDefined(tree.find(4));
            assert.isDefined(tree.find(5));
            assert.isDefined(tree.find(6));
        });
    });

    describe("remove", () => {

        it("should do nothing when tree empty", () => {

            const tree = new Tree();

            tree.remove(1);

            assert.equal(tree.root, "");
        });

        it("should do nothing when value not present", () => {

            const tree = new Tree();
            const root = tree.insert(2);
            const left = tree.insert(1);
            const right = tree.insert(3);

            tree.remove(4);

            assert.equal(tree.root.parent, "");
            assert.equal(tree.root, root);

            assert.equal(tree.root.left, left);
            assert.equal(tree.root, left.parent);

            assert.equal(tree.root.right, right);
            assert.equal(tree.root, right.parent);

            assert.equal(tree.root.height, 2);
        });

        it("should remove from root and produce empty tree when only value present", () => {

            const tree = new Tree();
            tree.insert(1);

            tree.remove(1);

            assert.equal(tree.root, "");
        });

        it("should remove from root when value present", () => {

            const tree = new Tree();
            tree.insert(1);
            const left = tree.insert(0);
            const right = tree.insert(2);

            tree.remove(1);

            assert.equal(tree.root, left);
            assert.equal(tree.root.parent, "");

            assert.equal(tree.root.right, right);
            assert.equal(tree.root, right.parent);

            assert.equal(tree.root.height, 2);
        });

        it("should remove from left subtree when value present", () => {

            const tree = new Tree();
            tree.insert(1);
            tree.insert(0);
            const right = tree.insert(2);

            tree.remove(0);

            assert.equal(tree.root.left, "");

            assert.equal(tree.root.right, right);
            assert.equal(tree.root, right.parent);

            assert.equal(tree.root.height, 2);
        });

        it("should remove from right subtree when value present", () => {

            const tree = new Tree();
            tree.insert(1);
            const left = tree.insert(0);
            tree.insert(2);

            tree.remove(2);

            assert.equal(tree.root.right, "");

            assert.equal(tree.root.left, left);
            assert.equal(tree.root, left.parent);

            assert.equal(tree.root.height, 2);
        });

        it("should remove from left substree and right substree and decrease root height when values present", () => {

            const tree = new Tree();
            tree.insert(1);
            tree.insert(0);
            tree.insert(2);

            assert.equal(tree.root.height, 2);

            tree.remove(0);
            tree.remove(2);

            assert.equal(tree.root.left, "");
            assert.equal(tree.root.right, "");

            assert.equal(tree.root.height, 1);
        });

        it("should remove from right subtree and perform single rotation", () => {

            const tree = new Tree();
            const root = tree.insert(4);
            const left = tree.insert(2);
            tree.insert(5);
            const leftLeft = tree.insert(1);
            const leftRight = tree.insert(3);

            tree.remove(5);

            assert.equal(tree.root, left);
            assert.equal(tree.root.parent, "");

            assert.equal(tree.root.left, leftLeft);
            assert.equal(tree.root.left.parent, left);

            assert.equal(tree.root.right, root);
            assert.equal(tree.root.right.parent, left);

            assert.equal(tree.root.right.left, leftRight);
            assert.equal(tree.root.right.left.parent, root);

            assert.equal(tree.root.height, 3);
        });

        it("should remove from right subtree and perform double rotation ", () => {

            const tree = new Tree();
            const root = tree.insert(6);
            const left = tree.insert(2);
            const right = tree.insert(7);
            const leftLeft = tree.insert(1);
            const leftRight = tree.insert(4);
            tree.insert(8);
            const leftRightLeft = tree.insert(3);
            const leftRightRight = tree.insert(5);

            tree.remove(8);

            assert.equal(tree.root, leftRight);
            assert.equal(tree.root.parent, "");

            assert.equal(tree.root.left, left);
            assert.equal(tree.root.left.parent, leftRight);

            assert.equal(tree.root.right, root);
            assert.equal(tree.root.right.parent, leftRight);

            assert.equal(tree.root.left.left, leftLeft);
            assert.equal(tree.root.left.left.parent, left);

            assert.equal(tree.root.left.right, leftRightLeft);
            assert.equal(tree.root.left.right.parent, left);

            assert.equal(tree.root.right.left, leftRightRight);
            assert.equal(tree.root.left.right.parent, root);

            assert.equal(tree.root.right.right, right);
            assert.equal(tree.root.right.right.parent, root);

            assert.equal(tree.root.height, 3);
        });
    });
});