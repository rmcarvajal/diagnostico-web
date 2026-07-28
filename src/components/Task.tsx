import { useState } from "react"

export const Task = ({task}) => {
    const [done, setDone] = useState(false)    
    return(
            <>
                <p>{done = true ? 'completed' : 'pending'}</p>
                <h2>{task}</h2>
                <button onClick={setDone = true}>complete task</button>
            </>
    )
}