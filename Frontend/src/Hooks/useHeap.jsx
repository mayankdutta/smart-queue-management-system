import PriorityQueue from "../Algorithm/Heap";

const Heap = (arr) => {
    console.log("in the custom hook");
    console.log(arr);

    const data = []

    const fun = () => {
        console.log("fun inside the custom Hook")
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
    }

    fun();
    return data;
};

export default Heap;