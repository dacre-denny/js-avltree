import { Tree } from "./tree";


const tree = new Tree();

for (var i = 0; i < 1000; i++) {

    tree.insert(i);

    console.log("added node:", i, "tree height:", tree.root.height);
}

for (var j = 0; j < 1000; j++) {

    tree.remove(1000 - j);

    console.log("removed node:", j, "tree height:", tree.root.height);
}

