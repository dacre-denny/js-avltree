import { Tree } from "../src/tree";

function profileAction(tag, action) {

    const t0 = Date.now();

    action();

    const t1 = Date.now();

    console.log(`${tag} (took ${t1 - t0}ms)`);
}

const COUNT = 10000000;

const tree = new Tree();

profileAction(`Inserting ${COUNT} items`, () => {
    for (var i = 0; i < COUNT; i++) {
        tree.insert(i);
    }
});

profileAction(`Finding ${COUNT} items`, () => {
    for (var j = 0; j < COUNT; j++) {
        tree.find(j);
    }
});

profileAction(`Removing ${COUNT} items`, () => {
    for (var k = 0; k < COUNT; k++) {
        tree.remove(k);
    }
});

