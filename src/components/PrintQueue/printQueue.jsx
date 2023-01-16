import React from "react";
import "./printQueue.css";
import { Link } from "react-router-dom";

const PrintQueue = ({ data, edit, deleteUserPatient }) => {
  return (
    <main>
      <h2>{edit ? <> Your Patients </> : <> All Patients </>}</h2>

      <div className={"table-container"}>
        <table>
          <thead>
            <tr>
              <th>S. no</th>
              <th>Name</th>
              <th>Rank</th>
              {deleteUserPatient && <th>Edit</th>}
              {deleteUserPatient && <th>Delete</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className={"name"}>
                    <Link to={"/details"}>{value.name}</Link>{" "}
                  </td>
                  <td>{value.rank}</td>
                  {edit && (
                    <>
                      <td>
                        <Link to={"/update_patient/" + value._id}>✏️</Link>
                      </td>
                      <td onClick={() => deleteUserPatient(value._id)}> ⌫ </td>
                    </>
                  )}
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
