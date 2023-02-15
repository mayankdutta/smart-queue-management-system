class PriorityQueue {
  constructor(comparator) {
    this.top = 0;
    this._heap = [];
    this._comparator = comparator;
  }

  parent(i) {
    return ((i + 1) >>> 1) - 1;
  }

  leftChild(i) {
    return (i << 1) + 1;
  }

  rightChild(i) {
    return (i + 1) << 1;
  }

  size() {
    return this._heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this._heap[this.top];
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
    if (bottom > this.top) {
      this._swap(this.top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  replace(value) {
    const replacedValue = this.peek();
    this._heap[this.top] = value;
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
    while (node > this.top && this._greater(node, this.parent(node))) {
      this._swap(node, this.parent(node));
      node = this.parent(node);
    }
  }

  _siftDown() {
    let node = this.top;
    while (
      (this.leftChild(node) < this.size() &&
        this._greater(this.leftChild(node), node)) ||
      (this.rightChild(node) < this.size() &&
        this._greater(this.rightChild(node), node))
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

export default PriorityQueue;
