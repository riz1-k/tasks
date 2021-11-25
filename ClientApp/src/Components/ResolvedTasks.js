import React, { useEffect, useState } from 'react';
import moment from 'moment';
require('dotenv').config();

export default function ResolvedTasks() {
  const [tasks, setTasks] = useState([]);
  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data.filter(d => d.Status === 'Done'));
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <>
      <section className='container mx-auto p-6 font-mono'>
        <div className='w-full mb-8 overflow-hidden rounded-lg shadow-lg'>
          <div className='w-full overflow-x-auto no-scrollbar'>
            <table className='w-full'>
              <thead>
                <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
                  <th className='px-4 py-3'>ID</th>
                  <th className='px-4 py-3'>Task</th>
                  <th className='px-3 py-3'>Start Date</th>
                  <th className='px-4 py-3'>End Date</th>
                  <th className='px-4 py-3'>User</th>
                  <th className='px-4 py-3'>Category</th>
                  <th className='px-4 py-3'>Priority</th>
                  <th className='px-4 py-3'>Status</th>
                  <th className='px-6 py-3'>Description</th>
                </tr>
              </thead>

              <tbody className='bg-white'>
                {tasks.map(mov => (
                  <tr
                    className='text-gray-700 hover:bg-gray-100  '
                    key={mov.TaskId}
                  >
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.TaskId}
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.TaskDesc}
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {moment(mov.StartDate).format('D-M-Y')}
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {moment(mov.EndDate).format('D-M-Y')}
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.AssignedUserEmail}
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.Category}
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.Priority}
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.Status}
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.ResolvedDesc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
