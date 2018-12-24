var id = 1;

export class Node {

    constructor() {

        this.value = 0;
        this.id = id++;
        this.left = "";
        this.right = "";
        this.height = 0;
        this.parent = "";
    }
}