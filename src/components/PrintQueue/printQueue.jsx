import React from 'react';
import "./printQueue.css"

const PrintQueue = ({data}) => {
    return (
        <main>
            <div className={"card"}>
                <div className={"doctor"}>
                    Doctor
                </div>
                {data.map((value, index) => {
                    return (

                        <div className={"body"} style={{border: "solid 2px black"}} key={index}>
                            <div className={"name"}>name: {value.name} </div>
                            <div className={"rank"}
                                 style={
                                     (index <= 6 && {backgroundColor: "#A0D995"}) ||
                                     (6 < index && index <= 18 && {backgroundColor: "#FFB562"}) ||
                                     (18 < index && {backgroundColor: "#DF7861"})
                                 }
                            >
                                rank: {value.rank}
                            </div>
                        </div>)
                })}
            </div>
        </main>
    );
};

export default PrintQueue;