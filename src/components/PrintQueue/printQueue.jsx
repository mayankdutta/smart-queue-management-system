import React from 'react';
// import './printQueue.css';
import { Link } from 'react-router-dom';
import { PatientContext } from '../../contexts/patient.context';
import { useContext } from 'react';
import IconDelete from '../icons/delete.component';
import IconEdit from '../icons/edit.component';

const PrintQueue = ({ data, edit }) => {
  const { deleteUserPatient } = useContext(PatientContext);

  const cell = 'px-6 py-3';
  return (
    <main className="px-8">
      <h2 className="text-4xl">
        {edit ? <> Your Patients </> : <> Patients for today </>}
      </h2>

      <div className={'relative overflow-x-auto shadow-md sm:rounded-lg'}>
        <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className={cell}>S. no</th>
              <th className={cell}>Name</th>
              <th className={cell}>Patient No.</th>
              {edit && <th className={cell}>Edit</th>}
              {edit && <th className={cell}>Delete</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={index} className="bg-white border-b ">
                  <td className={cell}>{index + 1}</td>
                  <td className={cell}>
                    <Link to={'/details'}>{value.name}</Link>
                  </td>
                  <td className={cell}> {value.rank}</td>
                  {edit && (
                    <>
                      <td className={cell}>
                        <Link
                          to={'/update_patient/' + value._id}
                          className="cursor-default"
                        >
                          <IconDelete />
                        </Link>
                      </td>
                      <td
                        className={cell}
                        onClick={() => deleteUserPatient(value._id)}
                      >
                        <IconEdit />
                      </td>
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
