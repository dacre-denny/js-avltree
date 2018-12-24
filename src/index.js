import { Tree } from "./tree";


const tree = new Tree();

for (var i = 0; i < 10000; i++) {

    const node = tree.insert(i);

    console.log("added node:", node.id, "tree height:", tree.root.height);
}
