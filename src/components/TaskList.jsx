import React from 'react'
import { useStore } from '../store/useTodoStore'
import TaskItem from './TaskItem'


const TaskList = () => {

  const [
    tasks,
    updateTask,
    deleteTask
  ] = useStore(state => [
    state.tasks,
    state.updateTask,
    state.deleteTask
  ])

  return (
    <div className='mt-5'>
      {
        tasks.length > 0
        ? 
          tasks.map((task, index) => (
            <TaskItem 
              key={index} 
              {...task} 
              onDone={deleteTask}
              onEdit={updateTask}
              onRemoved={deleteTask}
            />
          ))
        : 
          <div className='text-center mt-5 text-gray-300'> Задачи пока нет! </div>
      }
    </div>
  )
}

export default TaskList