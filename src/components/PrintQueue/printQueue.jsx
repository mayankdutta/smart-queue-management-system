import React from "react";
import "./printQueue.css";

const PrintQueue = ({data, edit, deleteUserPatient}) => {
    console.warn(data);
    return (
        <main>
            <div className={"doctor"}>Doctor</div>

            <div className={"table-container"}>
                <table>
                    <thead>
                    <tr>
                        <th>S. no</th>
                        <th>Name</th>
                        <th>Rank</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className={"name"}>{value.name} </td>
                                {!edit &&
                                    <td
                                        className={"rank"}
                                        style={
                                            (index <= 6 && {backgroundColor: "#A0D995"}) ||
                                            (6 < index &&
                                                index <= 18 && {backgroundColor: "#FFB562"}) ||
                                            (18 < index && {backgroundColor: "#DF7861"})
                                        }
                                    >
                                        {value.rank}
                                    </td>
                                }
                                {edit &&
                                    <td>{value.rank}</td>
                                }
                                {edit &&
                                    <td>✏️</td>
                                }
                                {edit &&
                                    <td onClick={() => deleteUserPatient(value._id)}> ⌫ </td>
                                }
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default PrintQueue;
