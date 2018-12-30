import { Tree } from "./tree";

const COUNT = 1000;
const tree = new Tree();

for (var i = 0; i < COUNT; i++) {

    tree.insert(i);

    console.log("added node:", i, "tree height:", tree.root.height);
}

for (var j = 0; j < COUNT; j++) {



    tree.remove(COUNT - (j + 1));

    console.log("removed node:", j, "tree height:", tree.root.height);
}

