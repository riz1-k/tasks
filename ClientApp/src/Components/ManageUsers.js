import React, { useState, useEffect } from 'react';
import BackDrop from '../Components/BackDrop';
import SignUp from './SignUp';
require('dotenv').config();

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [signup, setsignup] = useState(false);

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const deleteUser = id => {
    if (window.confirm('Are you sure?')) {
      fetch(process.env.REACT_APP_API + 'users/' + id, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(window.location.reload());
    }
  };

  return (
    <>
      {signup && (
        <BackDrop loading={false}>
          <SignUp setsignup={setsignup} />
        </BackDrop>
      )}
      <div>
        <section className='container mx-auto p-6 font-mono'>
          <div className='w-full mb-8 overflow-hidden rounded-lg shadow-lg'>
            <div className='w-full overflow-x-auto no-scrollbar'>
              <table className='w-full'>
                <thead>
                  <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
                    <th className='px-4 py-3'>ID</th>
                    <th className='px-4 py-3'>Name</th>
                    <th className='px-3 py-3'>Email</th>
                    <th className='px-2 py-3'>Action</th>
                  </tr>
                </thead>

                <tbody className='bg-white'>
                  {users.map(mov => (
                    <tr
                      className='text-gray-700 hover:bg-gray-100  '
                      key={mov.UserId}
                    >
                      <td className='px-4 py-3 text-ms font-semibold border'>
                        {mov.UserId}
                      </td>
                      <td className='px-4 py-3 text-ms font-semibold border'>
                        {mov.UserName}
                      </td>
                      <td className='px-4 py-3 text-ms font-semibold border'>
                        {mov.UserEmail}
                      </td>
                      <td className='px-1 py-3 text-sm border'>
                        <div className='flex justify-center mx-2'>
                          <button
                            className='py-1 text-white text-xl  px-2 bg-red-500 mx-1 rounded-full  '
                            onClick={() => deleteUser(mov.UserId)}
                          >
                            <i className='bx bxs-calendar-x  '></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            className='py-1 text-white text-xl  px-2 bg-blue-500 mx-1 rounded-full '
            onClick={() => setsignup(true)}
          >
            <i className='bx bx-plus'></i>
          </button>
        </section>
      </div>
    </>
  );
}
