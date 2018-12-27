var { assert } = require("chai");
var { Tree } = require("../src/tree");

describe("Tree module", () => {

    it("should have no root no data inserted tree", () => {

        const tree = new Tree();

        assert.equal(tree.root, "");
    });

    describe("insert", () => {

        it("should insert first value at root of empty tree", () => {

            const tree = new Tree();

            tree.insert(1);

            assert.equal(tree.root.value, 1);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 1);

            assert.equal(tree.root.left, "");

            assert.equal(tree.root.right, "");
        });

        it("should insert into right subtree if value greater than first value", () => {

            const tree = new Tree();

            tree.insert(1);
            tree.insert(2);

            assert.equal(tree.root.value, 1);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 2);

            assert.equal(tree.root.left, "");

            assert.equal(tree.root.right.value, 2);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 1);
        });

        it("should insert into left subtree if value less than first value", () => {

            const tree = new Tree();

            tree.insert(2);
            tree.insert(1);

            assert.equal(tree.root.value, 2);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 2);

            assert.equal(tree.root.right, "");

            assert.equal(tree.root.left.value, 1);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 1);
        });

        it("should insert into left subtree if value less than first value and insert to right subtree if value greater than first value", () => {

            const tree = new Tree();

            tree.insert(2);
            tree.insert(1);
            tree.insert(3);

            assert.equal(tree.root.value, 2);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 2);

            assert.equal(tree.root.left.value, 1);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 1);

            assert.equal(tree.root.right.value, 3);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 1);
        });

        it("should insert into left-left-left subtree and perform single rotation", () => {

            const tree = new Tree();

            tree.insert(5);
            tree.insert(3);
            tree.insert(6);
            tree.insert(2);
            tree.insert(4);
            tree.insert(1); //left-left-left, triggers rotation

            assert.equal(tree.root.value, 3);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 3);

            assert.equal(tree.root.left.value, 2);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 2);

            assert.equal(tree.root.right.value, 5);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 2);

            assert.equal(tree.root.left.left.value, 1);
            assert.equal(tree.root.left.left.parent, tree.root.left);
            assert.equal(tree.root.left.left.height, 1);

            assert.equal(tree.root.right.left.value, 4);
            assert.equal(tree.root.right.left.parent, tree.root.right);
            assert.equal(tree.root.right.left.height, 1);

            assert.equal(tree.root.right.right.value, 6);
            assert.equal(tree.root.right.right.parent, tree.root.right);
            assert.equal(tree.root.right.right.height, 1);
        });

        it("should insert into left-left-right subtree and perform single rotation", () => {

            const tree = new Tree();

            tree.insert(5);
            tree.insert(3);
            tree.insert(6);
            tree.insert(1);
            tree.insert(4);
            tree.insert(2); //left-left-right, triggers rotation

            assert.equal(tree.root.value, 3);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 3);

            assert.equal(tree.root.left.value, 1);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 2);

            assert.equal(tree.root.right.value, 5);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 2);

            assert.equal(tree.root.left.right.value, 2);
            assert.equal(tree.root.left.right.parent, tree.root.left);
            assert.equal(tree.root.left.right.height, 1);

            assert.equal(tree.root.right.left.value, 4);
            assert.equal(tree.root.right.left.parent, tree.root.right);
            assert.equal(tree.root.right.left.height, 1);

            assert.equal(tree.root.right.right.value, 6);
            assert.equal(tree.root.right.right.parent, tree.root.right);
            assert.equal(tree.root.right.right.height, 1);
        });

        it("should insert into left-right-left subtree and perform double rotation", () => {

            const tree = new Tree();

            tree.insert(7);
            tree.insert(2);
            tree.insert(8);
            tree.insert(1);
            tree.insert(5);
            tree.insert(4); //left-right-left, triggers rotation

            assert.equal(tree.root.value, 5);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 3);

            assert.equal(tree.root.left.value, 2);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 2);

            assert.equal(tree.root.left.left.value, 1);
            assert.equal(tree.root.left.left.parent, tree.root.left);
            assert.equal(tree.root.left.left.height, 1);

            assert.equal(tree.root.left.right.value, 4);
            assert.equal(tree.root.left.right.parent, tree.root.left);
            assert.equal(tree.root.left.right.height, 1);

            assert.equal(tree.root.right.value, 7);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 2);

            assert.equal(tree.root.right.left, "");

            assert.equal(tree.root.right.right.value, 8);
            assert.equal(tree.root.right.right.parent, tree.root.right);
            assert.equal(tree.root.right.right.height, 1);
        });

        it("should insert into left-right-right subtree and perform double rotation", () => {

            const tree = new Tree();

            tree.insert(7);
            tree.insert(2);
            tree.insert(8);
            tree.insert(1);
            tree.insert(4);
            tree.insert(5); //left-right-right, triggers rotation

            assert.equal(tree.root.value, 4);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 3);

            assert.equal(tree.root.left.value, 2);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 2);

            assert.equal(tree.root.left.left.value, 1);
            assert.equal(tree.root.left.left.parent, tree.root.left);
            assert.equal(tree.root.left.left.height, 1);

            assert.equal(tree.root.left.right, "");

            assert.equal(tree.root.right.value, 7);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 2);

            assert.equal(tree.root.right.left.value, 5);
            assert.equal(tree.root.right.left.parent, tree.root.right);
            assert.equal(tree.root.right.left.height, 1);

            assert.equal(tree.root.right.right.value, 8);
            assert.equal(tree.root.right.right.parent, tree.root.right);
            assert.equal(tree.root.right.right.height, 1);
        });

        it("should insert into right-right-right subtree and perform single rotation", () => {

            const tree = new Tree();

            tree.insert(5);
            tree.insert(4);
            tree.insert(7);
            tree.insert(6);
            tree.insert(8);
            tree.insert(9); //right-right-right, triggers rotation

            assert.equal(tree.root.value, 7);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 3);

            assert.equal(tree.root.left.value, 5);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 2);

            assert.equal(tree.root.left.left.value, 4);
            assert.equal(tree.root.left.left.parent, tree.root.left);
            assert.equal(tree.root.left.left.height, 1);

            assert.equal(tree.root.left.right.value, 6);
            assert.equal(tree.root.left.right.parent, tree.root.left);
            assert.equal(tree.root.left.right.height, 1);

            assert.equal(tree.root.right.value, 8);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 2);

            assert.equal(tree.root.right.right.value, 9);
            assert.equal(tree.root.right.right.parent, tree.root.right);
            assert.equal(tree.root.right.right.height, 1);
        });

        it("should insert into right-right-left subtree and perform single rotation", () => {

            const tree = new Tree();

            tree.insert(5);
            tree.insert(4);
            tree.insert(7);
            tree.insert(6);
            tree.insert(9);
            tree.insert(8); //right-right-left, triggers rotation

            assert.equal(tree.root.value, 7);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 3);

            assert.equal(tree.root.left.value, 5);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 2);

            assert.equal(tree.root.left.left.value, 4);
            assert.equal(tree.root.left.left.parent, tree.root.left);
            assert.equal(tree.root.left.left.height, 1);

            assert.equal(tree.root.left.right.value, 6);
            assert.equal(tree.root.left.right.parent, tree.root.left);
            assert.equal(tree.root.left.right.height, 1);

            assert.equal(tree.root.right.value, 9);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 2);

            assert.equal(tree.root.right.left.value, 8);
            assert.equal(tree.root.right.left.parent, tree.root.right);
            assert.equal(tree.root.right.left.height, 1);
        });

        it("should insert into right-left-right subtree and perform double rotation", () => {

            const tree = new Tree();

            tree.insert(2);
            tree.insert(1);
            tree.insert(6);
            tree.insert(4);
            tree.insert(8);
            tree.insert(5); //right-left-right, triggers rotation

            assert.equal(tree.root.value, 4);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 3);

            assert.equal(tree.root.left.value, 2);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 2);

            assert.equal(tree.root.left.left.value, 1);
            assert.equal(tree.root.left.left.parent, tree.root.left);
            assert.equal(tree.root.left.left.height, 1);

            assert.equal(tree.root.left.right, "");

            assert.equal(tree.root.right.value, 6);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 2);

            assert.equal(tree.root.right.left.value, 5);
            assert.equal(tree.root.right.left.parent, tree.root.right);
            assert.equal(tree.root.right.left.height, 1);

            assert.equal(tree.root.right.right.value, 8);
            assert.equal(tree.root.right.right.parent, tree.root.right);
            assert.equal(tree.root.right.right.height, 1);
        });

        it("should insert into right-left-left subtree and perform double rotation", () => {

            const tree = new Tree();

            tree.insert(2);
            tree.insert(1);
            tree.insert(6);
            tree.insert(5);
            tree.insert(8);
            tree.insert(4); //right-left-right, triggers rotation

            assert.equal(tree.root.value, 5);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 3);

            assert.equal(tree.root.left.value, 2);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 2);

            assert.equal(tree.root.left.left.value, 1);
            assert.equal(tree.root.left.left.parent, tree.root.left);
            assert.equal(tree.root.left.left.height, 1);

            assert.equal(tree.root.left.right.value, 4);
            assert.equal(tree.root.left.right.parent, tree.root.left);
            assert.equal(tree.root.left.right.height, 1);

            assert.equal(tree.root.right.value, 6);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 2);

            assert.equal(tree.root.right.left, "");

            assert.equal(tree.root.right.right.value, 8);
            assert.equal(tree.root.right.right.parent, tree.root.right);
            assert.equal(tree.root.right.right.height, 1);
        });
    });

    describe("find", () => {

        it("should return undefined if tree empty", () => {

            const tree = new Tree();

            assert.isUndefined(tree.find(1));
        });

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

            tree.insert(2);
            tree.insert(1);
            tree.insert(3);

            tree.remove(4);

            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.value, 2);
            assert.equal(tree.root.height, 2);

            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.value, 1);
            assert.equal(tree.root.left.height, 1);

            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.value, 3);
            assert.equal(tree.root.right.height, 1);
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
            tree.insert(0);
            tree.insert(2);

            tree.remove(1);

            assert.equal(tree.root.value, 2);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 2);

            assert.equal(tree.root.left.value, 0);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 1);

            assert.equal(tree.root.right, "");
        });

        it("should remove left leaf node when value present", () => {

            const tree = new Tree();

            tree.insert(1);
            tree.insert(0);
            tree.insert(2);

            tree.remove(0);

            assert.equal(tree.root.value, 1);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 2);

            assert.equal(tree.root.left, "");

            assert.equal(tree.root.right.value, 2);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 1);
        });

        it("should remove right leaf node when value present", () => {

            const tree = new Tree();

            tree.insert(1);
            tree.insert(0);
            tree.insert(2);

            tree.remove(2);

            assert.equal(tree.root.value, 1);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 2);

            assert.equal(tree.root.left.value, 0);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 1);

            assert.equal(tree.root.right, "");
        });

        it("should remove left and right leaf nodes and decrease root height when values present", () => {

            const tree = new Tree();

            tree.insert(1);
            tree.insert(0);
            tree.insert(2);

            assert.equal(tree.root.height, 2);

            tree.remove(0);
            tree.remove(2);

            assert.equal(tree.root.value, 1);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 1);

            assert.equal(tree.root.left, "");
            assert.equal(tree.root.right, "");
        });

        it("should remove from right subtree and perform single rotation", () => {

            const tree = new Tree();

            tree.insert(4);
            tree.insert(2);
            tree.insert(5);
            tree.insert(1);
            tree.insert(3);

            tree.remove(5);

            assert.equal(tree.root.value, 3);
            assert.equal(tree.root.parent, "");
            assert.equal(tree.root.height, 3);

            assert.equal(tree.root.right.value, 4);
            assert.equal(tree.root.right.parent, tree.root);
            assert.equal(tree.root.right.height, 1);

            assert.equal(tree.root.left.value, 2);
            assert.equal(tree.root.left.parent, tree.root);
            assert.equal(tree.root.left.height, 2);

            assert.equal(tree.root.left.left.value, 1);
            assert.equal(tree.root.left.left.parent, tree.root.left);
            assert.equal(tree.root.left.left.height, 1);

            assert.equal(tree.root.left.right, "");
        });
        return;
        /*
        
        
        
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

        it("should remove from left subtree and perform single rotation", () => {

            const tree = new Tree();
            const root = tree.insert(2);
            const left = tree.insert(0);
            tree.insert(3);
            const leftLeft = tree.insert(-1);
            const leftRight = tree.insert(1);

            tree.remove(3);

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
                */
    });
});