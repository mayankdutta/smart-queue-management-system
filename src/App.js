import useHeap from "./Hooks/useHeap"
import {useEffect} from "react";

function App() {
    const entryPoint = [["P1", 0], ["P2", 5], ["P3", 10], ["P5", 12], ["P9", 200], ["P10", 1000], ["P11", 1], ["P0", -1]];
    let data = useHeap(entryPoint);
    useEffect(() => {
        const fun = () => {
        }
        fun();
    }, [entryPoint])

    return (<>
        <h1> Hello world</h1>
        <table>
            <thead>
            <tr>
                {data.map((value, index) => {
                    return (<th key={index}>Patients</th>)
                })}
            </tr>

            </thead>
            <tbody>
            <tr>
                {data.map((value, index) => {
                    return (<td style={{border: "solid 2px black"}} key={index}>{value}</td>)
                })}
            </tr>
            </tbody>
        </table>
    </>);
}

export default App;
