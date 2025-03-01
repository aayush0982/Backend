import React from 'react'

const Title = (props) => {
  return (
    <div className='flex gap-3 items-center justify-center'>
      <p className='h-1 w-32 mt-2 bg-gray-700'></p>
      <p className='text-gray-500'>{props.text1}</p>
      <p className='text-gray-700 font-medium'>{props.text2}</p>
      <p className='h-1 w-32 mt-2 bg-gray-700'></p>
    </div>
  )
}

export default Title
