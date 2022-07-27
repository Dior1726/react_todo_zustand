import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { generateId } from '../helpers/helpers'

const localStorageUpdate = (config) => (set, get, api) => config((nextState, ...args) => {
  if (nextState.tasks) {
    localStorage.setItem('tasks', JSON.stringify(
      nextState.tasks
    ))
  }
  set(nextState, ...args)
}, get, api)

const currentState = (JSON.parse(localStorage.getItem('tasks')))

const useStore = create(localStorageUpdate(devtools((set, get) => ({
  tasks: currentState || [],
  
  createTask: (title) => {
    const { tasks } = get()
    
    const newTask = {
      id: generateId(),
      title,
      createdAt: new Date(Date.now()).toLocaleDateString()
    }

    set({
      tasks: [newTask].concat(tasks)
    })

    console.log(newTask);
  },
  
  updateTask: (id, title) => {
    const {tasks} = get()

    set({
      tasks: tasks.map((task) => ({
        ...task,
        title: task.id === id ? title : task.title
      }))
    })
  },
  
  deleteTask: (id) => {
    const {tasks} = get()

    set({ tasks: tasks.filter((task) => task.id !== id) })
  }
}))))

export {useStore}