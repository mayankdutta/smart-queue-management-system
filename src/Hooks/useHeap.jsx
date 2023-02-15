import PriorityQueue from '../Algorithm/Heap';
import { useEffect, useState } from 'react';
import { clear } from '@testing-library/user-event/dist/clear';

const Heap = (arr) => {
  console.log('in the custom hook');
  console.log(arr);

  const data = [];

  const fun = () => {
    console.log('fun inside the custom Hook');
    // const pairwiseQueue = new PriorityQueue((a, b) => a[1] > b[1]);
    const pairwiseQueue = new PriorityQueue(function (a, b) {
      if (a[1] === b[1]) {
        return a[3] < b[3];
      }
      return a[1] > b[1];
    });
    // because elements push as in array format in pq.
    // const pairwiseQueue = new PriorityQueue((a, b) => a.rank > b.rank);

    // {patient number, priority}
    for (let i = 0; i < arr.length; i++) {
      pairwiseQueue.push([
        arr[i].name,
        -1 * arr[i].rank,
        arr[i].penalty,
        arr[i].initialOrder,
      ]);
    }
    // pairwiseQueue.push(["P1", 0], ["P2", 5], ["P3", 10]);
    // console.log("\nContents:");

    while (!pairwiseQueue.isEmpty()) {
      const poppedElement = pairwiseQueue.pop();
      data.push({
        name: poppedElement[0],
        rank: -1 * poppedElement[1],
        penalty: poppedElement[2],
        initialOrder: poppedElement[3],
      });
    }
  };
  console.warn(data);

  fun();
  return data;
};

export default Heap;
