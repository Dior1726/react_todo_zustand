import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useStore } from './store/useTodoStore';

const photoUrl = 'https://images.unsplash.com/photo-1560759226-14da22a643ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'

function App() {

  const [ createTask ] = useStore(state => [ state.createTask ])
  
  return (
    <div className='w-full text-lg min-h-screen p-4 flex items-center justify-center bg-center bg-cover' style={{'backgroundImage': `url(${photoUrl})`}}>
      <div 
        className='bg-white bg-opacity-10 backdrop-blur rounded-2xl shadow-2xl max-w-3xl w-full p-10 border border-gray-600'
      >
        <h1 className='text-center text-white text-4xl font-bold mb-5'>To Do App</h1>

        {/* form */}
        <TaskInput
          onAdd = {(title) => {
            if (title) {
              createTask(title)
            }
          }}
        />

        {/* todo list */}
        <TaskList />

      </div>
    </div>
  )
}

export default App;
