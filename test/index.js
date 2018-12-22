var { assert } = require("chai");
var { Tree } = require("../src/tree");

describe("Tree module", () => {

    it("should insert data into an empty tree", () => {


        const tree = new Tree();

        tree.insert(1);
        tree.insert(2);
        tree.insert(3);
        tree.insert(4);
    });
});