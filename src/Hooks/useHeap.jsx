import React, {useEffect, useState} from 'react';

const top = 0;
const parent = (i) => ((i + 1) >>> 1) - 1;
const leftChild = (i) => (i << 1) + 1;
const rightChild = (i) => (i + 1) << 1;

class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
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
        while (node > top && this._greater(node, parent(node))) {
            this._swap(node, parent(node));
            node = parent(node);
        }
    }

    _siftDown() {
        let node = top;
        while (
            (leftChild(node) < this.size() && this._greater(leftChild(node), node)) ||
            (rightChild(node) < this.size() && this._greater(rightChild(node), node))
            ) {
            let maxChild =
                rightChild(node) < this.size() &&
                this._greater(rightChild(node), leftChild(node))
                    ? rightChild(node)
                    : leftChild(node);

            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}


const Heap = (arr) => {
    const data = []

    const fun = () => {
        console.log("in function")
        const pairwiseQueue = new PriorityQueue((a, b) => a[1] > b[1]);

        // {patient number, priority}
        for (let i = 0; i < arr.length; i++) {
            pairwiseQueue.push([arr[i][0], -1 * arr[i][1]]);
        }
        // pairwiseQueue.push(["P1", 0], ["P2", 5], ["P3", 10]);
        // console.log("\nContents:");

        while (!pairwiseQueue.isEmpty()) {
            data.push(pairwiseQueue.pop()[0]);
        }
    }
    fun()

    return data;
};

export default Heap;
