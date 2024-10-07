import React from 'react';

const Timer = ({minutes, seconds }) => {

  return (
      <div className='py-1 px-2 my-2 rounded-md text-2xl text-[var(--color-primary-100)] border border-[var(--color-primary-100)] tracking-wider'>
        <span>{minutes > 9 ? minutes : '0'+minutes}</span>:<span>{seconds > 9 ? seconds : '0' + seconds}</span>
      </div>
  );
}

export default Timer;