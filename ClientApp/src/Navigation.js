import React, { useState } from 'react';
import Login from './Components/Login';
import BackDrop from './Components/BackDrop';

function Navigation() {
  const [login, setlogin] = useState(false);

  return (
    <div>
      {login && (
        <BackDrop loading={false}>
          <Login setlogin={setlogin} />
        </BackDrop>
      )}
      <nav class='font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-around py-4 px-6 bg-gray-700  shadow sm:items-baseline w-full'>
        <div class='mb-2 sm:mb-0'>
          <a
            href='/'
            class='text-2xl no-underline text-white hover:text-blue-dark'
          >
            Tasks
          </a>
        </div>
        <div>
          <a
            href='/assign'
            class={`text-lg no-underline text-white hover:text-blue-dark ml-2 mx-3 ${
              localStorage.getItem('userName:') ? 'hidden' : 'block'
            } `}
          >
            Assign Tasks
          </a>
          <a
            href='/yourtasks'
            class={`text-lg no-underline text-white hover:text-blue-dark ml-2 mx-3 ${
              localStorage.getItem('userName:') ? 'hidden' : 'block'
            } `}
          >
            Your Tasks
          </a>
          <a
            href='/resolvedtasks'
            class={`text-lg no-underline text-white hover:text-blue-dark ml-2 mx-3 ${
              localStorage.getItem('userName:') ? 'hidden' : 'block'
            } `}
          >
            Resolved Tasks
          </a>
        </div>
        <div className='flex'>
          <a
            href='/users'
            class={`${
              localStorage.getItem('userEmail:') === 'admin@gmail.com'
                ? 'block'
                : 'hidden'
            } text-lg no-underline text-white hover:text-blue-dark ml-2 mx-3 `}
          >
            Manage Users
          </a>
          <button
            onClick={() => setlogin(true)}
            class={`text-lg no-underline text-white hover:text-blue-dark ml-2 mx-3 ${
              localStorage.getItem('userName:') ? 'hidden' : 'block'
            } `}
          >
            Log In
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('userName:');
              localStorage.removeItem('userEmail:');
              window.location.reload();
            }}
            class={`text-lg no-underline text-white hover:text-blue-dark ml-2 mx-3 ${
              localStorage.getItem('userName:') ? 'block' : 'hidden'
            } `}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
