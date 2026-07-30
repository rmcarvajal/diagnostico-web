import { supabase } from './lib/supabase'
import { TaskItem } from './components/TaskItem'
import type { Task } from './types/Task'
import './App.css'
import { useEffect, useState, type FormEvent } from 'react'
function App() {
  const [tasks,setTasks] = useState<Task[]>([])
  const [title,setTitle] = useState('')
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState<string|null>(null)
  

  //loading and error handling
  const loadTasks = async () => {
    setLoading(true)
    setError(null)

    const{data,error:supabaseError} = await supabase
    .from('tasks')
    .select('*')
    .order('created_at',{ascending: false})

    if(supabaseError){
      setError('Cannot fetch tasks')
    } else{
      setTasks(data ?? [])
    }

    setLoading(false)
  }

  //create task function
  const addTask = async(event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()

    const cleanTitle = title.trim()

    if(!cleanTitle){
      return
    }

    setError(null)

    const {error:supabaseError} = await supabase
    .from('tasks')
    .insert({
      title:cleanTitle,
      completed:false
    })

    if(supabaseError){
      setError('Could not create task')
      return
    } //the way errors work is that you prepare from the start {} and then set the message according to the task at hand
   
    setTitle('')
    await loadTasks()
  }

  const toggleTask = async(task:Task) => {
    setError(null)

    const {error:supabaseError} = await supabase
    .from('tasks')
    .update({
      completed:!task.completed
    })
    .eq('id', task.id)

    if(supabaseError){
      setError('Could not update task')
      return
    }

    await loadTasks()
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <>
      <h1>Tasks</h1>

      <form onSubmit={addTask}>

        <input 
        type="text"
        placeholder='Add task'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        />

        <button type='submit'>Add</button>

        {error ?? <p style={{color:'red'}}>{error}</p>}

        {loading ? (
          <p>Loading tasks......</p>
        ): tasks.length === 0 ? (
          <p>No tasks found.</p>
        ):(
          <ul>
            {tasks.map((task) => {
              return(
                <TaskItem key={task.id} task={task} onToggle={toggleTask}/>
              )
            })}
          </ul>
        )
        
      }
      </form>
    </>
  )
}

export default App
