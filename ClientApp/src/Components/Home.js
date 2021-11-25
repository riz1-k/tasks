import React from 'react';

function Home() {
  return (
    <div className='flex justify-center mt-8'>
      <div className='flex flex-col'>
        <h1 className='font-sans  text-6xl '>Welcome to Tasks!</h1>
        <br />
        <p className='font-sans text-2xl justify-center flex '>
          Navigate to
          <a href='/assign' className='text-blue-500 mx-2  '>
            Assign Tasks
          </a>
          to add tasks.
        </p>
      </div>
    </div>
  );
}

export default Home;
