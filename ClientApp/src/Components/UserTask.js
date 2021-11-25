import React, { useEffect, useState } from 'react';
import moment from 'moment';
import AddResolveModal from '../Components/Modals/AddResolveModal';
require('dotenv').config();

export default function UserTask() {
  const [tasks, setTasks] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editModalData, setEditModalData] = useState({
    taskid: '',
    taskdesc: '',
    startdate: '',
    enddate: '',
    aue: '',
    category: '',
    priority: '',
  });

  const { taskid, taskdesc, startdate, enddate, aue, category, priority } =
    editModalData;

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(
          data.filter(
            d => d.AssignedUserEmail === localStorage.getItem('userEmail:')
          )
        );
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const editModalClose = () => setEditModalShow(false);

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
                  <th className='px-4 py-3'>Action</th>
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

                    <td className='px-1 py-3 text-sm border'>
                      <div className='flex justify-center mx-2'>
                        <button
                          onClick={() => {
                            setEditModalShow(true);
                            setEditModalData({
                              taskid: mov.TaskId,
                              taskdesc: mov.TaskDesc,
                              startdate: mov.StartDate,
                              enddate: mov.EndDate,
                              aue: mov.AssignedUserEmail,
                              category: mov.Category,
                              priority: mov.Priority,
                              status: mov.Status,
                            });
                          }}
                          className='py-1 text-white  px-2 bg-yellow-400 mx-1 rounded-full hover:scale-105'
                        >
                          <i class='bx bx-check'></i>
                        </button>
                      </div>
                      <AddResolveModal
                        show={editModalShow}
                        onHide={editModalClose}
                        taskid={taskid}
                        taskdesc={taskdesc}
                        startdate={startdate}
                        enddate={enddate}
                        aue={aue}
                        category={category}
                        priority={priority}
                      />
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
