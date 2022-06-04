import React from 'react';

const PrintQueue = ({data, i = null}) => {
    return (
        <table>
            <thead>
            <tr>
                {data.map((value, index) => {
                    return (<th key={index}
                                style={i !== null && (i === index ?
                                    {backgroundColor: "#B8F1B0"} :
                                    {backgroundColor: "#C6DCE4"})}>
                        Patients</th>)
                })}
            </tr>

            </thead>
            <tbody>
            <tr>
                {data.map((value, index) => {
                    return (<td style={{border: "solid 2px black"}
                    } key={index}>{value.name}</td>)
                })}
            </tr>
            </tbody>
            <tbody>
            <tr>
                {data.map((value, index) => {
                    return (<td style={{border: "solid 2px black"}
                    } key={index}>{value.rank}</td>)
                })}
            </tr>
            </tbody>
        </table>
    );
};

export default PrintQueue;