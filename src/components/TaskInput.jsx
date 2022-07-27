import React, { useState } from 'react'

const TaskInput = ({onAdd}) => {

  const [title, settitle] = useState('')

  const createTaskHandler = () => {
    if (title.trim() !== '') {
      onAdd(title)
      settitle('')
    } else {
      alert('Enter title!')
    }
  }

  return (
    <div className='border-b pb-5 border-gray-200 flex items-center justify-center gap-3'>
      <div className='max-w-sm w-full flex'>
        <input 
          type="text" 
          className='bg-teal-700 bg-opacity-40 outline-none text-white rounded-md p-2 w-full placeholder:text-gray-300 flex-1' 
          placeholder='Type here...'
          value={title}
          onChange={e => settitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.which === 13) createTaskHandler()
          }}
        />
      </div>
      <div>
        <button
          className='px-4 rounded-md py-2 bg-teal-700 text-white drop-shadow-xl'
          onClick={() => createTaskHandler()}
        >+</button>
      </div>
    </div>
  )
}

export default TaskInput