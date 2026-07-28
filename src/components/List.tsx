import { useState } from "react"

export const List = () => {

    const [input, setInput] = useState('')
    const [done, setDone] = useState(false)
    const [tasks, setTasks] = useState([])

    const saveTask = () => {
        setTasks([...tasks,input])
    }

    const completeTask = () => {
        setDone(true)
    }
    return (
        <>
            <h1>Task list</h1>
            <input type="text" placeholder="insert task" onChange={(e) => setInput(e.target.value)}/>
            <button onClick={saveTask}>Add</button>
            {tasks.map((task) => {
                return(
                    <>

                        <h2>{task}</h2>
                        <button onClick={completeTask}>complete task</button>
                    </>
                )
            })}
        </>
    )
}