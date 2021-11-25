import React, { useEffect, useState } from 'react';
import moment from 'moment';
import AddTaskModal from '../Components/Modals/AddTaskModal';
import EditTaskModal from '../Components/Modals/EditTaskModal';

require('dotenv').config();

export default function Assign() {
  const [tasks, setTasks] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editModalData, setEditModalData] = useState({
    taskid: '',
    taskdesc: '',
    startdate: '',
    enddate: '',
    aue: '',
    category: '',
    priority: '',
    status: '',
  });

  const {
    taskid,
    taskdesc,
    startdate,
    enddate,
    aue,
    category,
    priority,
    status,
  } = editModalData;

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, [tasks]);

  const deleteMov = id => {
    if (window.confirm('Are you sure?')) {
      fetch(process.env.REACT_APP_API + 'tasks/' + id, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
  };

  const addModalClose = () => setAddModalShow(false);
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
                      <div className='flex justify-start mx-2'>
                        <button
                          className='py-1 text-white  px-2 bg-green-500 mx-1 rounded-full hover:scale-105'
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
                        >
                          <i className='bx bxs-edit-alt text-xl'></i>
                        </button>
                        <button
                          className='py-1 text-white text-xl  px-2 bg-red-500 mx-1 rounded-full  '
                          onClick={() => deleteMov(mov.TaskId)}
                        >
                          <i className='bx bxs-calendar-x  '></i>
                        </button>
                      </div>

                      <EditTaskModal
                        show={editModalShow}
                        onHide={editModalClose}
                        taskid={taskid}
                        taskdesc={taskdesc}
                        startdate={startdate}
                        enddate={enddate}
                        aue={aue}
                        category={category}
                        priority={priority}
                        status={status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <button
            className='py-1 text-white text-xl  px-2 bg-blue-500 mx-1 rounded-full '
            onClick={() => setAddModalShow(true)}
          >
            <i className='bx bx-plus'></i>
          </button>
          <AddTaskModal
            show={addModalShow}
            onHide={addModalClose}
          ></AddTaskModal>
        </div>
      </section>
    </>
  );
}
