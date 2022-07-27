import React, { useRef, useState, useEffect } from 'react'

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="24px" height="24px">
    <path d="M 18.400391 2 C 18.100391 2 17.899219 2.1007812 17.699219 2.3007812 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.699219 6.3007812 C 22.099219 5.9007812 22.099219 5.3003906 21.699219 4.9003906 L 19.099609 2.3007812 C 18.899609 2.1007812 18.700391 2 18.400391 2 z M 18.400391 4.4003906 L 19.599609 5.5996094 L 18.306641 6.8925781 L 17.107422 5.6933594 L 18.400391 4.4003906 z M 15.693359 7.1074219 L 16.892578 8.3066406 L 6.1992188 19 L 5 19 L 5 17.800781 L 15.693359 7.1074219 z"/>
  </svg>
)

const DelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 30 30" width="24px" height="24px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg>
)


const TaskItem = ({ id, title, createdAt, onDone, onEdit, onRemoved }) => {

  const [checked, setChecked] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState(title)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEdit) {
      inputRef?.current?.focus()
    }
  }, [isEdit])
  

  const editHandler = (id, value) => {
    onEdit(id, value)
    setIsEdit(false)
  }

  return (
    <div className='flex h-20 relative items-center rounded-lg justify-between p-5 mb-4 bg-teal-500 bg-opacity-20 backdrop-blur-sm'>
      <div>
        <input 
          type="checkbox" 
          checked={checked}
          disabled={isEdit}
          onChange={(e) => {
            setChecked(e.target.checked)
            if (e.target.checked) {onDone(id)}
          }}
        />
      </div>

      { isEdit 
        ? 
        (<input 
          ref={inputRef}
          type='text' 
          className='bg-transparent border-b border-white outline-none text-white p-1'
          placeholder='New title'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') editHandler(id, value)
          }}
        />)
        :
        (<div className='font-semibold text-white'>{title}</div>)
      }

      <div className='flex gap-4'>
        { isEdit
          ?
           
          (<button 
            className='text-white p-2 shadow-lg rounded-sm font-black'
            onClick={() => editHandler(id, value)}
          >
            &#10004;
          </button>)
          :
          (<button 
            className='text-white p-2 shadow-lg rounded-sm'
            onClick={() => setIsEdit(true)}
          >
            <EditIcon/>
          </button>)
        }

        <button 
          className='text-white p-2 shadow-lg rounded-sm'
          onClick={() => {
            if (window.confirm('Ты уверен?')) {
              onRemoved(id)
            }
          }}
        >
          <DelIcon/>
        </button>

      </div>

      <div className='absolute text-xs p-1 rounded-md -top-1 left-5 bg-teal-900 text-white'>
        {createdAt}
      </div>
    </div>
  )
}

export default TaskItem