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

    updateLevel() {

        const { left, right } = this;

        this.height = Math.max(left ? left.height : 0, right ? right.height : 0) + 1;
    }

    
}