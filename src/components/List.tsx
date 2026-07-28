import { useState } from "react"
import { Task } from "./Task"
import { CompletedTask } from "./CompletedTask"
export const List = () => {

    const [input, setInput] = useState('')
    const [done, setDone] = useState([])
    const [tasks, setTasks] = useState([])
    
    const saveTask = () => {
        setTasks([...tasks,input])
    }

    const deleteTask = (taskID) => {
        const filteredTasks = tasks.filter((_,index) => taskID !== index)
        setTasks(filteredTasks)
    }

    const completeTask = (taskID) => {
        const completedTasks = tasks.filter((_,index) => taskID === index)
        setDone(completedTasks)

    }
    return (
        <>
            <h1>Task list</h1>
            <input type="text" placeholder="insert task" onChange={(e) => setInput(e.target.value)}/>
            <button onClick={saveTask}>Add</button>
            {tasks.map((task, index) => {
                return(
                    <Task task={task} index={index} deleteTask={deleteTask} completeTask={completeTask}/>
                )
            })}

            <h1>Completed tasks</h1>
            {done.map((task,index) => {
                return(
                    <CompletedTask task={task} index={index} deleteTask={deleteTask}/>
                )
            })}
        </>
    )
}