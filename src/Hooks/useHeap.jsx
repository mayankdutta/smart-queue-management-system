import React, {useEffect, useState} from 'react';

const top = 0;

class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
    }

    parent(i) {
        return ((i + 1) >>> 1) - 1;
    }

    leftChild(i) {
        return ((i << 1)) + 1;
    }

    rightChild(i) {
        return ((i + 1) << 1);
    }

    size() {
        return this._heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    peek() {
        return this._heap[top];
    }

    push(...values) {
        values.forEach((value) => {
            this._heap.push(value);
            this._siftUp();
        });
        return this.size();
    }

    pop() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > top) {
            this._swap(top, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }

    replace(value) {
        const replacedValue = this.peek();
        this._heap[top] = value;
        this._siftDown();
        return replacedValue;
    }

    _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    }

    _swap(i, j) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }

    _siftUp() {
        let node = this.size() - 1;
        while (node > top && this._greater(node, this.parent(node))) {
            this._swap(node, this.parent(node));
            node = this.parent(node);
        }
    }

    _siftDown() {
        let node = top;
        while (
            (this.leftChild(node) < this.size() && this._greater(this.leftChild(node), node)) ||
            (this.rightChild(node) < this.size() && this._greater(this.rightChild(node), node))
            ) {
            let maxChild =
                this.rightChild(node) < this.size() &&
                this._greater(this.rightChild(node), this.leftChild(node))
                    ? this.rightChild(node)
                    : this.leftChild(node);

            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}


const Heap = (arr) => {
    console.log("printing in the useHeap");
    console.log(arr);

    const data = []
    const fun = () => {
        console.log("in function")
        const pairwiseQueue = new PriorityQueue((a, b) => a[1] > b[1]);

        // {patient number, priority}
        for (let i = 0; i < arr.length; i++) {
            pairwiseQueue.push([arr[i].name, -1 * arr[i].rank, arr[i].penalty]);
        }
        // pairwiseQueue.push(["P1", 0], ["P2", 5], ["P3", 10]);
        // console.log("\nContents:");

        while (!pairwiseQueue.isEmpty()) {
            const poppedElement = pairwiseQueue.pop();
            data.push({name: poppedElement[0], rank: -1 * poppedElement[1], penalty: poppedElement[2]});
        }
        return data;
    }
    fun();
    return data;
};

export default Heap;
